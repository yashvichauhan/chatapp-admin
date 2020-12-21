import * as reducerTypes from './reducerTypes';

const initialState={
    currentAdmin:null,
    selected:"db",
    refresh:false,
    token:null,
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case reducerTypes.AUTH_SUCCESS:
            return{
                ...state,
                currentAdmin:action.userData,
                token:action.token
            }
        case reducerTypes.AUTH_FAIL:
            return{
                ...state
            }
        case reducerTypes.AUTH_LOGOUT:
            return {
                ...initialState,
            }
        case reducerTypes.LOGOUT_FAIL:
            return{
                ...state
            }
        case reducerTypes.SET_SELECTED:
            return{
                ...state,
                selected:action.selection
            }
        case reducerTypes.ON_REFRESH:
            return{
                ...state,
                refresh:!state.refresh
            }
        default:
            return state
    }
}

export default reducer;