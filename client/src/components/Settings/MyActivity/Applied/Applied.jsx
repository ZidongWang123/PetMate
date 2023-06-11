import React from "react";
import ActivityCard from "./ActivityCard";

const Applied = ({activityType}) => {
    return (
        <div style={{
            width: '100%',
        }}>
            <ActivityCard activityType={activityType}/>
        </div>
    );
}

export default Applied;