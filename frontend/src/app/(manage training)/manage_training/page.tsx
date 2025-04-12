// MUI Imports

'use client';
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip';
import React, { use, useState, useEffect } from 'react';
// Component Imports
import AddTraining from '@views/form-layouts/AddTraining'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import DialogTitle from '@mui/material/DialogTitle';
import api from "@/app/auth/axios.config";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const ManageTraining = () => {
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
    api.get('/api/training').then((res) => {
      const {data} = res;
      setAllTraining(data);
    }).catch((err) => {
      console.log({err})
    })
  }, [refreshTable]);



  const updateFormData = (key: string, value: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const editTraining = (id: number) => {
    api.put(`/api/training/`, {...formValues}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log({err})
    }
    )
  }

  const deleteTraining = (id:number) => {
    api.put(`/api/training/`, {id, is_delete:true}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log({err})
    }
    )
  }

  

  const saveTraining = () => {
    const start_date = moment(new Date(formValues.start_date)).format('YYYY-MM-DD');
    const end_date = moment(new Date(formValues.end_date)).format('YYYY-MM-DD');
    api.post('/api/training/', {...formValues, start_date, end_date}).then((res) => {
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
          key="1_trai"
          aria-label="edit" size="small" onClick={editTraining.bind(this, training.row.id)}>
            <EditIcon fontSize="small" />
          </IconButton>,
          <IconButton 
          key="2_trai"
          aria-label="delete" size="small"  onClick={deleteTraining.bind(this, training.row.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        ];
      },
    },
    
    { field: 'title', headerName: 'Titre', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
      field: 'start_date',
      headerName: 'Date de début',
      width: 150,
    },
    {
      field: 'end_date',
      headerName: 'Date de fin',
      width: 150,
    },
    {
      field: 'prerequisite_skills',
      headerName: 'Compétences Préréquises',
      width: 300,
      valueGetter: (value, row) => {
        return value?.map((skill:any) => {
          return skill.name;
        }).join(", ");
      }
    },
    {
      field: 'acquired_skills',
      headerName: 'Compétences à acquérir',
      width: 300,
      valueGetter: (value, row) => {
        return value?.map((skill:any) => {
          return skill.name;
        }).join(", ");
      }
    },{
      field: 'status',
      headerName: 'Statut',
      width: 300,
      valueGetter: (value) => {

        const choices = {
          'P': {label:"Prévue", color:"info"},
          "E":{label:"En cours", color:"secondary"},
          "T": {label:"Terminée", color:"success"},
          "A": {label:"Annulée", color:"error"},
        }
        return choices[value];
      },
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Chip label={params?.value?.label} color={params?.value?.color} />
      )
    }
  ];
  
  const paginationModel = { page: 0, pageSize: 25 };
  return (
    <Grid container spacing={6} style={{width:"100%"}}>
      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        open={openNotification}
        autoHideDuration={2000}
        message={"Creation de la formation avec succès"}
        key={"top-center"}
      />
      <Button variant="contained"
    startIcon={<AddIcon />}
      onClick={handleClickOpen}>
        Ajouter une formation
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
        <DialogTitle>Ajout d'une formation</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <AddTraining updateFormData={updateFormData} defaultFormData={{}}/>
        </DialogContent>
        <DialogActions>
        <Grid item xs={12}>
              <div className='flex items-center justify-between flex-wrap gap-5'>
                <Button variant='contained'
                onClick={saveTraining}
                >
                  Enregistrer
                </Button>
                <Button variant='contained' onClick={handleClose}>Cancel</Button>
              </div>
            </Grid>
        </DialogActions>
      </Dialog>
      <Grid item xs={12}>
      {allTraining.length?<Paper sx={{ height: "100%", width: '100%' }}>
      <DataGrid
        rows={allTraining}
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

export default ManageTraining
