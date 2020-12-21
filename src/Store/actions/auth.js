import * as reducerTypes from '../reducerTypes';

import fire from '../../services/firebase';

export const authStart=()=>{
    return{
        type:reducerTypes.AUTH_START
    }
}
export const authSuccess=(userData,token)=>{
    return{
        type:reducerTypes.AUTH_SUCCESS,
        userData:userData,
        token:token
    }
}
export const authFail=(error)=>{
    return{
        type:reducerTypes.AUTH_FAIL,
        errorMsg:error
    }
}
export const auth = (InputObj)=>
    (dispatch)=>new Promise(function(resolve,reject){
        dispatch(authStart());
        fire.auth().signInWithEmailAndPassword(InputObj.email,InputObj.password)        
        .then(async (res)=>{
            if(res){
                let currentUser=null;
                await fire.firestore().collection('admin')
                .where('id',"==",res.user.uid)
                .get()
                .then(async function(querySnapShot){
                    querySnapShot.forEach(doc => {
                        currentUser={...doc.data(), userID:doc.id};
                    });
                    const token = await fire.auth().currentUser.getIdToken();
                    localStorage.setItem('token',token);
                    dispatch(authSuccess(currentUser,token));
                    resolve(currentUser);
                })
                .catch((err)=>{
                    dispatch(authFail(err));
                    reject(err);
                })
            }
        })
        .catch((err)=>{
            dispatch(authFail(err));
            reject(err);
        })
    })

export const logoutSuccess=()=>{
    return{
        type:reducerTypes.AUTH_LOGOUT,
    }
}
export const logoutFail=(err)=>{
    return{
        type:reducerTypes.LOGOUT_FAIL,
        error:err
    }
}
export const authLogout=()=>{
    return async dispatch=>{
        fire.auth().signOut()
        .then(()=>{
            localStorage.clear();
            console.log("Signout working");
            dispatch(logoutSuccess());
        })
        .catch((err)=>{
            console.log("Logout error: "+err);
            dispatch(logoutFail(err));
        })
    }
}
    