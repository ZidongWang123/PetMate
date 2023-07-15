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
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getApplicationsByApplicantId = async (applicantId) => {
    try {
        const { data } = await api.fetchApplicationsByApplicantId(applicantId);
        return { data }
    } catch (error) {
        console.log(error);
    }
}


export const fetchPersonalInfo = async (userId) => {
    try {
        const { data } = await api.getPersonalInfo(userId);
        return { data }
    } catch (error) {
        console.log(error)
    }
}

export const deleteApplication = async (id) => {
    try {
        await api.deleteApplication(id);
      } catch (error) {
        console.log(error);
      }
}
