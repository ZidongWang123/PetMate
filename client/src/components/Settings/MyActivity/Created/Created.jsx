import React from "react";
import ActivityCard from "../ActivityCard";
import { useSelector } from "react-redux";
import PublishActivity from "../../../Pages/Activity/PublishActivity/PublishActivity";
import { useDispatch } from "react-redux";
import { getServicesByUser, updateService } from "../../../../actions/service";
import { getEventsByUser, updateEvent } from "../../../../actions/event";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";
import dayjs from 'dayjs';

const Created = ({ activityType }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [edit, setEdit] = React.useState(false);
    const [allInputs, setAllInputs] = React.useState([]);
    const [activity, setActivity] = React.useState('');
    const [activityId, setActivityId] = React.useState('');

    const [showFeedbackMsg, setShowFeedbackMsg] = React.useState(false);
    const [content, setContent] = React.useState('');

    const dispatch = useDispatch();
    React.useEffect(() => {
        if (activityType === 'services') {
            dispatch(getServicesByUser(user.result._id)); //get all services
        }

        if (activityType === 'events') {
            dispatch(getEventsByUser(user.result._id)); //get all services
        }
    }, [])

    const { createdServices } = useSelector((state) => state.createdService);
    const { createdEvents } = useSelector((state) => state.createdEvent);

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
        if (activityType === 'services') {
            setAllInputs([activityData.city, activityData.petSpecies, activityData.type, startDate, endDate, activityData.title, activityData.location, activityData.price]);
        }

        if (activityType === 'events') {
            setAllInputs([activityData.city, activityData.petSpecies, activityData.type, startDate, endDate, activityData.title, activityData.location, activityData.expectedParticipants]);
        }
        setEdit(true);
    }

    const publishAndGoBack = (value) => {
        //const newActivityAfterEdit;
        if (activity === 'service') {
            dispatch(updateService(activityId, value));
        }

        if (activity === 'event') {
            dispatch(updateEvent(activityId, value));
        }
        setShowFeedbackMsg(true)
        setEdit(false);
    };

    const handelfeebackMsgClose = () => {
        setShowFeedbackMsg(false)

        window.location.reload()
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        }}>
            {edit ? (<PublishActivity activity={activity} allInputs={allInputs} publishAndGoBack={publishAndGoBack} isEdit={true} content={content} />) : null}
            {activityType === 'services' && createdServices && !edit ?
                (<>
                    <div>
                        {createdServices.map((service) => (
                            <ActivityCard key={service._id} activityType={activityType} isCreate={true} activityData={service} onEdit={onEdit}/>
                        ))}
                    </div>
                </>) : null}

            {activityType === 'events' && createdEvents && !edit ?
                (<>
                    <div>
                        {createdEvents.map((event) => (
                            <ActivityCard key={event._id} activityType={activityType} isCreate={true} activityData={event} onEdit={onEdit} />
                        ))}
                    </div>
                </>) : null}
            <FeedbackMsg status={showFeedbackMsg} message='Sucessful published' severity='success' onClose={handelfeebackMsgClose} />
        </div>
    );
}

export default Created;