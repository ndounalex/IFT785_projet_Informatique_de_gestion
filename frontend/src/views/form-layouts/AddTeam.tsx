'use client'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

interface MyFormProps {
    /** The text to display inside the button */
    updateFormData: Function;
  }

const AddTeam = ({ updateFormData }: MyFormProps) => {



  return (
          <Grid container spacing={5} style={{marginBottom:"70px", marginTop:"10px"}}>
            <Grid item xs={12}>
              <TextField fullWidth id="name" 
              label='Nom'
              onChange={(e) => {
                updateFormData("name", e.target.value);
              }
              }
              />
            </Grid>
            
          </Grid>
  )
}

export default AddTeam
