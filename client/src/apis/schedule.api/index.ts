import axios from "axios";
import baseUrl from "../utils/baseUrl";

const getOne = async (id, userId = "ku") => {
    const { data } = await axios.get(`${baseUrl}/api/schedule/${userId}?scheduleId=${id}`);
    return data
}

const getbyMonth = async (date, userId = "ku") => {
    const { data } = await axios.get(`${baseUrl}/api/schedule/${userId}?dateMonth=${date}`);
    return data
}

const getbyDate = async (date, userId = "ku") => {
    const { data } = await axios.get(`${baseUrl}/api/schedule/${userId}?date=${date}`);
    return data
}

const submit = async (schedule, userId = "ku") => {
    const { data } = await axios.post(`${baseUrl}/api/schedule/${userId}`, schedule);
    return data
}

const edit = async (id, schedule, userId = "ku") => {
    const { data } = await axios.put(`${baseUrl}/api/schedule/${userId}?scheduleId=${id}`, schedule);
    return data
}

const remove = async (id, userId = "ku") => {
    const { data } = await axios.delete(`${baseUrl}/api/schedule/${userId}?scheduleId=${id}`);
    return data
}

const scheduleApi = {
    getOne,
    getbyMonth,
    getbyDate,
    submit,
    edit,
    remove
}

export default scheduleApi