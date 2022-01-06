import axios from "axios";
import baseUrl from "../utils/baseUrl";

const getTodo = async (userId, date = "", todoId = "") => {
    const { data } = await axios.get(`${baseUrl}/api/todo/${userId}?todoId=${todoId}&date=${date}`)
    return data
}

const getTodopercent = async (userId, start, end = "") => {
    const { data } = await axios.get(`${baseUrl}/api/todo/percent/${userId}?start=${start}&end=${end}`)
    return data
}

const submit = async (todo, userId) => {
    const { data } = await axios.post(`${baseUrl}/api/todo/${userId}`, todo)
    return data
}

const edit = async (todo, userId) => {
    const { data } = await axios.put(`${baseUrl}/api/todo/${userId}?todoId=${todo.id}`, todo)
    return data
}

const remove = async (todoId, userId) => {
    const { data } = await axios.delete(`${baseUrl}/api/todo/${userId}?todoId=${todoId}`)
    return data
}

const todoApi = {
    getTodo,
    getTodopercent,
    submit,
    edit,
    remove
}

export default todoApi