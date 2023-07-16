import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { orange, brightPurple, PENDING, APPROVED, REJECT } from "../../../constant/actionTypes";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from '../../Widget/ConfirmDialog/ConfirmDialog';
import { useDispatch } from "react-redux";
import { deleteService } from "../../../actions/service.js"
import { deleteEvent } from "../../../actions/event.js"
import FeedbackMsg from "../../Widget/FeedbackMsg/FeedbackMsg";

const ActivityCard = ({ activityType, isApply, isCreate, activityData, onEdit, withdraw }) => {
    const navigate = useNavigate();

    const formattedStartDate = new Date(activityData?.startDate).toLocaleDateString();
    const formattedEndDate = new Date(activityData?.endDate).toLocaleDateString();
    const [showFeedbackMsg, setShowFeedbackMsg] = React.useState(false);
    const dispatch = useDispatch();

    const handleEdit = (activityType, activityData) => {
        onEdit(activityType, activityData);
    }

    const getApplications = (activityType, activityData) => {
        navigate(`/applications/${activityData._id}`, { state: { activityType } })
    }

    const deleteApplication = (activityData) => {
        withdraw(activityData);
    }

    const deleteActivity = () => {
        try {
            if (activityType === 'services') {
                dispatch(deleteService(activityData._id));
            }

            if (activityType === 'events') {
                dispatch(deleteEvent(activityData._id));
            }

            setShowFeedbackMsg(true);
        } catch (error) {
            console.log('logout:', error);
        }
    };

    const handelfeebackMsgClose = () => {

        setShowFeedbackMsg(false);
        window.location.reload();
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                borderRadius: '30px',
                margin: '15px 30px 15px 30px',
                fontFamily: 'Cosmic Sans MS',
                flexGrow: 1,
                backgroundColor: 'white',
                boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.1)',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: '15px 30px 15px 30px',
                    width: '40%',
                }}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            Title:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {activityData?.title}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            City:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {activityData?.city}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            PetSpecies:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {activityData?.petSpecies}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            Type:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {activityData?.type}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            StartDate:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {formattedStartDate}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            EndDate:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {formattedEndDate}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            Location:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {activityData?.location}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            Status:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {activityData?.status}
                        </Typography>
                    </div>

                    {activityType === 'services' ? (
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                Price (euro/day):
                            </Typography>
                            <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {activityData?.price}
                            </Typography>
                        </div>

                    ) : null}
                    {activityType === 'events' ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    Expected:
                                </Typography>
                                <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {activityData?.expectedParticipants}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    Current:
                                </Typography>
                                <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {activityData?.currentParticipants}
                                </Typography>
                            </div>
                        </>
                    ) : null}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: '15px 30px 15px 30px',
                    width: '60%',
                    justifyContent: 'space-between',
                    height: '320px',
                }}>
                    <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                        Description of the {activityType}:
                    </Typography>
                    <Typography variant="h6" sx={{
                        wordWrap: 'break-word',
                        maxWidth: '100%',
                    }} >
                        {activityData?.content}
                    </Typography>

                    {isApply ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '10%',
                            width: '100%',
                            justifyContent: 'space-between',
                            boxSizing: 'border-box',
                            alignItem: 'center'
                        }}>
                            <Typography variant="h6" sx={{
                                wordWrap: 'break-word',
                                maxWidth: '100%',
                                flexGrow: 1,
                                fontSize: '18px',
                                color: activityData.applicationStatus === APPROVED
                                    ? 'green'
                                    : activityData.applicationStatus === REJECT
                                        ? 'red'
                                        : 'gray'
                            }} >
                                {activityData.applicationStatus === PENDING ? 'Your application still ' : 'This application is '} {activityData.applicationStatus}!
                            </Typography>
                            {/* todo: if applied, show text, applied or approved */}
                            <Button
                                sx={{
                                    width: '30%',
                                    backgroundColor: brightPurple,
                                    color: 'white',
                                    borderRadius: '20px',
                                }}
                                onClick={() => { deleteApplication(activityData) }}
                            >
                                Withdraw
                            </Button>
                        </Box>) : null}

                    {isCreate ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '10%',
                            width: '100%',
                            justifyContent: 'space-between',
                            boxSizing: 'border-box',
                        }}>
                            <Button
                                sx={{
                                    width: '30%',
                                    backgroundColor: orange,
                                    color: 'white',
                                    borderRadius: '20px',
                                }}
                                onClick={() => handleEdit(activityType, activityData)}>
                                Edit
                            </Button>

                            <Button
                                sx={{
                                    width: '30%',
                                    backgroundColor: brightPurple,
                                    color: 'white',
                                    borderRadius: '20px',
                                }}
                                onClick={() => getApplications(activityType, activityData)}>
                                Application
                            </Button>

                            {/* <Button
                                sx={{
                                    width: '30%',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '20px',
                                }}
                                onClick={() => handleDelete(activityType, activityData)}>
                                Delete
                            </Button> */}
                            <ConfirmDialog
                                fontSize='20px'
                                padding='0px'
                                button='Delete'
                                title="Confirm Delete"
                                contentText={`

                                                                    Are you sure you want to delete this activity?

                                                                `}
                                dialogColor='#6f0000'
                                buttonColor='red'
                                onConfirm={deleteActivity}
                            />
                        </Box>) : null}

                    <FeedbackMsg
                        status={showFeedbackMsg}
                        message="Sucessful published"
                        severity="success"
                        onClose={handelfeebackMsgClose}
                    />

                </Box>

            </Box >
        </>
    );
}

export default ActivityCard;