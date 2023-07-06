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
                flexDirection: 'row',
                alignItems: 'flex-start',
                borderRadius: '20px',
                boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.1)',
                margin: '15px 30px 15px 30px',
                fontFamily: 'Cosmic Sans MS',
                width: '300px',
                backgroundColor: 'white',

            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'center',
                    padding: '1opx'
                }}>
                    <Avatar alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography variant="h6">
                        {user?.result.name}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: '5px 0px 5px 15px',
                    width: '70%',
                }}>
                    <Typography variant="h6">
                        Title: {activityData.title}
                    </Typography>
                    <Typography variant="h6">
                        StartDate: {formattedStartDate}
                    </Typography>
                    <Typography variant="h6">
                        EndDate: {formattedEndDate}
                    </Typography>
                    <Typography variant="h6">
                        City: {activityData.city}
                    </Typography>
                    <Typography variant="h6">
                        Location: {activityData.location}
                    </Typography>
                    <Button
                        sx={{
                            width: '100%',
                            backgroundColor: brightPurple,
                            color: 'white',
                            borderRadius: '20px',
                        }}>
                        Choose
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ActivityOverview;
