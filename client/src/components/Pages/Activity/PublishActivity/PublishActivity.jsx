import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { brightPurple, darkPurple } from "../../../../constant/actionTypes";
import { TextareaAutosize } from "@mui/material";
import { TextField } from "@mui/material";
import DateSelecter from "../../../Widget/DateSelecter/DateSelecter";

const prefix = ['City: ', 'Pet species: ', '', 'Start date: ', 'End date: ', 'Title: ', 'Location: ', 'Price: ']

export default function PublishActivity({ activity, allInputs, publishAndGoBack, isEdit, content }) {

    const [value, setValue] = React.useState(content);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
    };


    const [inputs, setInputs] = React.useState(allInputs);

    const handleInputChange = (event, index) => {
        const newValue = event.target.value;
        const updatedInputs = [...inputs];
        updatedInputs[index] = newValue;
        setInputs(updatedInputs);
    };

    const saveDate = (date, index) => {
        const newDate = date;
        const updatedInputs = [...inputs];
        updatedInputs[index] = newDate;
        setInputs(updatedInputs);
    };

    const publishActivity = () => {
        const updatedInputs = [...inputs, value];
        publishAndGoBack(updatedInputs);
    }

    const confirmEdit = () => {
        const updatedInputs = [...inputs, value];
        publishAndGoBack(updatedInputs);
    }

    //big todo here about how to get the data from the backend
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            marginTop: '60px',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                fontFamily: 'Cosmic Sans MS',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    width: '40%',
                    marginRight: '30px',
                }}>
                    {inputs.map((input, index) => {
                        let element;

                        switch (index) {
                            case 0:
                            case 1:
                            case 5:
                            case 6:
                                element = (
                                    <Box key={index} sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '16px' }}>{prefix[index]}</Typography>
                                        <TextField value={input} onChange={(event) => handleInputChange(event, index)} sx={{
                                            "& .MuiOutlinedInput-input": {
                                                borderRadius: "100px",
                                                padding: "2px 2px 2px 8px",
                                                backgroundColor: 'white',
                                                margin: '2px',
                                                "& fieldset": {
                                                    border: "none",
                                                },
                                            },
                                        }} InputProps={{
                                            sx: {
                                                width: "150px",
                                                fontFamily: "Comic Sans MS",
                                                fontSize: "16px",
                                            },
                                        }} />
                                    </Box>
                                );
                                break;
                            /* date format input */
                            case 3:
                            case 4:
                                element = (
                                    <Box key={index} sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '16px' }}>{prefix[index]}</Typography>
                                        <DateSelecter
                                            onSelect={(value) => saveDate(value, index)}
                                            selectedValue={input}
                                            condition={true} />
                                    </Box>
                                );
                                break;
                            case 2:
                                element = (
                                    <Box key={index} sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        {activity === 'service' ? (<Typography variant="h6" sx={{ fontWeight: '700', fontSize: '16px' }}>Service Type: </Typography>) : null}
                                        {activity === 'event' ? (<Typography variant="h6" sx={{ fontWeight: '700', fontSize: '16px' }}>Event Type: </Typography>) : null}
                                        <TextField value={input} onChange={(event) => handleInputChange(event, index)} sx={{
                                            "& .MuiOutlinedInput-input": {
                                                borderRadius: "100px",
                                                padding: "2px 2px 2px 8px",
                                                backgroundColor: 'white',
                                                margin: '2px',
                                                "& fieldset": {
                                                    border: "none",
                                                },
                                            },
                                        }} InputProps={{
                                            sx: {
                                                width: "150px",
                                                fontFamily: "Comic Sans MS",
                                                fontSize: "16px",
                                            },
                                        }} />
                                    </Box>
                                );
                                break;
                            case 7:
                                element = (
                                    <Box key={index} sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        {activity === 'service' ? (<Typography variant="h6" sx={{ fontWeight: '700', fontSize: '16px' }}>Price: </Typography>) : null}
                                        {activity === 'event' ? (<Typography variant="h6" sx={{ fontWeight: '700', fontSize: '16px' }}>Expected amount: </Typography>) : null}
                                        <TextField value={input} onChange={(event) => handleInputChange(event, index)} sx={{
                                            "& .MuiOutlinedInput-input": {
                                                borderRadius: "100px",
                                                padding: "2px 2px 2px 8px",
                                                backgroundColor: 'white',
                                                margin: '2px',
                                                "& fieldset": {
                                                    border: "none",
                                                },
                                            },
                                        }} InputProps={{
                                            sx: {
                                                width: "150px",
                                                fontFamily: "Comic Sans MS",
                                                fontSize: "16px",
                                            },
                                        }} />
                                    </Box>
                                );
                                break;
                            /* other case */
                            default:
                                break;
                        }

                        return (
                            <div key={index}>
                                {element}
                            </div>
                        );
                    })}
                </Box>
                <Box
                    sx={{
                        width: '60%',
                    }}>
                    <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                    }}>
                        Please give a introduction to the {activity}:
                    </Typography>
                    <TextareaAutosize
                        required
                        value={value}
                        onChange={handleChange}
                        minRows={4}
                        maxRows={10}
                        style={{
                            marginTop: '10px',
                            borderRadius: '10px',
                            border: '1px solid gray',
                            fontFamily: 'Comic Sans MS',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: darkPurple,
                            height: '80%',
                            width: '100%',
                        }}
                    />
                </Box>
            </Box>
            {!isEdit ? (<Button
                onClick={publishActivity}
                sx={{
                    width: '100%',
                    backgroundColor: brightPurple,
                    fontFamily: 'Cosmic Sans MS',
                    color: 'white',
                    borderRadius: '20px',
                    marginTop: '20px',
                }}>
                Publish the {activity}
            </Button>) : (<Button
                onClick={confirmEdit}
                sx={{
                    width: '100%',
                    backgroundColor: brightPurple,
                    fontFamily: 'Cosmic Sans MS',
                    color: 'white',
                    borderRadius: '20px',
                    marginTop: '20px',
                }}>
                Confirm the edit
            </Button>)}
        </Box>
    );
}