import * as reducerTypes from '../reducerTypes';
import fire from '../../services/firebase';
import axios from '../../axiosInstance/axiosInstance';

//const storage=fire.storage();
const isoConvert={
    "US":"United States",
    "IN":"India",
    "CA":"Canada",
    "CN":"China",
    "GB":"United Kingdom",
    "Other":"Other"
}
export const totalUserCount=(value)=>{
    return{
        type:reducerTypes.TOT_USER_COUNT,
        value
    }
}
export const fetchUserData=(userData)=>{
    return{
        type:reducerTypes.FETCH_USER_DATA,
        userData
    }
}
export const FindTotalUsers=()=>{
    return async dispatch=>{
        fire.firestore().collection('users')
        .orderBy('name')
        .limit(20)
        .get()
        .then((doc)=>{
            let users=[];
            doc.forEach(snap => {
                users.push({...snap.data(),userID:snap.id});
            }); 
            dispatch(totalUserCount(doc.size));
            dispatch(fetchUserData(users))
        })
        .catch((err)=>{
            throw new Error(err);
        })
    }
}
//SELECT A USER
export const setSelectedUserMetadata=(value,metadata)=>{
    return{
        type:reducerTypes.SET_SELECTED_USERID,
        value,
        metadata
    }
}
export const setSelectedUser=(userdata,uid)=>
    dispatch=>new Promise(function(resolve,reject){
        const sendData={
            uid:uid
        }
        const token=localStorage.getItem('token');
        axios.post('/user/fetch',JSON.stringify(sendData), {headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then((user)=>{
            dispatch(setSelectedUserMetadata(userdata,user.data.user));
            console.log(user);
            resolve(user);
        })
        .catch((err)=>{
            reject(err);
        })
    })

//EDIT USER PERSONAL INFORMATION
export const onEditUserProfile=()=>{
    return{
        type:reducerTypes.ON_EDIT_USERDATA,
    }
}

export const editUserPersonalInfo=(values,file)=>dispatch=>new Promise(async(resolve,reject)=>{
        // if(file){
        //     const storageRef = storage.ref(`chatavatar/${Date.now()}`)
        //     const uploaded= await storageRef.put(file)
        //     await storageRef.getDownloadURL()
        //     .then((downloadURL)=>{
        //         values['avatarURL']=downloadURL;
        //     })
        //     .catch((err)=>{
        //         reject(err);
        //     })
        // }
        if(values.emailFlag){
            fire.firestore().collection('users').doc(values.userID)
            .update({
                name:values.name,
                aboutme:values.aboutme,
                email:values.email,
                country:values.country,
                avatar:values.avatarURL
            })
            .then(()=>{
                resolve(values);
                dispatch(onEditUserProfile());
                dispatch(changeRefreshStatus());
            }) 
        }else{
            fire.firestore().collection('users')
            .where('email','==',values.email)
            .get()
            .then((snapShot)=>{
                if(snapShot.empty){
                    console.log(values);
                    fire.firestore().collection('users').doc(values.userID)
                    .update({
                        name:values.name,
                        aboutme:values.aboutme,
                        email:values.email,
                        country:values.country,
                        avatar:values.avatarURL
                    })
                    .then(()=>{
                        resolve(values);
                        dispatch(onEditUserProfile());
                        dispatch(changeRefreshStatus());
                    })
                }else{
                    reject("Email already exists");
                }
            })
        }
})
//CHANGE REFRESH STATUS
export const changeRefreshStatus=()=>{
    return{
        type:reducerTypes.ON_REFRESH,
    }
}
//ON suspend user
export const onSuspendUser=()=>{
    return{
        type:reducerTypes.ON_SUSPEND_USER,
    }
}

export const suspendUser=(uid)=>
    dispatch=>new Promise(function(resolve,reject){
        const sendData={
            uid:uid
        }
        const token=localStorage.getItem('token');
        axios.post('/user/suspend',JSON.stringify(sendData), {headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then((res)=>{
            dispatch(onSuspendUser());
            dispatch(changeRefreshStatus());
            resolve(res);
        })
        .catch((err)=>{
            reject(err);
        })
    })

//ACTIVATE USER
export const onActivateUser=()=>{
    return{
        type:reducerTypes.ON_ACTIVATE_USER,
    }
}

export const activateUser=(uid)=>
    dispatch=>new Promise(function(resolve,reject){
        const sendData={
            uid:uid
        }
        const token=localStorage.getItem('token');
        axios.post('/user/activate',JSON.stringify(sendData), {headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then((res)=>{
            dispatch(onActivateUser());
            dispatch(changeRefreshStatus());
            resolve(res);
        })
        .catch((err)=>{
            reject(err);
        })
    })

//DELETE USER DATA
export const ondeleteUser=()=>{
    return{
        type:reducerTypes.ON_DELETE_USER,
    }
}

export const deleteUser=(uid,id)=>{
    return async dispatch=>{
        fire.firestore().collection('users')
        .doc(uid)
        .delete()
        .then((res)=>{
            const sendData={
                uid:id
            }
            const token=localStorage.getItem('token');
            axios.post('/user/delete',JSON.stringify(sendData), {headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then((res)=>{
                fire.firestore().collection('groups')
                .where('gtype','==','personal')
                .where('participants','array-contains',uid)
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        doc.ref.delete();
                    })
                    dispatch(ondeleteUser());
                    dispatch(changeRefreshStatus());
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        })
    }
}
//FIND COUNTRY DATA POINTS
export const onfindCountryDataPonts=(datapoints)=>{
    return{
        type:reducerTypes.ON_COUNTRYDATA_POINTS,
        datapoints
    }
}
export const findCountryDataPonts=(userData)=>dispatch=>{
    let pArray={
        "US":0,
        "IN":0,
        "CA":0,
        "CN":0,
        "GB":0,
        "Other":0
    };
    let toRet=[];
    if(userData){
        userData.forEach((user)=>{
            if(pArray[user.country]!==undefined){
                pArray[user.country]+=1;
            }
            else{
                pArray["Other"]+=1;
            }
        })
        for(const country in pArray){
            toRet.push({y:pArray[country],label:isoConvert[country]})
        }
        dispatch(onfindCountryDataPonts(toRet));
    }
}