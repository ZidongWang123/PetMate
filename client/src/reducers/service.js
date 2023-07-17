import {
  FETCH_ALL_SERVICE,
  FETCH_SERVICE_SORTING,
  FETCH_BY_SEARCH_SERVICE,
  FETCH_SERVICE,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  START_LOADING,
  END_LOADING,
  FETCH_USER_SERVICE,
} from "../constant/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = { isLoading: true, services: [], servicesCreator: null },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_SERVICE:
      return {
        ...state,
        services: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_SERVICE_SORTING:
      return {
        ...state,
        services: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH_SERVICE:
      return { ...state, services: action.payload.data };
    case FETCH_SERVICE:
      return { ...state, service: action.payload };
    case CREATE_SERVICE:
      return { ...state, services: [...state.services, action.payload] };
    case UPDATE_SERVICE:
      return {
        ...state,
        services: state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        ),
      };
    case DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(
          (service) => service._id !== action.payload
        ),
      };
    case FETCH_USER_SERVICE:
      return { ...state, servicesCreator: action.payload };
    default:
      return state;
    //break;
  }
};
