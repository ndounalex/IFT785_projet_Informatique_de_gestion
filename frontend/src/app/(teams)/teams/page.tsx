// MUI Imports

'use client';
import Grid from '@mui/material/Grid'
import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
// Component Imports
import AddTeam from '@views/form-layouts/AddTeam';
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

const Teams = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
  });
  const [allTeams, setAllTeams] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    api.get('/api/teams').then((res) => {
      const {data} = res;
      setAllTeams(data);
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

  const editTeam = (id: number) => {
    api.put(`/api/team/${id}`, {...formValues}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log("============= err =============", err)
    }
    )
  }

  const deleteTeamItem = (id:number) => {
    api.put(`/api/team/${id}`, {id, is_delete:true}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log("============= err =============", err)
    }
    )
  }

  

  const saveTeam = () => {
    api.post('/api/team/', {...formValues}).then((res) => {
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
      getActions: (team:any) => {
        return [
          <IconButton 
          key="1_manage_my_vac"
          aria-label="edit" size="small" onClick={editTeam.bind(this, team.id)}>
            <EditIcon fontSize="small" />
          </IconButton>,
          <IconButton 
          key="2_manage_my_vac"
          aria-label="delete" size="small"  onClick={deleteTeamItem.bind(this, team.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        ];
      },
    },
    
    { field: 'name', headerName: "Nom de l'équipe", width: 300 },

  ];
  
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Grid container spacing={6} style={{width:"100%"}}>
      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        open={openNotification}
        autoHideDuration={2000}
        message={"Creation de l'équipe avec succès"}
        key={"top-center"}
      />
      <Button variant="contained"
    startIcon={<AddIcon />}
      onClick={handleClickOpen}>
        Ajouter une équipe
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
        <DialogTitle>Ajout d'une équipe</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <AddTeam updateFormData={updateFormData}/>
        </DialogContent>
        <DialogActions>
        <Grid item xs={12}>
              <div className='flex items-center justify-between flex-wrap gap-5'>
                <Button variant='contained'
                onClick={saveTeam}
                >
                  Enregistrer
                </Button>
                <Button variant='contained' onClick={handleClose}>Cancel</Button>
              </div>
            </Grid>
        </DialogActions>
      </Dialog>
      <Grid item xs={12}>
      {allTeams.length?<Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={allTeams}
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

export default Teams
