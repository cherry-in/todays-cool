import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { LoginFormInterface, SignupFormInterface } from "./types";

const getUser = async () => {
    const url = `${baseUrl}/api/auth`
    const { data } = await axios.get(url)
    return data
}

const signup = async (payload: SignupFormInterface) => {
    const url = `${baseUrl}/api/auth/signup`;
    const { data, status } = await axios.post(url, payload);
    return { data, status }
}

const login = async (payload: LoginFormInterface) => {
    const url = `${baseUrl}/api/auth/login`;
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