import React from "react";
import ActivityCard from "../ActivityCard";
import { getApplicationsByApplicantId, deleteApplication } from "../../../../actions/application.js";
import { getServiceByApplication } from "../../../../actions/service.js";
import { getEventByApplication, decrementParticipants } from "../../../../actions/event.js";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";
import { Typography } from "@mui/material";
import { APPROVED } from "../../../../constant/actionTypes";

const Applied = ({ activityType }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const applicantId = user.result._id;

    const [actiIds, setActiIds] = React.useState([]);
    const [dataLoaded, setDataLoaded] = React.useState(false);

    const [appliedServices, setAppliedServices] = React.useState([]);
    const [appliedEvents, setAppliedEvents] = React.useState([]);

    const [showFeedbackMsg, setShowFeedbackMsg] = React.useState(false);

    const handelfeebackMsgClose = () => {
        window.location.reload()
    }

    React.useEffect(() => {
        getApplicationsByApplicantId(applicantId)
            .then((item) => {
                if (item && item.data && item.data.data.length > 0) {
                    const activities = item.data.data.map((element) =>
                        ({
                            activityId: element.activityId,
                            applicationId: element._id,
                            applicationStatus: element.status
                        })
                    );
                    const uniActivities = Array.from(new Set(activities));
                    setActiIds(uniActivities);
                    setDataLoaded(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dataLoaded, applicantId]);

    React.useEffect(() => {
        actiIds.forEach((activity) => {
            if (activityType === 'services') {
                getServiceByApplication(activity.activityId).then((item) => {
                    if (item.data) {
                        item.data.applicationStatus = activity.applicationStatus;
                        item.data.applicationId = activity.applicationId;

                        setAppliedServices(prev => {
                            if (prev.some(service => JSON.stringify(service) === JSON.stringify(item.data))) {
                                return prev;
                            } else {
                                return [...prev, item.data];
                            }
                        });
                    } else {
                        console.log('item.data is null or undefined');
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }

            if (activityType === 'events') {
                getEventByApplication(activity.activityId).then((item) => {
                    if (item.data) {
                        item.data.applicationStatus = activity.applicationStatus;
                        item.data.applicationId = activity.applicationId;

                        setAppliedEvents(prev => {
                            if (prev.some(service => JSON.stringify(service) === JSON.stringify(item.data))) {
                                return prev;
                            } else {
                                return [...prev, item.data];
                            }
                        });
                    } else {
                        console.log('item.data is null or undefined');
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        })
    }, [actiIds, activityType]);

    React.useEffect(() => {
        console.log(appliedServices, appliedEvents)
    }, [appliedServices, appliedEvents])

    const withdraw = (activityData) => {
        if(activityType === 'events' && activityData.applicationStatus === APPROVED){
            decrementParticipants(activityData._id)
            .then(() => {
                deleteApplication(activityData.applicationId);
                setShowFeedbackMsg(true);
              })
              .catch((error) => {
                console.log(error)
              });
        } else {
            deleteApplication(activityData.applicationId)
            setShowFeedbackMsg(true);
        }
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        }}>
            {(activityType === 'services') && appliedServices && appliedServices.length !== 0 ? (
                <>
                    <div>
                        {appliedServices.map((service) => (
                            <ActivityCard key={service._id} activityType={activityType} isApply={true} activityData={service} withdraw={withdraw} />
                        ))}
                    </div>
                </>
            ) : null}

            {(activityType === 'events') && appliedEvents && appliedEvents.length !== 0 ? (
                <>
                    <div>
                        {appliedEvents.map((event) => (
                            <ActivityCard key={event._id} activityType={activityType} isApply={true} activityData={event} withdraw={withdraw} />
                        ))}
                    </div>
                </>
            ) : null}
            {(activityType === 'services') && (appliedServices === undefined || appliedServices.length === 0) ?
                (<Typography
                    variant="h6"
                    sx={{
                        marginTop: '60px'
                    }}
                >
                    You have no applied {activityType}!
                </Typography>) : null}

            {(activityType === 'events') && (appliedEvents === undefined || appliedEvents.length === 0) ?
                (<Typography
                    variant="h6"
                    sx={{
                        marginTop: '60px'
                    }}
                >
                    You have no applied {activityType}!
                </Typography>) : null}

            <FeedbackMsg
                status={showFeedbackMsg}
                message="Sucessful published"
                severity="success"
                onClose={handelfeebackMsgClose}
            />
        </div >
    );
}

export default Applied;