import React from "react";
import ActivityCard from "../ActivityCard";
import Pagination from "../../../Widget/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PublishActivity from "../../../Pages/Activity/PublishActivity/PublishActivity";
import { useDispatch } from "react-redux";
import { updateService } from "../../../../actions/service";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";
import dayjs from 'dayjs';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Created = ({ activityType }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [edit, setEdit] = React.useState(false);
    const [allInputs, setAllInputs] = React.useState([]);
    const [activity, setActivity] = React.useState('');
    const [activityId, setActivityId] = React.useState('');

    const [showFeedbackMsg, setShowFeedbackMsg] = React.useState(false);
    const [content, setContent] = React.useState('');

    const dispatch = useDispatch();

    const query = useQuery();
    const page = query.get('page') || 1;

    const { createdServices } = useSelector((state) => state.createdService);

    const turnDate = (dateString) => {
        const date = dayjs(dateString);

        return date;
    };

    const onEdit = (activityType, activityData) => {
        const startDate = turnDate(activityData.startDate);
        const endDate = turnDate(activityData.endDate);
        setActivity(activityType.slice(0, -1));
        setContent(activityData.content);
        setActivityId(activityData._id);
        setAllInputs([activityData.city, activityData.petSpecies, activityData.type, startDate, endDate, activityData.title, activityData.location, activityData.price]);
        setEdit(true);
    }

    const publishAndGoBack = (value) => {
        //const newActivityAfterEdit;
        if (activity === 'service') {
            console.log(activityId, value);
            dispatch(updateService(activityId, value));
        }

        if (activity === 'event') {
            //dispatch(createEvent(value));
        }
        setShowFeedbackMsg(true)
        setEdit(false);
    };

    const handelfeebackMsgClose = () => {
        setShowFeedbackMsg(false)
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        }}>
            {edit ? (<PublishActivity activity={activity} allInputs={allInputs} publishAndGoBack={publishAndGoBack} isEdit={true} content={content} />) : (
                (activityType === 'services') && createdServices ? (
                    <>
                        <div>
                            {createdServices.map((service) => (
                                <ActivityCard key={service._id} activityType={activityType} isCreate={true} activityData={service} onEdit={onEdit} />
                            ))}
                        </div>
                        <Pagination page={page} userId={user.result._id} path={'createdservices'} />
                    </>
                ) : null)}
            <FeedbackMsg status={showFeedbackMsg} message='Sucessful published' severity='success' onClose={handelfeebackMsgClose} />
        </div>
    );
}

export default Created;