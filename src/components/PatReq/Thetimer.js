import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';

function Thetimer() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="Basic time picker" />
        </LocalizationProvider>
    );
}

export default Thetimer;