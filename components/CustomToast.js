import React from 'react'

const CustomToast = ({ appearance, children, onDismiss }) => {
    return (
        <div className={appearance === 'error' ?
            "text-white px-6 py-4 border-0 rounded relative mb-4 bg-gray-200 rounded border-l-4 font-semibold p-4 border-red-600 text-red-700"
            :
            "text-white px-6 py-4 border-0 rounded relative mb-4 bg-gray-200 rounded border-l-4 font-semibold p-4 border-gray-800 text-gray-900"
        }
        >
            <p className="font-bold">
                {appearance === 'error' ? 'Error' : 'Success'}
            </p>
            <span className="inline-block align-middle mr-8">
                {children}
            </span>
            <button
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                onClick={onDismiss}
            >
                <span>×</span>
            </button>
        </div>
    )
}

export default CustomToast
