import axios from "axios";
import baseUrl from "../utils/baseUrl";

const allSubject = async (userId, subjectId = "") => {
  const url = `${baseUrl}/api/subject/allaboutplan/${userId}?subjectId=${subjectId}`
  const { data } = await axios.get(url);
  return data
}

const getSubInfo = async (userId, subjectId) => {
  const url = `${baseUrl}/api/subject/${userId}?subjectId=${subjectId}`
  const { data } = await axios.get(url);
  return data
}

const subjectTitle = async (userId) => {
  const url = `${baseUrl}/api/subject/${userId}`
  const { data } = await axios.get(url);
  return data
}

const addSubject = async (info, userId) => {
  const url = `${baseUrl}/api/subject/${userId}`;
  const { data } = await axios.post(url, info);
  return data
}

const editSubject = async (info, userId, subjectId) => {
  const url = `${baseUrl}/api/subject/${userId}?subjectId=${subjectId}`
  const { data } = await axios.put(url, info)
  return data
}

const removeSubject = async (subjectId, userId) => {
  const url = `${baseUrl}/api/subject/${userId}?subjectId=${subjectId}`;
  const { data } = await axios.delete(url);
  return data
}

const subjectApi = {
  addSubject,
  editSubject,
  removeSubject,
  getSubInfo,
  allSubject,
  subjectTitle
};

export default subjectApi