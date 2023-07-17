import React from "react";
import SelectBar from "../../../Widget/SelectBar/SelectBar";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './CommonSteps.css'
import DateSelecter from "../../../Widget/DateSelecter/DateSelecter";

import { darkPurple, brightGreen } from '../../../../constant/actionTypes';

const CommonSteps = ({ steps, showStepper, onFinishCommonStep }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [showDateError, setShowDateError] = React.useState(false);
    const [stepInputs, setStepInputs] = React.useState(['', '', '', '', '']);//TODO: length of stepInputs should be the same as steps.length

    const handleStepInput = (index, value) => {
        const newStepInputs = [...stepInputs];
        newStepInputs[index] = value;
        setStepInputs(newStepInputs);
    };

    const selectStartDate = (date) => {
        if (stepInputs[4] !== '') {
            if (date > stepInputs[4]) {
                setShowDateError(true);
            } else {
                setShowDateError(false);
            }
        }
        const newStepInputs = [...stepInputs];
        newStepInputs[3] = date;
        setStepInputs(newStepInputs);
    };

    const selectEndDate = (date) => {
        if (stepInputs[3] !== '') {
            if (date < stepInputs[3]) {
                setShowDateError(true);
            } else {
                setShowDateError(false);
            }
        }
        const newStepInputs = [...stepInputs];
        newStepInputs[4] = date;
        setStepInputs(newStepInputs);
    };

    React.useEffect(() => {
        localStorage.setItem('stepInputs', JSON.stringify(stepInputs));
    }, [stepInputs]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setStepInputs(['', '', '', '', '']);
        setActiveStep(0);
    };

    const handleGoNext = () => {
        onFinishCommonStep(stepInputs);
        setStepInputs(['', '', '', '', '']);
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
                                    {index < 3 ? (<SelectBar
                                        selectItems={step.content}
                                        onSelect={(value) => handleStepInput(index, value)}
                                        selectedValue={stepInputs[index]} />) :
                                        (
                                            <div>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontFamily: 'Comic Sans MS',
                                                        fontWeight: 'bold',
                                                        fontSize: '10px',
                                                    }}
                                                >
                                                    Start date
                                                </Typography>
                                                <DateSelecter
                                                    onSelect={(value) => selectStartDate(value)}
                                                    selectedValue={stepInputs[index]} />
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontFamily: 'Comic Sans MS',
                                                        fontWeight: 'bold',
                                                        fontSize: '10px',
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    End date
                                                </Typography>
                                                <DateSelecter
                                                    onSelect={(value) => selectEndDate(value)}
                                                    selectedValue={stepInputs[index + 1]} />
                                                {showDateError ? (<Typography sx={{
                                                    mt: 1,
                                                    mr: 1,
                                                    color: 'red',
                                                    fontFamily: 'Comic Sans MS',
                                                    fontWeight: 'bold',
                                                    fontSize: '5px',
                                                }}>End date shall not early than start date!</Typography>) : null}
                                            </div>
                                        )}
                                    <Box sx={{ mb: 2, marginTop: '15px' }}>
                                        <div>
                                            {stepInputs[index] === '' ? (<Typography sx={{
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
                                                disabled={(index === 0 || index === 1 || index === 2) ?
                                                    stepInputs[index] === '' :
                                                    (stepInputs[3] === '' || stepInputs[4] === '' || showDateError)}
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
                </>
            ) : null}
        </>
    );
};


export default CommonSteps;