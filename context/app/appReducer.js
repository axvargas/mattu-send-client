import React from 'react'
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
const AppReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                hashedName: payload.hashedName,
                originalName: payload.originalName,
                msgFile: null,
                loading: null
            }
        case UPLOAD_FILE_ERROR:
            return {
                ...state,
                hashedName: null,
                originalName: null,
                msgFile: payload,
                loading: null
            }
        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                url: payload,
                msgFile: null
            }
        case CREATE_LINK_ERROR:
            return {
                ...state,
                msgFile: payload,
                url: null
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAN_STATE:
            return {
                ...state,
                loading: null,
                msgFile: null,
                hashedName: null,
                originalName: null,
                downloads: 1,
                password: null,
                author: null,
                url: null
            }
        case ADD_PASSWORD:
            return {
                ...state,
                password: payload,
            }
        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: payload,
            }
        default:
            return {
                ...state
            }
    }
}

export default AppReducer
