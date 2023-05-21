import React from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { darkPurple } from '../../../constant/actionTypes';
import './Date.css'

const Date = () => {
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '150px',
                    minWidth: 300,
                    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
                }}
                orientation="portrait"
            />
        </LocalizationProvider>
    );
}

export default Date;