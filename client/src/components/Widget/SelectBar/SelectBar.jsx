import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import './SelectBar.css';
import { darkPurple } from '../../../constant/actionTypes';

export default function SelectLabels({ selectItems }) {
    const [select, setSelect] = React.useState('');

    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    return (
        <FormControl sx={{ width: '40%', minWidth: 300, marginTop: '10px' }}>
            <Select
                value={select}
                onChange={handleChange}
                displayEmpty
                inputProps={{
                    'aria-label': 'Without label',
                }}
                sx={{
                    borderRadius: '100px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
                }}
            >
            {selectItems.map((selectItem) => (
                <MenuItem
                    key={selectItem}
                    value={selectItem}
                    sx={{
                        width: '100%',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Comic Sans MS',
                            fontWeight: 'bold',
                            display: 'flex',
                            flexDirection: 'end',
                            color: darkPurple
                        }}>
                        {selectItem}
                    </Typography>
                </MenuItem>
            ))}
        </Select>
        </FormControl >
    );
}