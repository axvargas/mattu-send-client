import React, { useState } from 'react'
import axiosClient from '../../config/axios'
import { useToasts } from 'react-toast-notifications'

import Layout from '../../components/Layout';

export const getServerSideProps = async ({ params }) => {
    const { link } = params

    try {
        const response = await axiosClient.get(`links/${link}`)

        return {
            props: {
                link: response.data
            }
        }
    } catch (error) {
        console.log("ERROR: ", error.response.data.msg);
    }
}

export const getServerSidePaths = async () => {
    try {
        const response = await axiosClient.get('/links')
        return {
            paths: response.data.links.map((link) => (
                {
                    params: {
                        link: link.url
                    }
                }
            )),
            fallback: false
        }
    } catch (error) {
        console.log("ERROR: ", error.response.data.msg)
    }

}

const LinkPage = ({ link }) => {
    const { addToast } = useToasts()

    const [hasGotPassword, setHasGotPassword] = useState(link.password)
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const gotToDownload = async (e) => {
        e.preventDefault()
        const data = {
            password
        }
        try {
            const response = await axiosClient.post(`/links/${link.link}`, data)
            setHasGotPassword(response.data.password)
            addToast(response.data.msg, { appearance: 'success' })
        } catch (error) {
            if (!error.response.data.field) {
                addToast(error.response.data.msg, { appearance: 'error' })
            }
            if (error.response.data.field) {
                setError(error.response.data.msg)
            }
        }
    }
    return (
        <Layout>
            {hasGotPassword ?
                <>
                    <p className="text-2xl text-center -text-gray-700 font-semibold mb-6">
                        This link is protected with a password, type it to access to the file
                        </p>
                    <div className="flex justify-center">
                        <div className="w-full max-w-lg">
                            <form
                                noValidate
                                onSubmit={(e) => gotToDownload(e)}
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-black text-sm font-semibold mb-2"
                                    >
                                        Password
                                </label>
                                    <input
                                        id="password"
                                        placeholder="Type the password"
                                        type="password"
                                        autoComplete="off"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            if (error) {
                                                setError(null)
                                            }
                                        }}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {error &&
                                        <div className="my-2 bg-gray-200 rounded border-l-4 border-red-600 font-semibold text-red-700 p-2">
                                            <p>{error}</p>
                                        </div>
                                    }
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded uppercase mt-2"
                                >
                                    Go to dowload url
                            </button>
                            </form>
                        </div>
                /</div>
                </>
                :
                <>
                    <h1 className="text-2xl text-center -text-gray-700 font-semibold">Download your file</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a
                            className="bg-red-600 hover:bg-gray-700 text-center px-10 py-3 rounded uppercase font-semibold text-white cursor-pointer"
                            href={`${process.env.backendURL}/api/files/${link.file}`}
                            download
                        >
                            Here
                        </a>
                    </div>
                </>

            }

        </Layout>
    )
}

export default LinkPage
