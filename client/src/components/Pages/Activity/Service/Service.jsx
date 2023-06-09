
import React from "react";
import { Container } from "@mui/material";

//import InputBar from "../../Widget/InputBar/InputBar";

import './Service.css'
import PrimePrivileges from "../PrimePrivileges/PrimePrivileges";
import CommonSteps from "../CommonSteps/CommonSteps";
import PageHeader from "../PageHeader/PageHeader";
import CreationSteps from "../CommonSteps/CreationSteps";

const city = ['Munich', 'Berlin', 'Frankfurt']
const pet = ['dog', 'cat', 'any']
const serviceType = ['walking', 'sitting', 'training', 'any']
const commonServiceSteps = [
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

const creationServiceSteps = [
    {
        label: 'Please enter a price (euro/day)',
        tip: 'euro/day',
    },
    {
        label: 'Please enter the location of the service',
        tip: 'place of your city',
    },
];

const Service = () => {

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

    const goNext = () => {
        //todo: go to next page
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
                        <CommonSteps steps={commonServiceSteps} showStepper={showStepper} onGoNext={goNext}/>
                        {/* todo: add condition to use creation steps only by prime */}
                        <CreationSteps steps={creationServiceSteps} showStepper={true} onGoNext={goNext}/>
        </Container >
    );
};


export default Service;