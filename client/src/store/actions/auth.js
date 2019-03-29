import * as action from './actionTypes';
// import axios from 'axios';

export const authStart = () => {
    return {
        type: action.AUTH_START
    }
};

export const authSuccess = (token,user) => {

    return {
        type:action.AUTH_SUCCESS,
        idToken:token,
        user
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
        password: password
    }
    let url = 'http://localhost:3001/user/login';

    if(isSignUp){
        url = 'http://localhost:3001/user/signup';
    }

    fetch(url,{
        body:JSON.stringify(payLoad),
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
    })
    .then(res => res.json())
    .then(data => {
        if(data.message === 'Failed'){
     dispatch(authFailed('Invalid credentials'))
        }else{
    let expirationDate = new Date(new Date().getTime() + data.meta.expiry * 1000);
            localStorage.setItem('token', data.meta.token);
            localStorage.setItem('userId', data.meta.userId);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(data.meta.token,data.meta.userId));
        }
        console.log(data)
    }).catch(err => {
    console.log(err);
    dispatch(authFailed('Something went wrong'))
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