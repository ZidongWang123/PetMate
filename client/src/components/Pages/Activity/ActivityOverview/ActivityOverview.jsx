import { Box, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import { brightPurple } from "../../../../constant/actionTypes";

const ActivityOverview = ({ activityData, isLoading }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const formattedStartDate = new Date(activityData.startDate).toLocaleDateString();
    const formattedEndDate = new Date(activityData.endDate).toLocaleDateString();


    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.1)',
                margin: '15px 30px 15px 30px',
                fontFamily: 'Cosmic Sans MS',
                width: '320px',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '0.1px solid gray',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: '15px',
                }}>
                    <Avatar alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography variant="h6"
                        sx={{
                            marginLeft: '10px',
                        }}>
                        {user?.result.name}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: '5px 0px 5px 15px',
                    width: '90%',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800}}>
                            Title:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>
                            {activityData.title}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800}}>
                            StartDate:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>
                            {formattedStartDate}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800}}>
                            EndDate:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>
                            {formattedEndDate}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800}}>
                            City:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>
                            {activityData.city}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%' }}>
                        <Typography variant="h6" sx={{ marginRight: '1em', fontWeight: 800}}>
                            Location:
                        </Typography>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>
                            {activityData.location}
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
