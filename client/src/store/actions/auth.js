import * as action from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: action.AUTH_START
    }
};

export const authSuccess = (userId,token) => {

    return {
        type:action.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
};

export const authFailed = (error) => {
    return {
        type: action.AUTH_FAILED,
        errorM: error
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: action.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}
export const auth = (email,password,isSignUp) => {
return dispatch => {
    dispatch(authStart());

    const payLoad = {
        email:email,
        password: password,
        returnSecureToken:true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBLs30fuFZn7hzP5Yj1oOsyFrnKs8YOx_0';

    if(!isSignUp){
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBLs30fuFZn7hzP5Yj1oOsyFrnKs8YOx_0';
    }

    axios.post(url,payLoad)
    .then(res => {
        let expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        // console.log(' localId '+res.data.localId , ' tokenId '+res.data.idToken);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId',res.data.localId);
        dispatch(authSuccess(res.data.localId,res.data.idToken));
        dispatch(checkAuthTimeout(res.data.expiresIn));
    })
    .catch(err => {
        // console.log(err.response.data.error.message);
        dispatch(authFailed(err.response.data.error.message))
        });
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: action.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // console.log('ExpDte '+ expirationDate.getTime());
            // console.log('Date Nw ' + new Date().getTime());
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(userId,token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
            }else{
            dispatch(logout());
            }
        } else {
            dispatch(logout());

        }
    }
}