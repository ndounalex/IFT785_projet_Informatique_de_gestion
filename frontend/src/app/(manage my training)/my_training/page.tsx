// MUI Imports

'use client';
import Grid from '@mui/material/Grid'
import React, { use, useState, useEffect } from 'react';
// Component Imports
import AddTrainingRegistration from '@views/form-layouts/AddTrainingRegistration'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import DialogTitle from '@mui/material/DialogTitle';
import api from "@/app/auth/axios.config";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const MyTraining = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
  });
  const [allTraining, setAllTraining] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    api.get('/api/training_registration').then((res) => {
      const {data} = res;
      setAllTraining(data);
    }).catch((err) => {
      console.log("============= err =============", err)
    })
  }, [refreshTable]);



  const updateFormData = (key: string, value: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const editTrainingRegistration = (id: number) => {
    api.put(`/api/training_registration/`, {...formValues}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log({err})
    }
    )
  }

  const deleteTrainingRegistration = (id:number) => {
    api.put(`/api/training_registration/`, {id, is_delete:true}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log({err})
    }
    )
  }

  

  const saveTrainingRegistration = () => {
    api.post('/api/training_registration/', {...formValues}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose();
    }).catch((err) => {
      console.log({err})
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
      getActions: (training:any) => {
        return [
          <IconButton 
          key="my_trai_1"
          aria-label="edit" size="small" onClick={editTrainingRegistration.bind(this, training.row.id)}>
            <EditIcon fontSize="small" />
          </IconButton>,
          <IconButton
          key="2_my_trai"
          aria-label="delete" size="small"  onClick={deleteTrainingRegistration.bind(this, training.row.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        ];
      },
    },
    
    { field: 'title', headerName: 'Titre', width: 300,valueGetter: (value, row) => {
      return row.training.title;
    }},
    { field: 'description', headerName: 'Description', width: 300 ,valueGetter: (value, row) => {
      return row.training.description;
    }},
    {
      field: 'start_date',
      headerName: 'Date de début',
      width: 150,
      valueGetter: (value, row) => {
        return row.training.start_date;
      }
    },
    {
      field: 'end_date',
      headerName: 'Date de fin',
      width: 150,
      valueGetter: (value, row) => {
        return row.training.end_date;
      }
    },
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
        <Chip label={params?.value?.label} color={params?.value?.color} />
      )
    },
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
        Ajouter une demande de formation
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
        <DialogTitle>Ajout d'une inscription</DialogTitle>
        <DialogContent  style={{width:"600px"}}>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <AddTrainingRegistration updateFormData={updateFormData}/>
        </DialogContent>
        <DialogActions>
        <Grid item xs={12}>
              <div className='flex items-center justify-between flex-wrap gap-5'>
                <Button variant='contained'
                onClick={saveTrainingRegistration}
                >
                  Enregistrer
                </Button>
                <Button variant='contained' onClick={handleClose}>Cancel</Button>
              </div>
            </Grid>
        </DialogActions>
      </Dialog>
      <Grid item xs={12}>
      {allTraining.length?<Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={allTraining}
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

export default MyTraining
