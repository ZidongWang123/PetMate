import React from "react";
import Application from "./Application";
import { useParams } from "react-router-dom";
import { getApplicationsByActivityId } from "../../../actions/application.js";
import Pagination from "../../Widget/Pagination/Pagination";
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Applications = () => {

    const query = useQuery();
    const page = query.get('page') || 1;
    console.log(page);


    const { id } = useParams();
    let applications;
    getApplicationsByActivityId(id).then((items) => {
        applications = items.data;
        console.log(applications);
    })
        .catch((error) => {
            console.log(error);
        });

    return (
        <div>
            {applications ? (
                <>
                    {applications.map((application) => (
                        <Application application={application} />
                    ))}
                </>
            ) : null}
        </div>
    );
}

export default Applications;