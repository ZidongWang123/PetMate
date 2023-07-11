import * as api from '../api';

export const createApplication = async (application) => {
    try {
        const { data } = await api.createApplication(application);
        return { data }
    } catch (error) {
        console.log(error);
    }
}

export const updateApplication = async (activityId, application) => {
    try {
        const { data } = await api.updateApplication(activityId, application);
        return { data }
    } catch (error) {
        console.log(error);
    }
}

export const getApplicationsByActivityId = async (activityId) => {
    try {
        const {data} = await api.fetchApplicationsByActivityId(activityId);
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getApplicationsByApplicantId = async (activityId) => {
    try {
        const { data } = await api.fetchApplicationsByApplicantId(activityId);
        return { data }
    } catch (error) {
        console.log(error);
    }
}