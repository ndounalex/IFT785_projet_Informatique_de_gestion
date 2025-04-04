'use client'

// React Imports
import { useState, useEffect} from 'react'

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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface MyFormProps {
    /** The text to display inside the button */
    updateFormData: Function;
  }

const AddHolidayRequest = ({ updateFormData }: MyFormProps) => {
    const currentDate = dayjs.utc(new Date());
    const [minDate, setMinDate] = useState(currentDate);
    const [maxDate, setMaxDate] = useState(null);

  return (
          <Grid container spacing={5} style={{marginBottom:"70px", marginTop:"10px"}}>
            <Grid item xs={6}>
            <DatePicker
            onChange={(value)=>{
                console.log({value})
                setMinDate(value);
                updateFormData('holidays_begin', value);
            }}
            label="Date de début" maxDate={maxDate} minDate={currentDate}/>
            </Grid>
            <Grid item xs={6}>
            <DatePicker label="Date de fin" 
            minDate={minDate||currentDate}
            onChange={(value)=>{
                console.log({value})
                setMaxDate(value);
                updateFormData('holidays_end', value);
            }} />
            </Grid>
          </Grid>
  )
}

export default AddHolidayRequest
