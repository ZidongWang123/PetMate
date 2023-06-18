import React from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './DateSelecter.css'
//import dayjs from 'dayjs';

const DateSelecter = ({ onSelect, selectedValue, condition }) => {
    const [selectedDate, setSelectedDate] = React.useState(null);

    React.useEffect(() => {
        if (selectedValue !== '') {
            // turn string to date
            // const dateObject = dayjs(selectedValue).toDate();
            setSelectedDate(selectedValue);
        }
    }, [selectedValue]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onSelect(date);
        /* const date = event.$d;
        const year = date.getFullYear().toString(); // turn year to string
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // trun month to string and padStart with 0
        const day = date.getDate().toString().padStart(2, '0'); // turn day to string and padStart with 0

        const dateString = `${year}-${month}-${day}`; // merge year, month, day

        setSelectedDate(dateString);
        onSelect(dateString); */
    };

    const inStep = {
        backgroundColor: 'white',
        borderRadius: '150px',
        minWidth: 300,
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
    };

    const inActivity = {
        backgroundColor: 'white',
        borderRadius: '150px',
        width: 146,
        margin:'2px',
        "& .MuiOutlinedInput-input": {
            padding: "2px 2px 2px 8px",
        },
    };

    const selectedSx = condition ? inActivity : inStep;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                sx={selectedSx}
                orientation="portrait"
            />
        </LocalizationProvider>
    );
}

export default DateSelecter;