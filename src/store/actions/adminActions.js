import actionTypes from './actionTypes';
import {getAllCodeService, 
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorsHomeService} from '../../services/userService';
import { toast } from "react-toastify";

//gender
export const fetchGenderStart = () => {
    return async(dispatch, getState) => {
        try {
            //start fetch data
            dispatch({type: actionTypes.FETCH_GENDER_START});

            let res = await getAllCodeService('GENDER');
            if(res && res.errCode === 0){
                //doing fetch data
                dispatch(fetchGenderSuccess(res.data));
            }else{
                //end fetch data
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error: ', e)
        }
       
    }
  
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//role
export const fetchRoleStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error: ', e)
        }
       
    }
  
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

//position
export const fetchPostionStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPostionStart error: ', e)
        }
       
    }
  
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//createNewUser

export const createNewUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            //console.log('check create user redux: ', res);
            if(res && res.errCode === 0){
                //dispatch(createUserSuccess());
                toast.success("Create a new user succeed!");
                //dispatch fetchAllUsersStart to get all user show on table after create
                //dispatch(fetchAllUsersStart());
            }else{
                //dispatch(createUserFailed());
                toast.error("Create a new user failed!");
            }
        } catch (e) {
            //dispatch(createUserFailed());
            toast.error("Create a new user failed!");
            console.log('createUserFailed error: ', e)
        }
       
    }
  
}

// export const createUserSuccess = () => ({
//     type: actionTypes.CREATE_USER_SUCCESS,
// })

// export const createUserFailed = () => ({
//     type: actionTypes.CREATE_USER_FAILED
// })

//admin > manage users
export const fetchAllUsersStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllUsers();
           
            if(res && res.errCode === 0){
                let users = res.users.reverse();//users: res of api getAllUsers from server
                dispatch(fetchAllUsersSuccess(users)); 
            }else{
                dispatch(fetchAllUsersFailed());
                toast.error("Fecth all users failed!");
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            toast.error("Fecth all users failed!");
            console.log('fetchAllUsersFailed error: ', e)
        }
       
    }
  
}

export const fetchAllUsersSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: users
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

//delete User

export const deleteUser = (userId) => {
    return async() => {
        try {
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success("Delete a user succeed!");
            }else{
                toast.error("Delete a user failed!");
            }
        } catch (e) {
            toast.error("Delete a user failed!");
            console.log('deleteUserFailed error: ', e)
        }
       
    }
  
}

//edit User

export const editUser = (data) => {
    return async() => {
        try {
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                toast.success("Update a user succeed!");
            }else{
                toast.error("Update a user failed!");
            }
        } catch (e) {
            toast.error("Update a user failed!");
            console.log('updateUserFailed error: ', e)
        }
       
    }
  
}

// let res1 = await getTopDoctorsHomeService(4);
export const fetchTopDoctors = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getTopDoctorsHomeService('');
            if(res && res.errCode === 0){
                let doctors = res.data;
                dispatch(fetchTopDoctorsSuccess(doctors)); 
            }else{
                dispatch(fetchTopDoctorsFailed());
            }
        } catch (e) {
            dispatch(fetchTopDoctorsFailed());
            console.log('fetchTopDoctorsFailed error: ', e)
        }
       
    }
}

export const fetchTopDoctorsSuccess = (doctors) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: doctors
})

export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})