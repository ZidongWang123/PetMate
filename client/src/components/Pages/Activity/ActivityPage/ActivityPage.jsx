import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getService } from "../../../../actions/service";
import { getEvent } from "../../../../actions/event";
import { Box, Button, Typography } from "@mui/material";
import { brightPurple, APPROVED } from "../../../../constant/actionTypes";
import { fetchPersonalInfo } from "../../../../actions/service";
import { fetchPersonalInfoEvent } from "../../../../actions/event";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { TextareaAutosize, Tooltip } from "@mui/material";
import { createApplication } from "../../../../actions/application";
import { useNavigate } from "react-router-dom";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";
import { getApplicationsByActivityId } from "../../../../actions/application";

const ActivityPage = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const { activityType, id } = useParams();
    const navigate = useNavigate();

    const currentPath = window.location.pathname; //get the current path

    //set the introduction of the application
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
    };

    React.useEffect(() => {
        if (id) {
            if (activityType === 'service') {
                dispatch(getService(id));
            }

            if (activityType === 'event') {
                dispatch(getEvent(id));
            }
        }
    }, [dispatch, id, activityType]);

    const service = useSelector((state) => state.service.service);
    const event = useSelector((state) => state.event.event);

    const formattedStartDate = React.useRef(null);
    const formattedEndDate = React.useRef(null);

    React.useEffect(() => {
        if (service) {
            formattedStartDate.current = new Date(service.service.startDate).toLocaleDateString();
            formattedEndDate.current = new Date(service.service.endDate).toLocaleDateString();
            dispatch(fetchPersonalInfo(service.service.creator));
        }

        if (event) {
            formattedStartDate.current = new Date(event.event.startDate).toLocaleDateString();
            formattedEndDate.current = new Date(event.event.endDate).toLocaleDateString();
            dispatch(fetchPersonalInfoEvent(event.event.creator));
        }
    }, [dispatch, service, event]);

    React.useEffect(() => {
        if (service) {
            getApplicationsByActivityId(service.service._id).then((item) => {
                service.service.applicant = item.data.length;
            }).catch((err) => {
                console.log(err)
            })
        }

        if (event) {
            getApplicationsByActivityId(event.event._id).then((item) => {
                event.event.currentParticipants = item.data.filter(element => element.status === APPROVED).length;
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [service, event]);

    const { servicesCreator } = useSelector((state) => state.service);
    const { eventsCreator } = useSelector((state) => state.event);

    const [showFeedbackMsg, setShowFeedbackMsg] = React.useState(false);

    const handelfeebackMsgClose = () => {
        currentPath.includes('service') ? navigate('/service') : navigate('/event');
        setShowFeedbackMsg(false)
    }

    const handleApply = () => {
        if (user.result._id && service && service.service && service.service.creator && service.service._id) {
            createApplication([value, service.service.creator, service.service._id, user.result._id]).then(() => {
                setShowFeedbackMsg(true);
              })
              .catch((error) => {
                console.log(error);
              });
            setShowFeedbackMsg(true)
        }

        if (user.result._id && event && event.event && event.event.creator && event.event._id) {
            createApplication([value, event.event.creator, event.event._id, user.result._id]).then(() => {
                setShowFeedbackMsg(true);
              })
              .catch((error) => {
                console.log(error);
              });
        }
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '15px 30px 15px 30px',
                padding: '10px 20px 10px 20px',
                fontFamily: 'Cosmic Sans MS',
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                height: '100%',

                '@media (max-width: 600px)': {
                    padding: '5px 5px 5px 5px',
                    margin: '5px 10px 5px 10px',
                },
            }}>
                {/* box for avatar username and apply */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: '15px',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '30%',
                        alignItems: 'center',
                    }}>
                        {activityType === 'service' && servicesCreator && (
                            servicesCreator.result.avatar ? (
                                <Avatar src={servicesCreator.result.avatar} sx={{
                                    border: '0.1px solid gray',
                                    width: '80px',
                                    height: '80px',
                                }} />
                            ) : (
                                <Avatar sx={{ border: '0.1px solid gray' }}>{servicesCreator.result.name.charAt(0)}</Avatar>
                            )
                        )}
                        {activityType === 'service' && servicesCreator ? (
                            <Typography variant="h6"
                                sx={{
                                    marginLeft: '10px',
                                }}>
                                {servicesCreator?.result.name}
                            </Typography>) : null}

                        {activityType === 'event' && eventsCreator && (
                            eventsCreator.result.avatar ? (
                                <Avatar src={eventsCreator.result.avatar} sx={{
                                    border: '0.1px solid gray',
                                    width: '80px',
                                    height: '80px',
                                }} />
                            ) : (
                                <Avatar sx={{ border: '0.1px solid gray' }}>{eventsCreator.result.name.charAt(0)}</Avatar>
                            )
                        )}
                        {activityType === 'event' && eventsCreator ? (
                            <Typography variant="h6"
                                sx={{
                                    marginLeft: '10px',
                                }}>
                                {eventsCreator?.result.name}
                            </Typography>) : null}
                    </Box>
                    <Button
                        sx={{
                            width: '10%',
                            backgroundColor: brightPurple,
                            color: 'white',
                            borderRadius: '20px',
                        }}
                        onClick={handleApply}>
                        Apply!
                    </Button>
                </Box>

                {/* box for activity data */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '20px',
                    width: '100%',

                    '@media (max-width: 960px)': {
                        flexDirection: 'column',
                    },
                }}>
                    <Box sx={{
                        width: '300px',

                        '@media (max-width: 600px)': {
                            width: '100%',
                        },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            margin: '5px 0px 5px 0px',
                            width: '90%',
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    Title:
                                </Typography>
                                {service ? (
                                    <Tooltip title={service.service.title}>
                                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {service.service.title}
                                        </Typography>
                                    </Tooltip>) : null}
                                {event ? (
                                    <Tooltip title={event.event.title}>
                                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {event.event.title}
                                        </Typography>
                                    </Tooltip>) : null}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    City:
                                </Typography>
                                {service ? (
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {service.service.city}
                                    </Typography>) : null}
                                {event ? (
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {event.event.city}
                                    </Typography>) : null}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    PetSpecies:
                                </Typography>
                                {service ? (
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {service.service.petSpecies}
                                    </Typography>) : null}
                                {event ? (
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {event.event.petSpecies}
                                    </Typography>) : null}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    Type:
                                </Typography>
                                {service ? (
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {service.service.type}
                                    </Typography>) : null}
                                {event ? (
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {event.event.type}
                                    </Typography>) : null}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    StartDate:
                                </Typography>
                                <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {formattedStartDate.current}
                                </Typography>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    EndDate:
                                </Typography>
                                <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {formattedEndDate.current}
                                </Typography>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    Location:
                                </Typography>
                                {service ? (<Tooltip title={service.service.location}>
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {service.service.location}
                                    </Typography>
                                </Tooltip>) : null}
                                {event ? (<Tooltip title={event.event.location}>
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {event.event.location}
                                    </Typography>
                                </Tooltip>) : null}
                            </div>
                            {service ?
                                (<>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                            Price (euro/day):
                                        </Typography>
                                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {service.service.price}
                                        </Typography>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                            No. of applicants:
                                        </Typography>
                                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {service.service.applicant}
                                        </Typography>
                                    </div>
                                </>) : null}

                            {event ?
                                (<>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                            Current participants:
                                        </Typography>
                                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {event.event.currentParticipants}
                                        </Typography>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                            Expected participants:
                                        </Typography>
                                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {event.event.expectedParticipants}
                                        </Typography>
                                    </div>
                                </>) : null}
                        </Box>
                    </Box>

                    {/* box for content */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        width: '60%',

                        '@media (max-width: 600px)': {
                            width: '100%',
                        },
                    }}>
                        {service ? (
                            <>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    Discription:
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        border: '1px solid black',
                                        borderRadius: '10px',
                                        width: '100%',
                                    }}
                                >
                                    <Typography variant="h6" >
                                        {service.service.content}
                                    </Typography>
                                </Box>
                            </>
                        ) : null}

                        {event ? (
                            <>
                                <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                    Discription:
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        border: '1px solid black',
                                        borderRadius: '10px',
                                        width: '100%',
                                    }}
                                >
                                    <Typography variant="h6" >
                                        {event.event.content}
                                    </Typography>
                                </Box>
                            </>
                        ) : null}
                    </Box>
                </Box>

                {/* box for apply introduction */}
                <Box
                    sx={{
                        width: '100%',
                        marginTop: '20px',
                    }}>
                    <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                    }}>
                        Please give a introduction about yourself:
                    </Typography>
                    <TextareaAutosize
                        required
                        value={value}
                        onChange={handleChange}
                        minRows={4}
                        maxRows={10}
                        style={{
                            marginTop: '10px',
                            borderRadius: '10px',
                            border: '1px solid gray',
                            fontFamily: 'Comic Sans MS',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: 'black',
                            height: '80%',
                            width: '100%',
                        }}
                    />
                </Box>
            </Box>
            <FeedbackMsg status={showFeedbackMsg} message='Sucessful applied' severity='success' onClose={handelfeebackMsgClose} />
        </>
    );
}

export default ActivityPage;