import axios from "axios";
import baseUrl from "../utils/baseUrl";

const getUser = async () => {
    const url = `${baseUrl}/api/auth`
    const { data } = await axios.get(url)
    return data
}

const signup = async (userId: string, password: string, repassword: string, userName: string, userStudNum: string) => {
    const url = `${baseUrl}/api/auth/signup`;
    const payload = { userId, password, repassword, userName, userStudNum }
    const { data, status } = await axios.post(url, payload);
    return { data, status }
}

const login = async (userId: string, password: string) => {
    const url = `${baseUrl}/api/auth/login`;
    const payload = { userId, password }
    const { data } = await axios.post(url, payload)
    return data
}

const logout = async () => {
    const url = `${baseUrl}/api/auth/logout`;
    const { data } = await axios.get(url);
    return data
}

const authApi = {
    getUser,
    signup,
    login,
    logout
};

export default authApi