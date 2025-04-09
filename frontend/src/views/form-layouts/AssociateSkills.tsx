'use client'

// React Imports
import { useState, useEffect} from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import api from "@/app/auth/axios.config";
import { set } from 'zod';

interface defaultFormData {
  skills: string[];
}

interface MyFormProps {
    /** The text to display inside the button */
    updateFormData: Function;
    defaultFormData?: defaultFormData;
}

const AssociateSkills = ({ updateFormData }: MyFormProps) => {

  const [allSkills, setAllSkills] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get('/api/skills_list').then((res) => {
      const {data} = res;
      setAllSkills(data);
    }).catch((err) => {
      console.log("============= err =============", err)
    })
  }, []);

  //const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  //const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  return (
          <Grid container spacing={5} style={{marginBottom:"70px", marginTop:"10px"}}>
            <Grid item xs={12}>
            <TextField id="skills" label="Compétences"
            style={{ width: "100%" }}
            value={skills}
            slotProps={{
              select: {
                multiple: true,
              },
            }}
            onChange={(e) => {
              console.log({e})
              setSkills(e.target.value);
              updateFormData("skills", e.target.value);
            }}
            select>
                {allSkills.map((skill:any) => {
                  const choices = {
                    D: "Débutant",
                    I: "Intermédiaire",
                    A: "Avancé",
                    E: "Expert",
                  };
                  return (
                  <MenuItem key={skill.id} value={skill.id}>
                    {`${skill.name} - ${choices[skill.level]}`}
                  </MenuItem>
                )})}
            </TextField>

            </Grid>
        
          </Grid>
  )
}

export default AssociateSkills
