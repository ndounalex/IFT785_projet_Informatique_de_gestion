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

interface MyFormProps {
    /** The text to display inside the button */
    updateFormData: Function;
  }

const FormLayoutsBasic = ({ updateFormData }: MyFormProps) => {
  // States
  //vconst [isPasswordShown, setIsPasswordShown] = useState(false)
  const [myTeam, setMyTeam] = useState('')
  const [managers, setManagers] = useState([])
  const [teams, setTeams] = useState([]);

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
            
{/*             <Grid item xs={12}>
              <TextField
                fullWidth
                label='Password'
                placeholder='············'
                id='password'
                type={isPasswordShown ? 'text' : 'password'}
                helperText='Use 8 or more characters with a mix of letters, numbers & symbols'
                slotProps={{
                 input:{ endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )}
                }}
              />
            </Grid> */}
{/*             <Grid item xs={12}>
              <TextField
                fullWidth
                label='Confirm Password'
                placeholder='············'
                id='confirm-password'
                type={isConfirmPasswordShown ? 'text' : 'password'}
                helperText='Make sure to type the same password as above'
                slotProps={{
                  input:{endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle confirm password visibility'
                      >
                        <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )}
                }}
              />
            </Grid> */}
{/*             <Grid item xs={12}>
              <div className='flex items-center justify-between flex-wrap gap-5'>
                <Button variant='contained' type='submit'>
                  Get Started!
                </Button>
                <div className='flex items-center justify-center gap-2'>
                  <Typography color='text.primary'>Already have an account?</Typography>
                  <Link href='/' onClick={e => e.preventDefault()} className='text-primary'>
                    Log In
                  </Link>
                </div>
              </div>
            </Grid> */}
          </Grid>
  )
}

export default FormLayoutsBasic
