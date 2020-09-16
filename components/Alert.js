import React, { useContext } from 'react'
import AuthContext from '../context/auth/authContext'
const Alert = () => {
    const { msg, error } = useContext(AuthContext)
    return (
        <>
            <div className={error ?
                "max-w-lg w-full my-2 bg-gray-200 rounded border-l-4 font-semibold p-4 mx-auto border-red-600 text-red-700" :
                "max-w-lg w-full my-2 bg-gray-200 rounded border-l-4 font-semibold p-4 mx-auto border-gray-800 text-gray-900"
            }
                role="alert"
            >
                <p className="font-bold">
                    {error ? 'Error' : 'Success'}
                </p>
                {msg}
            </div>
        </>
    )
}

export default Alert
