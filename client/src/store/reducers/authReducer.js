import * as actionType from '../actions/actionTypes';
import {
    updateObject
} from '../../shared/utility';

let AuthState = {
    errorMessage: null,
    token: null,
    userId: null,
    loading: false,
    authRedirectPath: '/',
    auth:false
}

const authStart = (state, action) => {
    return updateObject(state, {
        errorMessage: null,
        loading: true,
        token: null,
        userId: null
    });
}

const authFailed = (state, action) => {
    return updateObject(state, {
        errorMessage: action.errorM,
        loading: false
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        errorMessage: null,
        token: action.idToken,
        userId:action.user,
        auth:true
    })
}

const authLogout = (state, action) => {

    return updateObject(state, {
        token: null,
        userId: null
    });
}

const setAuthRedirectPat = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const Authreducer = (state = AuthState, action) => {
    switch (action.type) {

        case (actionType.AUTH_START):
            return authStart(state, action)
        case (actionType.AUTH_SUCCESS):
            return authSuccess(state, action);
        case (actionType.AUTH_FAILED):
            return authFailed(state, action);
        case (actionType.AUTH_LOGOUT):
            return authLogout(state, action);
        case (actionType.SET_AUTH_REDIRECT_PATH):
            return setAuthRedirectPat(state, action);

        default:
            return state;
    }
};

export default Authreducer;
