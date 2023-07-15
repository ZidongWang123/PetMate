import { FETCH_ALL_APPLICATIONS_SERVICE } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {  applications: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL_APPLICATIONS_SERVICE:
            return { ...state, createdServices: action.payload.data, currentPageCreatedServices: action.payload.currentPageCreatedServices, numberOfPagesCreatedServices: action.payload.numberOfPagesCreatedServices };
        default:
            return state;
        //break;
    }
}