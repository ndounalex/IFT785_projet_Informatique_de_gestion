'use client'

// React Imports
import { useState, useEffect} from 'react'

// Next Imports
//import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import api from "@/app/auth/axios.config";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface defaultFormData {
  lastname: string;
  firstname: string;
  email: string;
  is_manager: boolean;
  team: string;
}

interface AddTrainingProps {
    /** The text to display inside the button */
    updateFormData: Function;
    defaultFormData?: defaultFormData;
}

const AddTraining = ({ updateFormData, defaultFormData }: AddTrainingProps) => {
  // States
  //vconst [isPasswordShown, setIsPasswordShown] = useState(false)

  const [teams, setTeams] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [preSkills, setPreSkills] = useState([]);
  const [acqSkills, setAcqSkills] = useState([]);
  const currentDate = dayjs.utc(new Date());
      const [minDate, setMinDate] = useState(currentDate);
      const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    api.get('/api/managers').then((res) => {
      const {data} = res;
      setManagers(data);
    }).catch((err) => {
        console.log({err})
    })
    api.get('/api/teams').then((res) => {
      const {data} = res;
      setTeams(data);
    }).catch((err) => {
        console.log({err})
    })
    api.get('/api/skills_list').then((res) => {
      const {data} = res;
      setAllSkills(data);
    }).catch((err) => {
      console.log({err})
    })
  }, []);

  //const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  //const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  return (
          <Grid container spacing={5} style={{marginBottom:"70px"}}>
            <Grid item xs={12}>
              <TextField fullWidth id="title" 
              label='Titre'
              onChange={(e) => {
                updateFormData("title", e.target.value);
              }
              }
              />
            </Grid>

            <Grid item xs={12}>
            <TextField id="prerequisite_skills" label="Compétences prérequises"
            style={{ width: "100%" }}
            value={preSkills}
            slotProps={{
              select: {
                multiple: true,
              },
            }}
            onChange={(e) => {
              setPreSkills(e.target.value);
              updateFormData("prerequisite_skills", e.target.value);
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
            
            <Grid item xs={12}>
            <TextField id="acquired_skills" label="Compétences à acquérir"
            style={{ width: "100%" }}
            value={acqSkills}
            slotProps={{
              select: {
                multiple: true,
              },
            }}
            onChange={(e) => {
              setAcqSkills(e.target.value);
              updateFormData("acquired_skills", e.target.value);
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
            <Grid item xs={12} style={{width:"100%"}}>
            <TextField
              style={{width:"100%"}}
              defaultValue={defaultFormData?.description ||null}
              id="description"
              label="Description"
              multiline
              rows={4}
              onChange={(e) => {
                updateFormData("description", e.target.value);
              }}
            />
            </Grid>
            <Grid item xs={6}>
            <DatePicker
            format={'YYYY-MM-DD'}
            defaultValue={defaultFormData?.holidays_begin ? dayjs.utc(defaultFormData?.holidays_begin) : null}
            onChange={(value)=>{
                console.log({value})
                setMinDate(value);
                updateFormData('start_date', value);
            }}
            label="Date de début" maxDate={maxDate} minDate={currentDate}/>
            </Grid>
            <Grid item xs={6}>
            <DatePicker label="Date de fin" 
            minDate={minDate||currentDate}
            defaultValue={defaultFormData?.holidays_end ? dayjs.utc(defaultFormData?.holidays_end) : null}
            format={'YYYY-MM-DD'}
            onChange={(value)=>{
                console.log({value})
                setMaxDate(value);
                updateFormData('end_date', value);
            }} />
            </Grid>

          </Grid>
  )
}

export default AddTraining
