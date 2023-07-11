import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { brightPurple, orange, darkGray } from "../../../constant/actionTypes";

const Application = (application) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '15px 30px 15px 30px',
            fontFamily: 'Cosmic Sans MS',
            justifyContent: 'space-between',
            width: 'auto',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignSelf: 'center',
                width: '20%',
            }}>
                <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography variant="h6">
                    {user.result.name}
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: '5px 5px 5px 5px',
                width: '60%',
                border: '1px solid black',
                padding: '10px',
            }}>
                <Typography variant="h6" sx={{
                    height: '10%',
                    alignSelf: 'center',
                    color: darkGray
                }}>
                    SelfInfo
                </Typography>
                <Typography variant="h6" sx={{
                    wordWrap: 'break-word',
                    maxWidth: '100%',
                }} >
                    HIHIHIHIHIHIHIHIHIHIHHIHIHIHIHIHIHIHIHIHIHIHIHHIHIHIHIHIHIHIHIHIHIHIHIHHIHIHIHIHIHIHIHIHIHIHIHIHHIHI
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 20px 0px 20px',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                width: '20%',
                height: '100%',
                alignItems: 'center',
            }}>
                <Button
                    sx={{
                        width: '100%',
                        backgroundColor: orange,
                        color: 'white',
                        borderRadius: '20px',
                        margin: '10px 0px 10px 0px',
                    }}>
                    Approve
                </Button>
                <Button
                    sx={{
                        width: '100%',
                        backgroundColor: brightPurple,
                        color: 'white',
                        borderRadius: '20px',
                        margin: '10px 0px 10px 0px',
                    }}>
                    Reject
                </Button>
            </Box>
        </Box>
    );
}

export default Application;