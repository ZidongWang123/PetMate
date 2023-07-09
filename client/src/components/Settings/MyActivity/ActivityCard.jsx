import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { orange, brightPurple } from "../../../constant/actionTypes";

const ActivityCard = ({ activityType, isApply, isCreate, activityData, onEdit }) => {

    const formattedStartDate = new Date(activityData?.startDate).toLocaleDateString();
    const formattedEndDate = new Date(activityData?.endDate).toLocaleDateString();

    const handleEdit = (activityType, activityData) => {
        console.log(activityType, activityData);
        onEdit(activityType, activityData);
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
                //width: '80%',
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
                                Price:
                            </Typography>
                            <Typography variant="h6" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {activityData?.price}
                            </Typography>
                        </div>

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
                                    width: '40%',
                                    backgroundColor: orange,
                                    color: 'white',
                                    borderRadius: '20px',
                                }}
                                onClick={() => handleEdit(activityType, activityData)}>
                            Edit
                        </Button>
                            {/* todo: if applied, show text, applied or approved */}
                    <Button
                        sx={{
                            width: '40%',
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