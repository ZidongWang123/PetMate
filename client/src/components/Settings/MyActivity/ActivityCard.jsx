import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { orange, brightPurple } from "../../../constant/actionTypes";

const ActivityCard = ({ activityType, isApply, isCreate }) => {

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
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: '15px 30px 15px 30px',
                    width: '40%',
                }}>
                    <Typography variant="h6">
                        title: ''
                    </Typography>
                    <Typography variant="h6">
                        creator: ''
                    </Typography>
                    <Typography variant="h6">
                        pet type: ''
                    </Typography>
                    <Typography variant="h6">
                        {activityType} type: ''
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
                    {activityType === 'services' ? (
                        <>
                            <Typography variant="h6">
                                price: ''
                            </Typography>
                        </>
                    ) : null}
                    {activityType === 'events' ? (
                        <>
                            <Typography variant="h6">
                                expectedParticipants: ''
                            </Typography>
                            <Typography variant="h6">
                                now: ''
                            </Typography>
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
                    <Typography variant="h6" sx={{
                        height: '10%',
                    }}>
                        description of the {activityType}:
                    </Typography>
                    <Typography variant="h6" sx={{
                        wordWrap: 'break-word',
                        maxWidth: '100%',
                    }} >
                        HIHIHIHIHIHIHIHIHIHIHHIHIHIHIHIHIHIHIHIHIHIHIHHIHIHIHIHIHIHIHIHIHIHIHIHHIHIHIHIHIHIHIHIHIHIHIHIHHIHI
                    </Typography>

                    {isApply ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '10%',
                            width: '100%',
                            padding: '0px 20px 0px 20px',
                            justifyContent: 'space-between',
                            boxSizing: 'border-box',
                        }}>
                            <Button
                            sx={{
                                width: '30%',
                                backgroundColor: orange,
                                color: 'white',
                                borderRadius: '20px',
                            }}>
                                Apply
                            </Button>
                            {/* todo: if applied, show text, applied or approved */}
                            <Button
                            sx={{
                                width: '30%',
                                backgroundColor: brightPurple,
                                color: 'white',
                                borderRadius: '20px',
                            }}>
                                Withdraw
                            </Button>
                        </Box>) : null}

                        {isCreate ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '10%',
                            width: '100%',
                            padding: '0px 20px 0px 20px',
                            justifyContent: 'space-between',
                            boxSizing: 'border-box',
                        }}>
                            <Button
                            sx={{
                                width: '30%',
                                backgroundColor: orange,
                                color: 'white',
                                borderRadius: '20px',
                            }}>
                                Edit
                            </Button>
                            {/* todo: if applied, show text, applied or approved */}
                            <Button
                            sx={{
                                width: '30%',
                                backgroundColor: brightPurple,
                                color: 'white',
                                borderRadius: '20px',
                            }}>
                                Application
                            </Button>
                        </Box>) : null}

                </Box>

            </Box >
        </>
    );
}

export default ActivityCard;