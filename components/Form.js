import React, { useState, useContext } from 'react'
import AppContext from '../context/app/appContext'
const Form = () => {

    // * App context, getting things to use
    const { addPasswordFn, addDownloadsFn } = useContext(AppContext)

    const [withPassword, setWithPassword] = useState(false)
    return (
        <div className="w-full mt-8">
            <label
                htmlFor="downloads"
                className="text-md font-semibold text-gray-900"
            >
                Delete after
                </label>
            <div className="relative">

                <select
                    name="downloads"
                    className="block appearance-none w-full mt-2 bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    onChange={(e) => addDownloadsFn(e.target.value)}
                >
                    <option selected value="1">1 download</option>
                    <option value="5">5 download</option>
                    <option value="10">10 download</option>
                    <option value="20">20 download</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center">
                    <label
                        htmlFor="downloads"
                        className="text-md font-semibold text-gray-900 mr-2"
                    >
                        Protect with password
                    </label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded text-gray-800"
                        checked={withPassword}
                        onChange={() => {
                            setWithPassword(!withPassword)
                        }}
                    />
                </div>
                {withPassword &&
                    <input
                        type="password"
                        placeholder="Type your password"
                        className="appearance-none w-full mt-2 bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                        onChange={(e) => addPasswordFn(e.target.value)}
                    />
                }

            </div>
        </div>
    )
}

export default Form
