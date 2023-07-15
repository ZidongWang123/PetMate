import React from "react";
import ActivityCard from "../ActivityCard";
import { getApplicationsByApplicantId, deleteApplication } from "../../../../actions/application.js";
import { getServiceByApplication } from "../../../../actions/service.js";
import { useLocation } from "react-router-dom";
import Pagination from "../../../Widget/Pagination/Pagination";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";
import { Typography } from "@mui/material";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Applied = ({ activityType }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const applicantId = user.result._id;

    const [actiIds, setActiIds] = React.useState([]);
    const [dataLoaded, setDataLoaded] = React.useState(false);

    const [appliedServices, setAppliedServices] = React.useState([]);

    const [showFeedbackMsg, setShowFeedbackMsg] = React.useState(false);

    const query = useQuery();
    const page = query.get('page') || 1;

    const handelfeebackMsgClose = () => {
        window.location.reload()
    }

    React.useEffect(() => {
        getApplicationsByApplicantId(applicantId)
            .then((item) => {
                if (item) {
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
            getServiceByApplication(activity.activityId).then((item) => {
                item.data.applicationStatus = activity.applicationStatus;
                item.data.applicationId = activity.applicationId;
                setAppliedServices(prev => {
                    if (prev.some(service => JSON.stringify(service) === JSON.stringify(item.data))) {
                        return prev;
                    } else {
                        return [...prev, item.data];
                    }
                }
                )
            })
                .catch((err) => {
                    console.log(err);
                });;
        })
    }, [actiIds]);

    React.useEffect(() => {
        console.log(appliedServices)
    }, [appliedServices])

    const withdraw = (id) => {
        deleteApplication(id)
        if (id) {
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
                    <Pagination page={page} userId={user.result._id} path={'appliedservices'} />
                </>
            ) : <Typography
                variant="h6"
                sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                }}
            >
                No applied services!
            </Typography>}
            <FeedbackMsg
                status={showFeedbackMsg}
                message="Sucessful published"
                severity="success"
                onClose={handelfeebackMsgClose}
            />
        </div>
    );
}

export default Applied;