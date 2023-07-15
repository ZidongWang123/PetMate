import { FETCH_ALL_APPLICATIONS_EVENT } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {  applications: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL_APPLICATIONS_EVENT:
            return { ...state, createdEvents: action.payload.data, currentPageCreatedEvents: action.payload.currentPageCreatedEvents, numberOfPagesCreatedEvents: action.payload.numberOfPagesCreatedEvents };
        default:
            return state;
        //break;
    }
}