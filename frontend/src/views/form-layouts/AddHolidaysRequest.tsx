'use client'

// React Imports
import { useState, useEffect} from 'react'

// Next Imports
//import Link from 'next/link'

// MUI Imports
//import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
//import Button from '@mui/material/Button'
import moment from 'moment';
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import api from "@/app/auth/axios.config";
import MenuItem from '@mui/material/MenuItem';

dayjs.extend(utc);

interface MyFormProps {
    /** The text to display inside the button */
    updateFormData: Function;
    disable?: boolean;
    defaultFormData?: {
      holidays_begin: string;
      holidays_end: string;
      vacation_type: any;
      comments: string; 
    }
  }

const AddHolidayRequest = ({ updateFormData, disable, defaultFormData }: MyFormProps) => {
    const currentDate = dayjs.utc(new Date());
    const [minDate, setMinDate] = useState(currentDate);
    const [maxDate, setMaxDate] = useState(null);
    const [vacationTypes, setVacationTypes] = useState([]);
    const [vacationType, setVacationType] = useState('');

    useEffect(() => {
      api.get('/api/vacation_type').then((res) => {
        const {data} = res;
        setVacationTypes(data);
      }).catch((err) => {
        console.log("============= err =============", err)
      })
    }, []);
    console.log({defaultFormData})
  return (
          <Grid container spacing={5} style={{marginBottom:"70px", marginTop:"10px"}}>
            <Grid item xs={6}>
            <DatePicker
            disabled={disable}
            format={'YYYY-MM-DD'}
            defaultValue={defaultFormData?.holidays_begin ? dayjs.utc(defaultFormData?.holidays_begin) : null}
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
            defaultValue={defaultFormData?.holidays_end ? dayjs.utc(defaultFormData?.holidays_end) : null}
            disabled={disable}
            format={'YYYY-MM-DD'}
            onChange={(value)=>{
                console.log({value})
                setMaxDate(value);
                updateFormData('holidays_end', value);
            }} />
            </Grid>
            <Grid item xs={12}>
            <TextField id="vacation_type" label="Type de congé" 
            style={{ width: "100%" }}
            disabled={disable}
            value={disable?`${defaultFormData?.vacation_type ? defaultFormData?.vacation_type?.id : ''}`:vacationType}
            defaultValue={`${defaultFormData?.vacation_type ? defaultFormData?.vacation_type?.id : ''}`}
            onChange={(e) => {
              setVacationType(e.target.value);
              updateFormData("vacation_type", e.target.value);
            }}
            select>
                {vacationTypes.map((vacation:any) => (
                  <MenuItem key={vacation.id} 
                    value={vacation.id}>
                    {vacation.label}
                  </MenuItem>
                ))}
            </TextField>

            </Grid>
            <Grid item xs={12} style={{width:"100%"}}>
            <TextField
              style={{width:"100%"}}
              disabled={disable}
              defaultValue={defaultFormData?.comments ? defaultFormData?.comments : null}
              id="comments"
              label="Justification"
              multiline
              rows={4}
              onChange={(e) => {
                updateFormData("comments", e.target.value);
              }}
            />
            </Grid>
            {disable && <Grid item xs={12}>
            <TextField id="decision" label="Décision" 
            value={vacationType}
            style={{ width: "100%" }}
            onChange={(e) => {
              setVacationType(e.target.value);
              updateFormData("decision", e.target.value);
            }}
            select>
                  <MenuItem key={"V"} 
                    value={"V"}>
                    {"Validé"}
                  </MenuItem>
                  <MenuItem key={"R"} 
                    value={"R"}>
                    {"Refusé"}
                  </MenuItem>
            </TextField>

            </Grid>}
          </Grid>
  )
}

export default AddHolidayRequest
