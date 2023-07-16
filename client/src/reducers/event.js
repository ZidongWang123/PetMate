import {
  FETCH_ALL_EVENT,
  FETCH_EVENT_SORTING,
  FETCH_BY_SEARCH_EVENT,
  FETCH_EVENT,
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_USER_EVENT,
} from "../constant/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = { isLoading: true, events: [], eventsCreator: null },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_EVENT:
      return {
        ...state,
        events: action.payload.data,
        currentPageEvent: action.payload.currentPageEvent,
        numberOfPagesEvent: action.payload.numberOfPagesEvent,
      };
    case FETCH_EVENT_SORTING:
      return {
        ...state,
        events: action.payload.data,
        currentPageEvent: action.payload.currentPageEvent,
        numberOfPagesEvent: action.payload.numberOfPagesEvent,
      };

    case FETCH_BY_SEARCH_EVENT:
      return { ...state, events: action.payload.data };
    case FETCH_EVENT:
      return { ...state, event: action.payload };
    case CREATE_EVENT:
      return { ...state, events: [...state.events, action.payload] };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(
          (event) => event._id !== action.payload
        ),
      };
    case FETCH_USER_EVENT:
      return { ...state, eventsCreator: action.payload };
    default:
      return state;
    //break;
  }
};
