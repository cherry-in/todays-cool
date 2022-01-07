import axios from "axios";
import baseUrl from "../../utils/baseUrl";

const getDetail = async (planId:string) => {
  const url = `${baseUrl}/api/plan/${planId}`
  const { data } = await axios.get(url)
  return data
}

const saveCheck = async (planId:string, planCk:boolean) => {
  const url = `${baseUrl}/api/plan/check/${planId}`
  const { data } = await axios.put(url, {planCk})
  return data
}

const submit = async (info) => {
  const url = `${baseUrl}/api/plan`
  const { data } = await axios.post(url, info)
  return data
}

const edit = async (info, planId) => {
  const url = `${baseUrl}/api/plan/${planId}`
  const { data } = await axios.put(url, info)
  return data
}

const remove = async (planId) => {
  const url = `${baseUrl}/api/plan/${planId}`
  const { data } = await axios.delete(url)
  return data
}

const planApi = {
  getDetail,
  saveCheck,
  submit,
  edit,
  remove
};

export default planApi