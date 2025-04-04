// MUI Imports

'use client';
import Grid from '@mui/material/Grid'
import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
// Component Imports
import AddHolidaysRequest from '@views/form-layouts/AddHolidaysRequest'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import DialogTitle from '@mui/material/DialogTitle';
import api from "@/app/auth/axios.config";
import moment from 'moment';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const MyVacation = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
  });
  const [allHolidaysRequest, setAllHolidaysRequest] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    api.get('/api/holiday_create').then((res) => {
      const {data} = res;
      setAllHolidaysRequest(data);
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

  const editHolidayRequestItem = (id: number) => {
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

  const deleteHolidayRequest = (id:number) => {
    api.put(`/api/employees/${id}`, {id, is_delete:true}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log("============= err =============", err)
    }
    )
  }

  

  const saveHolidaysRequest = () => {
    const dataValues={
      holidays_begin: moment(formValues.holidays_begin).format('YYYY-MM-DD'),
      holidays_end: moment(formValues.holidays_end).format('YYYY-MM-DD'),
    }
    api.post('/api/holiday_create/', {...dataValues}).then((res) => {
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
      getActions: (holiday:any) => {
        return [
          <IconButton 
          key="1_manage_my_vac"
          aria-label="edit" size="small" onClick={editHolidayRequestItem.bind(this, holiday.id)}>
            <EditIcon fontSize="small" />
          </IconButton>,
          <IconButton 
          key="2_manage_my_vac"
          aria-label="delete" size="small"  onClick={deleteHolidayRequest.bind(this, holiday.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        ];
      },
    },
    
    { field: 'holidays_begin', headerName: 'Date début', width: 300 },
    { field: 'holidays_end', headerName: 'Date fin', width: 300 },
    {
      field: 'status',
      headerName: 'Statut',
      width: 300,
      valueGetter: (value) => {
        const choices = {
          'R': {label:"Réfusé", color:"error"},
          "I":{label:"En traitement", color:"secondary"},
          "V": {label:"Validé", color:"success"},
        }
        return choices[value];
      },
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Chip label={params.value.label} color={params.value.color} />
      )
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
        Ajouter une demande de congé
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
        <DialogTitle>Ajout d'une demande de congé</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <AddHolidaysRequest updateFormData={updateFormData}/>
        </DialogContent>
        <DialogActions>
        <Grid item xs={12}>
              <div className='flex items-center justify-between flex-wrap gap-5'>
                <Button variant='contained'
                onClick={saveHolidaysRequest}
                >
                  Enregistrer
                </Button>
                <Button variant='contained' onClick={handleClose}>Cancel</Button>
              </div>
            </Grid>
        </DialogActions>
      </Dialog>
      <Grid item xs={12}>
      {allHolidaysRequest.length?<Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={allHolidaysRequest}
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

export default MyVacation
