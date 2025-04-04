// MUI Imports

'use client';
import Grid from '@mui/material/Grid'
import React, { use, useState, useEffect } from 'react';
// Component Imports
import FormLayoutsBasic from '@views/form-layouts/AddEmployee'
import Dialog from '@mui/material/Dialog';
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

const MyEvaluation = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    api.get('/api/employees').then((res) => {
      console.log("============= res =============", res)
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

  

  const saveEmployeeItem = () => {
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
        return [
          <IconButton
          key="1_my_eval"
          aria-label="edit" size="small" onClick={editEmployeeItem.bind(this, employee.id)}>
            <EditIcon fontSize="small" />
          </IconButton>,
          <IconButton 
          key="2_my_eval"
          aria-label="delete" size="small"  onClick={deleteEmployeeItem.bind(this, employee.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        ];
      },
    },
    
    { field: 'lastname', headerName: 'Nom', width: 130 },
    { field: 'firstname', headerName: 'Prénoms', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 90,
    },
/*     {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    }, */
  ];
  
  const paginationModel = { page: 0, pageSize: 5 };
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
        Ajouter une auto évaluation
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
        <DialogTitle>Ajout d'un employé</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <FormLayoutsBasic updateFormData={updateFormData}/>
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
      {allEmployees.length?<Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={allEmployees}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>:null}
      </Grid>
    </Grid>
  )
}

export default MyEvaluation
