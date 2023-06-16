import { Box, Button, Typography, TextField } from "@mui/material";
import React from "react";
import { brightPurple, darkPurple } from "../../../../constant/actionTypes";

export default function PublishActivity({ activity, allInputs }) {

    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
    };
    //big todo here about how to get the data from the backend
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                fontFamily: 'Cosmic Sans MS',
            }}>
                <Box>
                    <Typography variant="h6">
                        {activity}: {allInputs}[2]
                    </Typography>
                    <Typography variant="h6">
                        Pet species: {allInputs}[1]
                    </Typography>
                    <Typography variant="h6">
                        Price: {allInputs}[7]
                    </Typography>
                    <Typography variant="h6">
                        {/* Time: //{allInputs}[3] - {allInputs}[4] */}
                    </Typography>
                    <Typography variant="h6">
                        City: {allInputs}[3] - {allInputs}[4]
                    </Typography>
                    <Typography variant="h6">
                        Location: {allInputs}[0] - {allInputs}[5]
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6">
                        Please give personal introduction:
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        value={value}
                        onChange={handleChange}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "100px",
                                "& fieldset": {
                                    border: "none",
                                },
                            },
                        }}
                        InputProps={{
                            sx: {
                                fontFamily: "Comic Sans MS",
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: darkPurple,
                            },
                        }}
                    />
                </Box>
            </Box>
            <Button sx={{
                width: '100%',
                backgroundColor: brightPurple,
                fontFamily: 'Cosmic Sans MS',
                color: 'white',
                borderRadius: '20px',
            }}>
                Publish the {activity}
            </Button>
        </Box>
    );
}