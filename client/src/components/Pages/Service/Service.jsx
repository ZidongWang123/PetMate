import { Container } from "@mui/material";
import React from "react";
import SelectBar from "../../Widget/SelectBar/SelectBar";
import InputBar from "../../Widget/InputBar/InputBar";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './Service.css'

import { darkPurple, brightGreen } from '../../../constant/actionTypes';

const city = ['Munich', 'Berlin', 'Frankfurt']
const pet = ['dog', 'cat', 'any']
const serviceType = ['walking', 'sitting', 'training', 'any']
const steps = [
    {
        label: 'Please select a city',
        content: city,
    },
    {
        label: 'Please select a pet species',
        content: pet,
    },
    {
        label: 'Please select a service type',
        content: serviceType,
    },
];

const Service = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [stepInputs, setStepInputs] = React.useState(['', '', '']);//TODO: length of stepInputs should be the same as steps.length

    const handleStepInput = (index, value) => {
        const newStepInputs = [...stepInputs];
        newStepInputs[index] = value;
        setStepInputs(newStepInputs);

        //console.log(stepInputs);
    };

    React.useEffect(() => {
        console.log(stepInputs);
        localStorage.setItem('stepInputs', JSON.stringify(stepInputs));
    }, [stepInputs]);

    const handleNext = () => {
        console.log(stepInputs)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setStepInputs(['', '', '']);
        setActiveStep(0);
    };

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{
                marginTop: '100px',
            }}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === steps.length - 1 ? (
                                    <Typography variant="caption"
                                        sx={{
                                            fontFamily: 'Comic Sans MS',
                                            fontWeight: 'bold',
                                            color: darkPurple,
                                        }}>Last step</Typography>
                                ) : null
                            }
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: 'Comic Sans MS',
                                    fontWeight: 'bold',
                                    fontSize: '25px',
                                }}
                            >
                                {step.label}
                            </Typography>
                        </StepLabel>
                        <StepContent>
                            <SelectBar
                                selectItems={step.content}
                                onSelect={(value) => handleStepInput(index, value)} 
                                selectedValue={stepInputs[index]}/>
                            <Box sx={{ mb: 2, marginTop: '15px' }}>
                                <div>
                                    {stepInputs[index] === "" ? (<Typography sx={{
                                        mt: 1,
                                        mr: 1,
                                        marginLeft: '10px',
                                        color: 'red',
                                        fontFamily: 'Comic Sans MS',
                                        fontWeight: 'bold',
                                        fontSize: '5px',
                                    }}>Value is empty!</Typography>) : null}
                                    <Button
                                        onClick={handleNext}
                                        sx={{
                                            mt: 1,
                                            mr: 1,
                                            color: darkPurple,
                                            fontFamily: 'Comic Sans MS',
                                            fontWeight: 'bold',
                                        }}
                                        disabled={stepInputs[index] === ""}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    {index !== 0 ? (<Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{
                                            mt: 1,
                                            mr: 1,
                                            fontFamily: 'Comic Sans MS',
                                            fontWeight: 'bold',
                                            color: brightGreen,
                                        }}
                                    >
                                        Back
                                    </Button>) : null}
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3, backgroundColor: 'inherit' }}>
                    <Typography sx={{
                        mt: 1,
                        mr: 1,
                        fontFamily: 'Comic Sans MS',
                        fontWeight: 'bold',
                        color: darkPurple,
                    }}>All steps completed - you&apos;re finished !</Typography>
                    <Button sx={{
                        mt: 1, mr: 1, fontFamily: 'Comic Sans MS',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: brightGreen,
                    }}>
                        Go Next
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleReset} sx={{
                            mt: 1, mr: 1, fontFamily: 'Comic Sans MS',
                            fontWeight: 'bold',
                            color: darkPurple,
                            borderColor: darkPurple,
                        }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Container>
    );
};


export default Service;