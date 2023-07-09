import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getService } from "../../../../actions/service";
import { Box, Button, Typography } from "@mui/material";
import { brightPurple } from "../../../../constant/actionTypes";
import { fetchPersonalInfo } from "../../../../actions/service";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";

const ActivityPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    console.log(id);
    //dispatch(getService(id));
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

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.1)',
                margin: '15px 30px 15px 30px',
                fontFamily: 'Cosmic Sans MS',
                width: '280px',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: '15px',
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
                            <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {service.service.title}
                            </Typography>
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
                    </Box>) : null}
                <Button
                    sx={{
                        width: '70%',
                        backgroundColor: brightPurple,
                        color: 'white',
                        borderRadius: '20px',
                        marginBottom: '15px',
                    }}>
                    Apply the activity
                </Button>
            </Box>
        </>
    );
}

export default ActivityPage;