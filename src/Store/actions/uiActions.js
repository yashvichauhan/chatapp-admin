import * as reducerTypes from '../reducerTypes';

export const setSelected=(value)=>{
    return {
        type:reducerTypes.SET_SELECTED,
        selection:value
    }
}