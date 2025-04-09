'use client'

// React Imports
import { useState, useEffect} from 'react'

// Next Imports
//import Link from 'next/link'

// MUI Imports
//import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';


interface MyFormProps {
    /** The text to display inside the button */
    updateFormData: Function;
    defaultFormData?: {
      name: string;
      description: string;
      level: string; 
    }
  }

const AddSkill = ({ updateFormData, defaultFormData }: MyFormProps) => {

    const [levelType, setLevelType] = useState('');
  console.log({defaultFormData})
  return (
          <Grid container spacing={5} style={{marginBottom:"70px", marginTop:"10px"}}>
                       <Grid item xs={12}>
              <TextField
                fullWidth
                type='name'
                label='Nom'
                id="name"
                defaultValue={`${defaultFormData?.name || ''}`}
                onChange={(e) => {
                  updateFormData("name", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField id="level" label="Niveau" 
            style={{ width: "100%" }}
            defaultValue={defaultFormData?.level || null}
            onChange={(e) => {
              setLevelType(e.target.value);
              updateFormData("level", e.target.value);
            }}
            select>
                  <MenuItem key={"D"} 
                    value={"D"}>
                    {"Débutant"}
                  </MenuItem>
                  <MenuItem key={"I"} 
                    value={"I"}>
                    {"Intermediaire"}
                  </MenuItem>
                  <MenuItem key={"A"} 
                    value={"A"}>
                    {"Avancé"}
                  </MenuItem>
                  <MenuItem key={"E"} 
                    value={"E"}>
                    {"Expert"}
                  </MenuItem>
            </TextField>

            </Grid>
            <Grid item xs={12} style={{width:"100%"}}>
            <TextField
              style={{width:"100%"}}
              defaultValue={defaultFormData?.description || null}
              id="description"
              label="Description"
              multiline
              rows={4}
              onChange={(e) => {
                updateFormData("description", e.target.value);
              }}
            />
            </Grid>
            
          </Grid>
  )
}

export default AddSkill
