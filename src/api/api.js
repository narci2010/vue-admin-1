import axios from 'axios';

const base = '';

export const fetchList = params => axios.get(`${base}/user/list`, params);

export const addUser = params => axios.post(`${base}/user/add`, params);

export const editUser = params => axios.post(`${base}/user/edit`, params);

export const removeUser = params => axios.post(`${base}/user/remove`, params);

export const postError = params => axios.get(`${base}/error`, { params });

export const requestLogin = params => axios.post(`${base}/login`, params).then(res => res.data);

export const fetchSchoolList = () => axios.get(`${base}/schools`).then(res => res.data);

export const fetchWorkDurationOptions = () => axios.get(`${base}/work_durations`).then(res => res.data);

export const fetchAcademicOptions = () => axios.get(`${base}/academics`).then(res => res.data);

export const postResume = params => axios.post(`${base}/resume`, params).then(res => res.data);

export const createResume = () => axios.post(`${base}/resume/add`).then(res => res.data);
