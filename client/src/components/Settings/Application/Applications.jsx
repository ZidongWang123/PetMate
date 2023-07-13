import React from "react";
import Application from "./Application";
import { useParams } from "react-router-dom";
import { getApplicationsByActivityId } from "../../../actions/application.js";
import { Box } from "@mui/material";

const Applications = () => {
    const { id } = useParams();
    const [applications, setApplications] = React.useState(null);

    React.useEffect(() => {
        getApplicationsByActivityId(id)
        .then((items) => {
          setApplications(items.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [])

    if (!applications) {
        return <div>Loading...</div>;
      }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width:'100%'
            }}
        >
            {applications ? (
                <div>
                    {applications.map((application) => (
                        <Application key={application._id} application={application} />
                    ))}
                </div>
            ) : null}
        </Box>
    );
}

export default Applications;