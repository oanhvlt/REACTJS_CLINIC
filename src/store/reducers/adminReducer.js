import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
}

const adminReducer = (state = initialState, action) => {
    let copyState = {};
    switch (action.type) {
        //gender
        case actionTypes.FETCH_GENDER_START:   
            copyState = {...state};
            copyState.isLoadingGender = true;
            //console.log('fire FETCH_GENDER_START: ', action)
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:    
            copyState = {...state};
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            //console.log('fire FETCH_GENDER_SUCCESS: ', action)
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            copyState = {...state};
            copyState.genders = [];
            copyState.isLoadingGender = false;
            //console.log('fire FETCH_GENDER_FAILED: ', action)
            
            return {
                ...copyState,
            }
        
        //role
        case actionTypes.FETCH_ROLE_SUCCESS:    
            copyState = {...state};
            copyState.roles = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ROLE_FAILED: 
            copyState = {...state};
            copyState.roles = [];
            return {
                ...copyState,
            }
        //position
        case actionTypes.FETCH_POSITION_SUCCESS:    
            copyState = {...state};
            copyState.positions = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_POSITION_FAILED: 
            copyState = {...state};
            copyState.positions = [];
            return {
                ...copyState,
            }
       
         //manage user
        case actionTypes.FETCH_ALL_USERS_SUCCESS:    
            state.users = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED: 
            state.users = [];
            return {
                ...state,
            }
         //manage user
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:    
            state.topDoctors = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED: 
            state.topDoctors = [];
            return {
                ...state,
            }
    
        default:
            return state;
    }
}

export default adminReducer;