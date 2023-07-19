import {
  FETCH_ALLGROUPS,
  CREATE_GROUP,
  FETCH_GROUP,
  FETCH_MY_GROUPS,
  FETCH_GROUPS_BY_SEARCH,
  DELETE_GROUP,
  UPDATE_GROUP,
  START_LOADING,
  END_LOADING,
} from "../constant/actionTypes";

export default (state = { isLoading: true, groups: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALLGROUPS:
      return { ...state, groups: action.payload };
    case FETCH_GROUPS_BY_SEARCH:
      return { ...state, groups: action.payload };
    case FETCH_GROUP:
      return { ...state, groups: action.payload };
    case FETCH_MY_GROUPS:
      return { ...state, groups: action.payload };
    case CREATE_GROUP:
      return { ...state, groups: [...state.groups, action.payload] };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((w) => w._id !== action.payload),
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group) =>
          group._id === action.payload._id ? action.payload : group
        ),
      };

    default:
      return state;
  }
};
