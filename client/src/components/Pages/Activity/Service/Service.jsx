
import React from "react";
import { Container } from "@mui/material";

//import InputBar from "../../Widget/InputBar/InputBar";

import './Service.css'
import PrimePrivileges from "../PrimePrivileges/PrimePrivileges";
import CreationSteps from "../Creation/CreationSteps";

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
    {
        label: 'Please select a service date',
    },
];

const Service = () => {

    const [showStepper, setShowStepper] = React.useState(false);

    const selectActivity = () => {
        setShowStepper(true);
    };

    const createActivity = () => {
        setShowStepper(true);
    };

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
                        {/* todo: check if the user is prime */ }
                        <PrimePrivileges activity = "service" select = { selectActivity } create = { createActivity } />
                        <CreationSteps steps={steps} showStepper={showStepper} />
        </Container >
    );
};


export default Service;