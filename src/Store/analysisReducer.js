import * as reducerTypes from './reducerTypes';

const initialState={
    totalUserCount:null,
    userData:null,
    selectedUser:null,
    selectedUserMetadata:null,
    countryDataPoints:[]
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case reducerTypes.TOT_USER_COUNT:
            return{
                ...state,
                totalUserCount:action.value
            }
        case reducerTypes.AUTH_LOGOUT:
            return {
                ...initialState
            }
        case reducerTypes.FETCH_USER_DATA:
            return{
                ...state,
                userData:action.userData
            }
        case reducerTypes.SET_SELECTED_USERID:
            return{
                ...state,
                selectedUser:action.value,
                selectedUserMetadata:action.metadata
            }
        case reducerTypes.ON_EDIT_USERDATA:
            return{
                ...state,
            }
        case reducerTypes.ON_COUNTRYDATA_POINTS:
            return{
                ...state,
                countryDataPoints:action.datapoints
            }
        default:
            return state
    }
}

export default reducer;