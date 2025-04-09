// MUI Imports

'use client';
import Grid from '@mui/material/Grid'
import React, { useState, useEffect } from 'react';
// Component Imports
import AddSkill from '@views/form-layouts/AddSkill'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import DialogTitle from '@mui/material/DialogTitle';
import api from "@/app/auth/axios.config";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const ManageSkills = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
  });
  const [allSkills, setAllSkills] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    api.get('/api/skills_list').then((res) => {
      const {data} = res;
      setAllSkills(data);
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

  const editSkill = (skill) => {
    setDefaultValue(skill);
    setFormValues(skill);
    setOpen(true);
  }
/*     api.put(`/api/skill`, {...formValues}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log({err})
    }
    ) */

  const deleteSkill = (id:number) => {
    api.put(`/api/skill`, {id, is_delete:true}).then((res) => {
    setRefreshTable(!refreshTable);
    handleClose(); 
    }
    ).catch((err) => {
      console.log({err})
    }
    )
  }

  

  const saveSkill = () => {
    console.log({formValues})
    const dataValues={
        level: formValues.level,
        name: formValues.name,
        description: formValues.description,
      }
      if(defaultValue){
          return api.put(`/api/skills/`, {...dataValues, skill_id:defaultValue.id}).then((res) => {
              setRefreshTable(!refreshTable);
              handleClose(); 
              }
              ).catch((err) => {
                console.log({err})
              }
          )
      }
      api.post('/api/skills/', {...dataValues}).then((res) => {
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
      getActions: (skill:any) => {
        console.log({skill})
        const {id, row} = skill;
        return [
          <IconButton 
          key="1_manage_my_vac"
          aria-label="edit" size="small" onClick={editSkill.bind(this, row)}>
            <EditIcon fontSize="small" />
          </IconButton>,
          <IconButton 
          key="2_manage_my_vac"
          aria-label="delete" size="small"  onClick={deleteSkill.bind(this, id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        ];
      },
    },
    
    { field: 'name', headerName: 'Nom', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: "level",
      headerName: "Niveau",
      width: 200,
      valueGetter: (value) => {

        const choices = {
          D: "Débutant",
          I: "Intermédiaire",
          A: "Avancé",
          E: "Expert",
        };
        return choices[value];
      },
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
        Ajouter une compétence
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
        <DialogTitle>{defaultValue?"Modifier une compétence":"Ajout d'une compétence"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <AddSkill updateFormData={updateFormData} defaultFormData={defaultValue}/>
        </DialogContent>
        <DialogActions>
        <Grid item xs={12}>
              <div className='flex items-center justify-between flex-wrap gap-5'>
                <Button variant='contained'
                onClick={saveSkill}
                >
                  Enregistrer
                </Button>
                <Button variant='contained' onClick={handleClose}>Cancel</Button>
              </div>
            </Grid>
        </DialogActions>
      </Dialog>
      <Grid item xs={12}>
      {allSkills.length?<Paper sx={{ height: "100%", width: '100%' }}>
      <DataGrid
        rows={allSkills}
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

export default ManageSkills
