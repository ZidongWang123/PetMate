import {
    FETCH_ALL_EVENT,
    FETCH_ALL_CREATED_EVENT,
    FETCH_EVENT_SORTING,
    FETCH_EVENT,
    FETCH_BY_SEARCH_EVENT,
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    FETCH_USER_EVENT,
} from "../constant/actionTypes";
import * as api from "../api";

export const getEventByApplication = async (id) => {
    try {
        const { data } = await api.fetchEvent(id);
        return { data }
    } catch (error) {
        console.log(error);
    }
}

export const getEvent = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchEvent(id);
        dispatch({ type: FETCH_EVENT, payload: { event: data } });
    } catch (error) {
        console.log(error);
    }
};

export const getEvents = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchEvents(page);

        dispatch({ type: FETCH_ALL_EVENT, payload: data });

    } catch (error) {
        console.log(error);
    }
};

export const getEventsByUser = (userId) => async (dispatch) => {
    try {
        const { data } = await api.fetchEventsByUser(userId);
        dispatch({ type: FETCH_ALL_CREATED_EVENT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getEventsBySorting = (page, sorting) => async (dispatch) => {
    try {
        const { data } = await api.fetchEventsBySorting(page, sorting);

        dispatch({ type: FETCH_EVENT_SORTING, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getEventsBySearch = (input) => async (dispatch) => {
    try {
        const { data } = await api.fetchEventsBySearch(input);
        dispatch({ type: FETCH_BY_SEARCH_EVENT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createEvent = (event) => async (dispatch) => {
    try {
        const { data } = await api.createEvent(event);
        dispatch({ type: CREATE_EVENT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateEvent = (id, event) => async (dispatch) => {
    try {
        const { data } = await api.updateEvent(id, event);
        dispatch({ type: UPDATE_EVENT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteEvent = (id) => async (dispatch) => {
    try {
        await api.deleteEvent(id);
        dispatch({ type: DELETE_EVENT, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const fetchPersonalInfoEvent = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getPersonalInfo(userId);
        dispatch({ type: FETCH_USER_EVENT, payload: data });
        return { data };
    } catch (error) {
        console.log(error);
    }
};

export const incrementParticipants = async (id) => {
    try {
        const { data } = await api.incrementParticipants(id);
        return { data };
    } catch (error) {
        console.error(error);
    }
};

export const decrementParticipants = async (id) => {
    try {
        const { data } = await api.decrementParticipants(id);
        return { data };
    } catch (error) {
        console.error(error);
    }
};