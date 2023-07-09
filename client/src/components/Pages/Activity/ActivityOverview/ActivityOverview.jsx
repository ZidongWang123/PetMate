import { Box, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import { brightPurple } from "../../../../constant/actionTypes";
import { useDispatch } from "react-redux";
import { fetchPersonalInfo } from "../../../../actions/service";
import { useSelector } from "react-redux";

const ActivityOverview = ({ activityData }) => {
    //const user = JSON.parse(localStorage.getItem('profile'));
    const formattedStartDate = new Date(activityData.startDate).toLocaleDateString();
    const formattedEndDate = new Date(activityData.endDate).toLocaleDateString();
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        if (activityData) {
            dispatch(fetchPersonalInfo(activityData.creator));
        }
    }, [dispatch, activityData]);

    const { servicesCreator } = useSelector((state) => state.service);
    console.log('creator: ', servicesCreator);
    //有个问题：一页中的activityoverview的头像都是一样的cao

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
                            <Avatar src={servicesCreator.result.avatar} sx={{ border: '0.1px solid gray' }} />
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
                            {activityData.title}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            City:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {activityData.city}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            PetSpecies:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {activityData.petSpecies}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800 }}>
                            Type:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {activityData.type}
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
                </Box>
                <Button
                    sx={{
                        width: '70%',
                        backgroundColor: brightPurple,
                        color: 'white',
                        borderRadius: '20px',
                        marginBottom: '15px',
                    }}>
                    Choose
                </Button>
            </Box>
        </>
    );
}

export default ActivityOverview;
