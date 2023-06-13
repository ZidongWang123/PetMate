
import React from "react";
import { Container } from "@mui/material";

//import InputBar from "../../Widget/InputBar/InputBar";

import './Activity.css'
import PrimePrivileges from "./PrimePrivileges/PrimePrivileges";
import CommonSteps from "./CommonSteps/CommonSteps";
import PageHeader from "./PageHeader/PageHeader";
import CreationSteps from "./CommonSteps/CreationSteps";
import ActivityOverview from "./ActivityOverview/ActivityOverview";

const Activity = ({activity, commonSteps, creationSteps}) => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const [showCommonStepper, setShowCommonStepper] = React.useState(false);
    const [finishCommonStep, setFinishCommonStep] = React.useState(false);
    const [showCreationStepper, setShowCreationStepper] = React.useState(false);
    const [showPrimePrivileges, setShowPrimePrivileges] = React.useState(false);

    const [allInputs, setAllInputs] = React.useState([]);

    React.useEffect(() => {
        console.log(allInputs);
      }, [allInputs]);
      
    const selectActivity = () => {
        setShowCommonStepper(true);
        setShowCreationStepper(false);
    };

    const createActivity = () => {
        setShowCommonStepper(true);
        setShowCreationStepper(true);
    };

    const showMore = () => {
        if(user && user.result.isPrime){
            setShowPrimePrivileges(true);
        }else{
            setShowCommonStepper(true);
        }
    };

    const onFinishCommonStep = (stepInputs) => {
        setShowCommonStepper(false);
        if(user && user.result.isPrime){
            setFinishCommonStep(true);
        }

        setAllInputs(stepInputs);
        console.log(stepInputs, allInputs);
    };

    const onFinishCreationStep = (creationInputs) => {
        setShowCreationStepper(false);
        setAllInputs((prevInputs) => [...prevInputs, ...creationInputs]);
        console.log(allInputs);
    };

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
                        <PageHeader onContinue={showMore}/>
                        { showPrimePrivileges ? (<PrimePrivileges activity = {activity} select = { selectActivity } create = { createActivity } />): null}
                        <CommonSteps steps={commonSteps} showStepper={showCommonStepper} onFinishCommonStep={onFinishCommonStep}/>
                        <CreationSteps steps={creationSteps} showStepper={showCreationStepper && finishCommonStep} onFinishCreationStep={onFinishCreationStep}/>
                        <ActivityOverview />
        </Container >
    );
};


export default Activity;