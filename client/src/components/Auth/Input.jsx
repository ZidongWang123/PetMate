import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { darkPurple } from '../../constant/actionTypes';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
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
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : {sx: {
                    fontFamily: 'Comic Sans MS',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: darkPurple,
                }}}
                InputLabelProps={{
                    style: {
                        fontFamily: 'Comic Sans MS',
                    },
                }}
            />
        </Grid>
    )
};

export default Input;