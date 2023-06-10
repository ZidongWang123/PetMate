
import React from "react";
import Activity from "../Activity";

const city = ['Munich', 'Berlin', 'Frankfurt']
const pet = ['dog', 'cat', 'any']
const eventType = ['walking', 'sitting', 'training', 'any']
const commonEventSteps = [
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
const creationEventSteps = [
    {
        label: 'Please enter the title of the event',
        tip: 'title of event',
    },
    {
        label: 'Please enter the location of the event',
        tip: 'place in your city',
    },
    {
        label: 'Please enter the expected amount of participants',
        tip: 'how many people do you expect to come?',
    },
];

const Event = () => {
    return (
        <>
            <Activity activity='event' commonSteps={commonEventSteps} creationSteps={creationEventSteps} />
        </>
    );
};


export default Event;