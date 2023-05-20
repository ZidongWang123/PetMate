import React from 'react';
import { TextField, Grid } from "@mui/material";
import { darkPurple } from '../../../constant/actionTypes';

const InputBar = () => {
    return (
        <Grid item xs={12} sx={{
            borderRadius: '100px',
            backgroundColor: 'white',
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
            width: '40%',
            minWidth: 300,
            marginTop: '10px'
        }}>
            <TextField
                variant="outlined"
                required
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '100px',
                    },
                }}
                InputProps={{
                    sx: {
                        fontFamily: 'Comic Sans MS',
                        fontSize: '16px', // 设置字体大小
                        fontWeight: 'bold', // 设置字体粗细
                        color: darkPurple, // 设置字体颜色
                    },
                }}
            />
        </Grid>
    )
};

export default InputBar;