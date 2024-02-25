import axios from "../axios";
let handleLoginApi = (userEmail, userPassword)=>{
    return axios.post('/api/login', {
        email: userEmail, 
        password: userPassword
    });
}

// const getUsers = (inputId) => {
//     return axios.get(`/api/get-users?id=${inputId}`);
// }

const getAllUsers = () => {
    return axios.get(`/api/get-all-users`);
}

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data);
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    });
}

const editSummaryUserService = (inputData) => {
    return axios.put(`/api/edit-summary-user`, inputData);
}


const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData);
}


// const deleteUserService = (userId) => {
//     return axios.delete(`/api/delete-user?id=${userId}`);
// }

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorsHomeService = (limit) =>{
    return axios.get(`/api/top-doctors-home?limit=${limit}`);
}

const getAllDoctorsService = () =>{
    return axios.get(`/api/get-all-doctors`);
}

const createInfoDoctorService = (data) =>{
    return axios.post(`/api/create-doctor-details`, data);
}

const getDoctorDetailsService = (id) =>{
    return axios.get(`/api/get-doctor-details-by-id?id=${id}`);
}

const saveBulkScheduleService = (data) =>{
    return axios.post(`/api/bulk-create-schedule`, data);
}

const getScheduleByDateService = (doctorId, date) =>{
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}
//get-schedule-by-date
export {
    handleLoginApi,
    getAllUsers,
    //getUsers,
    createNewUserService,
    deleteUserService,
    editSummaryUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorsHomeService,
    getAllDoctorsService,
    createInfoDoctorService,
    getDoctorDetailsService,
    saveBulkScheduleService,
    getScheduleByDateService
}

