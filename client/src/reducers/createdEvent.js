import { FETCH_ALL_CREATED_EVENT } from '../constant/actionTypes';


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {  createdEvents: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL_CREATED_EVENT:
            return { ...state, createdEvents: action.payload.data };
        default:
            return state;
        //break;
    }
}