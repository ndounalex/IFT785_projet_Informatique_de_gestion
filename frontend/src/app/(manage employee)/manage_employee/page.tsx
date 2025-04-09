// MUI Imports

'use client';
import Grid from '@mui/material/Grid'
import React, { use, useState, useEffect } from 'react';
// Component Imports
import FormLayoutsBasic from '@views/form-layouts/AddEmployee'
import AssociateSkills from '@views/form-layouts/AssociateSkills'
import Dialog from '@mui/material/Dialog';
import AddLinkIcon from '@mui/icons-material/AddLink';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import DialogTitle from '@mui/material/DialogTitle';
import api from "@/app/auth/axios.config";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

interface defaultFormData {
  lastname: string;
  firstname: string;
  email: string;
  is_manager: boolean;
  team: string;
}

const ManageEmployee = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [defaultFormData, setDefaultFormData] = useState<defaultFormData>({
    lastname: "",
    firstname: "",
    email: "",
    is_manager: false,
    team: ""
  });
  const [action, setAction] = useState("add");

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    api.get('/api/employees').then((res) => {
      const {data} = res;
      setAllEmployees(data);
    }).catch((err) => {
      console.log("============= err =============", err)
    })
  }, [refreshTable]);



  const updateFormData = (key: string, value: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log("============ update form data ============", formValues)
  };

  const editEmployeeItem = (id: number) => {
    console.log("=================== edit employee item =====================", {formValues})
    api.put(`/api/employees/${id}`, {...formValues}).then((res) => {
    console.log("============= res =============", res)
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log("============= err =============", err)
    }
    )
  }

  const deleteEmployeeItem = (id:number) => {
    api.put(`/api/employees/${id}`, {id, is_delete:true}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log("============= err =============", err)
    }
    )
  }

  const associateSkills = (employee) => {
    setAction("associate");
    setDefaultFormData(employee);
    setOpen(true);
  }

  

  const saveEmployeeItem = () => {
    if(action=="associate"){
      api.post('/api/associate_skills/', {...formValues, id:defaultFormData.id}).then((res) => {
        setRefreshTable(!refreshTable);
        handleClose();
        setAction("add");
      }).catch((err) => {
        console.log("============= err =============", err)
      }
      )
      return;
    }
    api.post('/auth/users/', {...formValues, username: formValues.email, password:"test@123456789"}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose();
    }).catch((err) => {
      console.log("============= err =============", err)
    }
    )
  }

  const handleClose = () => {
    setOpen(false);
  };
  const columns: GridColDef[] = [
    //{ field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (employee:any) => {
        console.log({employee})
        return [

          <IconButton 
            key="1_ma_emp"
            aria-label="edit" size="small" onClick={
              () =>{
                
                editEmployeeItem(employee.id)
              }
              }>
            <EditIcon fontSize="small" />
          </IconButton>,
          <IconButton 
          key="3_ma_emp"
          aria-label="delete" size="small"  onClick={() =>{
            associateSkills(employee.row)
          }}>
          <AddLinkIcon fontSize="small" />
        </IconButton>,
          <IconButton 
          key="2_ma_emp"
          aria-label="delete" size="small"  onClick={() =>{
            deleteEmployeeItem(employee.id)
          }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        ];
      },
    },
    
    { field: 'lastname', headerName: 'Nom', width: 150 },
    { field: 'firstname', headerName: 'Prénoms', width: 150 },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'team',
      headerName: 'Equipe',
      width: 150,
      valueGetter: (value) => {
        return value?value.name:"";
      }
    },
  {
      field: 'skills',
      headerName: 'Compétences',
      width: 300,
      valueGetter: (value, row) => {
        return value?.map((skill:any) => {
          return skill.name;
        }).join(", ");
      }
    }
  ];
  
  const paginationModel = { page: 0, pageSize: 25 };
  return (
    <Grid container spacing={6} style={{width:"100%"}}>
      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        open={openNotification}
        autoHideDuration={2000}
        message={"Creation de l'employé avec succès"}
        key={"top-center"}
      />
      <Button variant="contained"
    startIcon={<AddIcon />}
      onClick={handleClickOpen}>
        Ajouter un employé
      </Button>
            <Dialog
        open={open}
       // onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
          },
        }}
      >
        <DialogTitle>{action=="add"?"Ajout d'un employé":"Associer des compétences"}</DialogTitle>
        <DialogContent style={{width:"600px"}}>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          {action=="add"?<FormLayoutsBasic updateFormData={updateFormData} defaultFormData={defaultFormData}/>:<AssociateSkills updateFormData={updateFormData} skills={defaultFormData.skills||[]}/>}
        </DialogContent>
        <DialogActions>
        <Grid item xs={12}>
              <div className='flex items-center justify-between flex-wrap gap-5'>
                <Button variant='contained'
                onClick={saveEmployeeItem}
                >
                  Enregistrer
                </Button>
                <Button variant='contained' onClick={handleClose}>Cancel</Button>
              </div>
            </Grid>
        </DialogActions>
      </Dialog>
      <Grid item xs={12}>
      {allEmployees.length?<Paper sx={{ height: "100%", width: '100%' }}>
      <DataGrid
        rows={allEmployees}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[25]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>:null}
      </Grid>
    </Grid>
  )
}

export default ManageEmployee
