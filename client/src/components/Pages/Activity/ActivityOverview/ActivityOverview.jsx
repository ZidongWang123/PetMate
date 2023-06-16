import { Box, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import { brightPurple } from "../../../../constant/actionTypes";

const ActivityOverview = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                border: '1px solid black',
                borderRadius: '30px',
                margin: '15px 30px 15px 30px',
                fontFamily: 'Cosmic Sans MS',
                width: '240px',
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
                    width: '60%',
                }}>
                    <Typography variant="h6">
                        title: ''
                    </Typography>
                    <Typography variant="h6">
                        date: ''
                    </Typography>
                    <Typography variant="h6">
                        city: ''
                    </Typography>
                    <Typography variant="h6">
                        location: ''
                    </Typography>
                    <Typography variant="h6">
                        status: ''
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
