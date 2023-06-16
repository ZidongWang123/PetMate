import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './CommonSteps.css'
import { TextField } from "@mui/material";

import { darkPurple, brightGreen } from '../../../../constant/actionTypes';

const CreationSteps = ({ steps, showStepper, onFinishCreationStep }) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const [creationInputs, setCreationInputs] = React.useState(Array.from({ length: steps.length }, () => ''));


    const handleStepInput = (value, index) => {
        const newStepInputs = [...creationInputs];
        newStepInputs[index] = value;
        setCreationInputs(newStepInputs);
    }

    React.useEffect(() => {
        localStorage.setItem('stepInputs', JSON.stringify(creationInputs));
    }, [creationInputs]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        const resetInputs = Array.from({ length: steps.length }, () => '');
        setCreationInputs(resetInputs);
        setActiveStep(0);
    };

    const handleGoNext = () => {
        onFinishCreationStep(creationInputs);
        setCreationInputs(Array.from({ length: steps.length }, () => ''));
        setActiveStep(0);
    };

    return (
        <>
            {showStepper ? (
                <>
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
                                    <TextField
                                        variant="outlined"
                                        onChange={(event) => {
                                            handleStepInput(event.target.value, index);
                                        }}
                                        fullWidth
                                        InputProps={{
                                            placeholder: step.tip,
                                        }}
                                        sx={{
                                            fontFamily: 'Cosmic Sans MS',
                                            marginTop: '20px',
                                            borderRadius: '50px',
                                            backgroundColor: '#f5f5f5',
                                            border: '0.5px solid gray',
                                        }}
                                    />
                                    <Box sx={{ mb: 2, marginTop: '15px' }}>
                                        <div>
                                            {creationInputs[index] === '' ? (<Typography sx={{
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
                                                disabled=
                                                {creationInputs[index] === ''}

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
                            <Button
                                onClick={handleGoNext} sx={{
                                    mt: 1, mr: 1, fontFamily: 'Comic Sans MS',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    backgroundColor: brightGreen,
                                }}>
                                Create!
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
                </>
            ) : null}
        </>
    );
};


export default CreationSteps;