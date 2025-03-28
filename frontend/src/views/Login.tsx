'use client';
import { getProviders } from "next-auth/react"
// React Imports
import { useState } from 'react'
import type { FormEvent } from 'react'
import { signIn } from 'next-auth/react'; 
import api from '../app/auth/axios.config';
import { AuthActions } from "@/app/auth/utils";
// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import axios from "axios";

const Login = ({ mode }: { mode: Mode }) => {
  // States
  const { login, storeToken } = AuthActions();
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [formData, setFormData] = useState({email:'', password:''});
  console.log("============ is password shown ============", isPasswordShown)
/* useEffect(() => {        
    signIn('credentials');    
  }, []); */

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const router = useRouter()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => {
    console.log("============= mes que un club =============")
    setIsPasswordShown(show => !show)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("===== formData =========== 11", formData, api);
    e.preventDefault();
    login(formData.email, formData.password).then((res) => {
      const {data} = res;
      console.log("============= res =============", {data, res})
      if(res.status === 200){
        console.log("============= res =============", data)
        storeToken(data.access, "access");
        storeToken(data.refresh, "refresh");
        //signIn('credentials');
      }
    }).catch((err) => {
      console.log("============= err =============", err)
    })
   // router.push('/')
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          {/* <Link href='/' className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link> */}
          <div className='flex flex-col gap-5'>
            <div>
              {/* <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography> */}
              <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <TextField autoFocus 
              onChange = {(e) => setFormData({...formData, email:e.target.value})}
              fullWidth label='Email' />
              <TextField
                fullWidth
                label='Password'
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                onChange={(e) => setFormData({...formData, password:e.target.value})}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  },
                }}
              />
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Log In
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} href='/register' color='primary'>
                  Create an account
                </Typography>
              </div>
              <Divider className='gap-3'>or</Divider>
              <div className='flex justify-center items-center gap-2'>
                <IconButton size='small' className='text-facebook'>
                  <i className='ri-facebook-fill' />
                </IconButton>
                <IconButton size='small' className='text-twitter'>
                  <i className='ri-twitter-fill' />
                </IconButton>
                <IconButton size='small' className='text-github'>
                  <i className='ri-github-fill' />
                </IconButton>
                <IconButton size='small' className='text-googlePlus'>
                  <i className='ri-google-fill' />
                </IconButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      {/* <Illustrations maskImg={{ src: authBackground }} /> */}
    </div>
  )
}

export default Login