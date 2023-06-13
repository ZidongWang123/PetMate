import React from "react";
import ActivityCard from "../ActivityCard";
import Application from "../../Application/Application";

const Created = ({activityType}) => {
    return (
        <div style={{
            width: '100%',
        }}>
            <ActivityCard activityType={activityType} isCreate={true}/>
            <Application />
        </div>
    );
}

export default Created;