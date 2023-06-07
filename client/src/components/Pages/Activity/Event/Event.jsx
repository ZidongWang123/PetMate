
import React from "react";
import { Container } from "@mui/material";
import './Event.css'
import PrimePrivileges from "../PrimePrivileges/PrimePrivileges";
import CreationSteps from "../Creation/CreationSteps";
import PageHeader from "../PageHeader/PageHeader";

const city = ['Munich', 'Berlin', 'Frankfurt']
const pet = ['dog', 'cat', 'any']
const eventType = ['walking', 'sitting', 'training', 'any']
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
        label: 'Please select a event type',
        content: eventType,
    },
    {
        label: 'Please select a event date',
    },
];

const Event = () => {

    const [showStepper, setShowStepper] = React.useState(false);
    const [showPrimePrivileges, setShowPrimePrivileges] = React.useState(false);

    const selectActivity = () => {
        setShowStepper(true);
    };

    const createActivity = () => {
        setShowStepper(true);
    };

    const showMore = () => {
        setShowPrimePrivileges(true) //todo: should detect if user is prime
    };


    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
                        <PageHeader onContinue={showMore}/>
                        { showPrimePrivileges ? (<PrimePrivileges activity = "service" select = { selectActivity } create = { createActivity } />): null}
                        <CreationSteps steps={steps} showStepper={showStepper} />
        </Container >
    );
};


export default Event;