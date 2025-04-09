'use client'

// React Imports
import { useState, useEffect} from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Next Imports
//import Link from 'next/link'

// MUI Imports
//import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
//import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
/* import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel'; */
import MenuItem from '@mui/material/MenuItem';
import api from "@/app/auth/axios.config";
import { set } from 'zod';

interface defaultFormData {
  lastname: string;
  firstname: string;
  email: string;
  is_manager: boolean;
  team: string;
}

interface MyFormProps {
    /** The text to display inside the button */
    updateFormData: Function;
    defaultFormData?: defaultFormData;
}

const FormLayoutsBasic = ({ updateFormData }: MyFormProps) => {
  // States
  //vconst [isPasswordShown, setIsPasswordShown] = useState(false)
  const [myTeam, setMyTeam] = useState('')
  const [managers, setManagers] = useState([])
  const [teams, setTeams] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get('/api/managers').then((res) => {
      console.log("============= res =============", res)
      const {data} = res;
      setManagers(data);
    }).catch((err) => {
      console.log("============= err =============", err)
    })
    api.get('/api/teams').then((res) => {
      const {data} = res;
      setTeams(data);
    }).catch((err) => {
      console.log("============= err =============", err)
    })
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
          <Grid container spacing={5} style={{marginBottom:"70px"}}>
            <Grid item xs={12}>
              <TextField fullWidth id="lastname" 
              label='Nom' placeholder='John Doe' 
              onChange={(e) => {
                updateFormData("lastname", e.target.value);
              }
              }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="firstname" 
              label='Prénoms'
              onChange={(e) => {
                updateFormData("firstname", e.target.value);
              }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                id="email"
                onChange={(e) => {
                  updateFormData("email", e.target.value);
                }}
              />
            </Grid>
             <Grid item xs={12}>
            <FormControlLabel control={<Checkbox 
            onChange={(e) => {
              updateFormData("is_manager", e.target.value);
            }}
            />} label="Utiliser comme manager de l'équipe" />

            </Grid>
            <Grid item xs={12}>
            <TextField id="team" label="Equipe" value={myTeam}
            style={{ width: "100%" }}
            onChange={(e) => {
              setMyTeam(e.target.value);
              updateFormData("team", e.target.value);
            }}
            select>
                {teams.map((team:any) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
            </TextField>

            </Grid>

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

export default FormLayoutsBasic
