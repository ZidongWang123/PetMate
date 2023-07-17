import React from "react";
import Application from "./Application";
import { useParams } from "react-router-dom";
import { getApplicationsByActivityId } from "../../../actions/application.js";
import { Box, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';

const Applications = () => {
    const { id } = useParams();
    const [applications, setApplications] = React.useState(null);

    const location = useLocation();
    const activityType = location.state.activityType;

    React.useEffect(() => {
        getApplicationsByActivityId(id)
            .then((items) => {
                setApplications(items.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id])

    if (!applications) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            {applications && applications.length !== 0 ? (
                <div>
                    {applications.map((application) => (
                        <Application key={application._id} application={application} isEvent={ activityType === 'events' }/>
                    ))}
                </div>
            ) : <Typography
                variant="h6"
                sx={{
                    alignSelf: 'center',
                }}
            >
                No Applications!
            </Typography>}
        </Box>
    );
}

export default Applications;