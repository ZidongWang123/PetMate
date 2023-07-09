import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";


const Input = ({ name, handleChange, label, half, autoFocus, type, defaultValue }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="standard"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                defaultValue={defaultValue}
               
            />
        </Grid>
    )
};

export default Input;