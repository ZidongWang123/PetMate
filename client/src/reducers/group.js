import {
  FETCH_ALLGROUPS,
  CREATE_GROUP,
  FETCH_GROUP,
  FETCH_MY_GROUPS,
  JOIN_GROUP,
} from "../constant/actionTypes";
export default (state = { joined: false, groups: [] }, action) => {
  switch (action.type) {
    case FETCH_ALLGROUPS:
      return { ...state, groups: action.payload };
    case FETCH_GROUP:
      return { ...state, groups: action.payload };
    case FETCH_MY_GROUPS:
      return { ...state, groups: action.payload };
    case CREATE_GROUP:
      return { ...state, groups: [...state.groups, action.payload] };
    case JOIN_GROUP:
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group._id === action.payload._id) {
            return {
              ...group,
              joined: true,
            };
          }
          return group;
        }),
      };
    default:
      return state;
  }
};
