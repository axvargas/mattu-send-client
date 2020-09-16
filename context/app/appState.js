import React, { useReducer } from 'react'
import axiosClient from '../../config/axios'
import AppContext from './appContext'
import AppReducer from './appReducer'
import { useToasts } from 'react-toast-notifications'
import {
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR,
    LOADING,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS
} from '../../types'
const AppState = ({ children }) => {
    // * Toast hook
    const { addToast } = useToasts()

    const initialState = {
        loading: null,
        msgFile: null,
        hashedName: null,
        originalName: null,
        downloads: 1,
        password: null,
        author: null,
        url: null
    }

    const [state, dispatch] = useReducer(AppReducer, initialState)

    const uploadFileFn = async (formData, fileName) => {
        dispatch({
            type: LOADING
        })
        try {
            const response = await axiosClient.post('/files', formData)
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    hashedName: response.data.file,
                    originalName: fileName
                }
            })
            addToast('File succesfully uploaded', { appearance: 'success' })
        } catch (error) {
            if (error.response.data.errors) {
                dispatch({
                    type: UPLOAD_FILE_ERROR,
                    payload: error.response.data.errors[0].msg
                })
                addToast(error.response.data.errors[0].msg, { appearance: 'error' })
            } else {
                dispatch({
                    type: UPLOAD_FILE_ERROR,
                    payload: error.response.data.msg
                })
                addToast(error.response.data.msg, { appearance: 'error' })
            }
        }
    }

    const createLinkFn = async () => {
        const data = {
            hashedName: state.hashedName,
            originalName: state.originalName,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }
        try {
            const response = await axiosClient.post('/links', data)
            console.log(response.data.url)
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: response.data.url
            })
            addToast('Link successfully created', { appearance: 'success' })
        } catch (error) {
            if (error.response.data.errors) {
                dispatch({
                    type: CREATE_LINK_ERROR,
                    payload: error.response.data.errors[0].msg
                })
                addToast(error.response.data.errors[0].msg, { appearance: 'error' })
            } else {
                dispatch({
                    type: CREATE_LINK_ERROR,
                    payload: error.response.data.msg
                })
                addToast(error.response.data.msg, { appearance: 'error' })
            }
        }
    }

    const cleanStateFn = () => {
        dispatch({
            type: CLEAN_STATE
        })
    }

    // * Add the password from the form in frontend
    const addPasswordFn = (password) => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        })
    }
    // * Add the downloads selected from the form in frontend
    const addDownloadsFn = (downloads) => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: downloads
        })
    }

    return (
        <AppContext.Provider
            value={{
                msgFile: state.msgFile,
                hashedName: state.hashedName,
                originalName: state.originalName,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                uploadFileFn,
                createLinkFn,
                cleanStateFn,
                addPasswordFn,
                addDownloadsFn
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppState
