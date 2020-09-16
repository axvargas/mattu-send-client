import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axiosClient from '../../config/axios'
import authToken from '../../config/authToken'
import { useToasts } from 'react-toast-notifications'

import {
    AUTH_SUCCESS,
    AUTH_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    SIGNOUT
} from '../../types'
const AuthState = ({ children }) => {

    // * Toast hook
    const { addToast } = useToasts()

    // * Inicial state
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('rms-token') : '',
        authenticated: null,
        user: null,
        msg: null,
        error: null
    }

    // * Define Reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // ? Functions

    // * Sign up a user
    const signUpFn = async (data) => {
        console.log("SIGNUP");

        try {
            const response = await axiosClient.post('/users', data)
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: response.data.msg
            })
            addToast(response.data.msg, { appearance: 'succes' })
        } catch (error) {
            if (error.response.data.errors) {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: error.response.data.errors[0].msg
                })
                addToast(error.response.data.errors[0].msg, { appearance: 'error' })
            } else {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: error.response.data.msg
                })
                addToast(error.response.data.msg, { appearance: 'error' })
            }
        }
    }
    // * Athenticate user
    const signInFn = async (data) => {
        console.log("SIGNIN");
        try {
            const response = await axiosClient.post('/auth', data)
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: {
                    msg: response.data.msg,
                    token: response.data.token
                }
            })
            addToast(response.data.msg, { appearance: 'succes' })
        } catch (error) {
            if (error.response.data.errors) {
                dispatch({
                    type: SIGNIN_ERROR,
                    payload: error.response.data.errors[0].msg
                })
                addToast(error.response.data.errors[0].msg, { appearance: 'error' })
            } else {
                dispatch({
                    type: SIGNIN_ERROR,
                    payload: error.response.data.msg
                })
                addToast(error.response.data.msg, { appearance: 'error' })
            }
        }
    }

    // * Authenticated user based on the JWT
    const authUserFn = async () => {
        const token = localStorage.getItem('rms-token')
        if (token) {
            authToken(token)
        }
        try {
            const response = await axiosClient.get('/auth')
            dispatch({
                type: AUTH_SUCCESS,
                payload: response.data.user
            })
            // addToast('Authenticated', { appearance: 'succes' })
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data.msg
            })
            // addToast(error.response.data.msg, { appearance: 'error' })
        }
    }

    const signOutFn = async () => {
        console.log("SIGNOUT");

        dispatch({
            type: SIGNOUT
        })
        addToast("Signed out", { appearance: 'succes' })

    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                msg: state.msg,
                error: state.error,
                authUserFn,
                signUpFn,
                signInFn,
                signOutFn
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState
