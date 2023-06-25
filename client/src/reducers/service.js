import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_SERVICE, CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE, START_LOADING, END_LOADING } from '../constant/actionTypes';


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, services: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        /* case FETCH_ALL:
            return { ...state, services: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages }; */
        case FETCH_ALL:
            return { ...state, services: action.payload.data};
        case FETCH_BY_SEARCH:
            return { ...state, services: action.payload };
        case FETCH_SERVICE:
            return { ...state, service: action.payload };
        case CREATE_SERVICE:
            console.log(state, action);
            return { ...state, services: [...state.services, action.payload] };
        case UPDATE_SERVICE:
            return { ...state, services: state.services.map((service) => service._id === action.payload._id ? action.payload : service) };
        case DELETE_SERVICE:
            return { ...state, services: state.services.filter((service) => service._id !== action.payload) };
        default:
            return state;
        //break;
    }
}