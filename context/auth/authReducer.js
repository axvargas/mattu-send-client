import {
    AUTH_SUCCESS,
    AUTH_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    SIGNOUT
} from '../../types'

const AuthReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                user: payload,
                authenticated: true,
                error: null
            }
        case AUTH_ERROR: {
            return {
                ...state,
                user: null,
                authenticated: null,
                msg: payload,
                error: true
            }
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                msg: payload,
                error: null
            }
        }
        case SIGNUP_ERROR: {
            return {
                ...state,
                msg: payload,
                error: true
            }
        }
        case SIGNIN_SUCCESS:
            localStorage.setItem('rms-token', payload.token)
            return {
                ...state,
                msg: payload.msg,
                error: null,
                token: payload.token,
                authenticated: true
            }
        case SIGNIN_ERROR:
            return {
                ...state,
                msg: payload,
                error: true,
                token: null,
                authenticated: null
            }
        case SIGNOUT:
            localStorage.removeItem('rms-token')
            return {
                ...state,
                user: null,
                msg: null,
                error: null,
                token: null,
                authenticated: null
            }

        default:
            return {
                ...state
            }
    }
}
export default AuthReducer