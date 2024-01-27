import axios from "../axios";
let handleLoginApi = (userEmail, userPassword)=>{
    return axios.post('/api/login', {
        email: userEmail, 
        password: userPassword
    });
}

const getUsers = (inputId) => {
    return axios.get(`/api/get-users?id=${inputId}`);
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

const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData);
}


// const deleteUserService = (userId) => {
//     return axios.delete(`/api/delete-user?id=${userId}`);
// }


export {
    handleLoginApi,
    getUsers,
    createNewUserService,
    deleteUserService,
    editUserService
}

