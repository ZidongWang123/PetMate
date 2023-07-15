import { FETCH_ALL_CREATED_SERVICE } from '../constant/actionTypes';


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {  createdServices: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL_CREATED_SERVICE:
            return { ...state, createdServices: action.payload.data };
        default:
            return state;
        //break;
    }
}