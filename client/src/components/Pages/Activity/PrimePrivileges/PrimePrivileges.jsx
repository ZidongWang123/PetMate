import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { brightPurple, darkPurple, orange } from '../../../../constant/actionTypes';


const PrimePrivileges = ({ showPrimePrivileges, activity, select, create }) => {
    const handleLookFor = () => {
        select();
    };

    const handleCreate = () => {
        create();
    };

    return (
        <>
            {showPrimePrivileges ? (<Paper sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'inherit',
                boxShadow: 'none',
            }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: 'Comic Sans MS',
                        fontWeight: 'bold',
                        color: darkPurple,
                        marginTop: '100px',
                    }}
                >Do you want to search a {activity} or create a {activity}?</Typography>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: '50px',
                }}>
                    <Button
                        onClick={handleLookFor}
                        sx={{
                            color: 'white',
                            fontFamily: 'Comic Sans MS',
                            fontWeight: 'bold',
                            backgroundColor: brightPurple,
                            borderRadius: '20px',
                            marginLeft: '10px',
                            marginRight: '50px',
                            width: '200px',
                        }}
                    >
                        Search a {activity}
                    </Button>
                    <Button
                        onClick={handleCreate}
                        sx={{
                            color: 'white',
                            fontFamily: 'Comic Sans MS',
                            fontWeight: 'bold',
                            backgroundColor: orange,
                            borderRadius: '20px',
                            marginLeft: '50px',
                            marginRight: '10px',
                            width: '200px',
                        }}
                    >
                        Create a {activity}
                    </Button>
                </div>
            </Paper>) : null}
        </>
    );
};

export default PrimePrivileges;