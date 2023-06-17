
import React from "react";
import Activity from "../Activity";

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
        label: 'Please enter the title of the service',
        tip: 'title of service',
    },
    {
        label: 'Please enter the location of the service',
        tip: 'place in your city',
    },
    {
        label: 'Please enter a price (euro/day)',
        tip: 'euro/day',
    },
];

const Service = () => {
    return (
        <>
            <Activity activity='service' commonSteps={commonServiceSteps} creationSteps={creationServiceSteps} />
        </>
    );
};


export default Service;