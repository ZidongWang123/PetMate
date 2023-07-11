import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getService } from "../../../../actions/service";
import { Box, Button, Typography } from "@mui/material";
import { brightPurple } from "../../../../constant/actionTypes";
import { fetchPersonalInfo } from "../../../../actions/service";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { TextareaAutosize, Tooltip } from "@mui/material";
import { createApplication } from "../../../../api";
import { useNavigate } from "react-router-dom";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";

const ActivityPage = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const currentPath = window.location.pathname; //get the current path

    //set the introduction of the application
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        console.log(newValue);
        setValue(newValue);
    };

    React.useEffect(() => {
        if (id) {
            dispatch(getService(id));
        }
    }, [dispatch, id]);

    const service = useSelector((state) => state.service.service);

    const formattedStartDate = React.useRef(null);
    const formattedEndDate = React.useRef(null);

    React.useEffect(() => {
        if (service) {
            formattedStartDate.current = new Date(service.service.startDate).toLocaleDateString();
            formattedEndDate.current = new Date(service.service.endDate).toLocaleDateString();
            dispatch(fetchPersonalInfo(service.service.creator));
        }
    }, [dispatch, service]);

    const { servicesCreator } = useSelector((state) => state.service);
    //console.log(service, servicesCreator);

    const [showFeedbackMsg, setShowFeedbackMsg] = React.useState(false);

    const handelfeebackMsgClose = () => {
        currentPath.includes('service') ? navigate('/service') : navigate('/event');
        setShowFeedbackMsg(false)
    }

    const handleApply = () => {
        if (user.result._id && service && service.service && service.service.creator && service.service._id) {
            createApplication([ value, service.service.creator, service.service._id, user.result._id ]);
            setShowFeedbackMsg(true)
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
                        {servicesCreator && (
                            servicesCreator.result.avatar ? (
                                <Avatar src={servicesCreator.result.avatar} sx={{
                                    border: '0.1px solid gray',
                                    width: '80px', // 设置宽度
                                    height: '80px', // 设置高度  
                                }} />
                            ) : (
                                <Avatar sx={{ border: '0.1px solid gray' }}>{servicesCreator.result.name.charAt(0)}</Avatar>
                            )
                        )}
                        <Typography variant="h6"
                            sx={{
                                marginLeft: '10px',
                            }}>
                            {servicesCreator?.result.name}
                        </Typography>
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
                        {service ? (
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
                                    {/* <Typography variant="h6" sx={{ textAlign: 'end' }}>
                                        {service.service.title}
                                    </Typography> */}
                                    <Tooltip title={service.service.title}>
                                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {service.service.title}
                                        </Typography>
                                    </Tooltip>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                        City:
                                    </Typography>
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {service.service.city}
                                    </Typography>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                        PetSpecies:
                                    </Typography>
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {service.service.petSpecies}
                                    </Typography>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                        Type:
                                    </Typography>
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {service.service.type}
                                    </Typography>
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
                                    <Tooltip title={service.service.location}>
                                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {service.service.location}
                                        </Typography>
                                    </Tooltip>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                                        Price (euro/day):
                                    </Typography>
                                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {service.service.price}
                                    </Typography>
                                </div>
                            </Box>) : null}
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