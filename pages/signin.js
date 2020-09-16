import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import AuthContext from '../context/auth/authContext'
const SignIn = () => {
    const { authenticated, signInFn } = useContext(AuthContext)

    // *Next router
    const router = useRouter()
    useEffect(() => {
        if (authenticated) {
            router.push('/')
        }
    }, [authenticated])
    // * Form validation with formik and yup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('The email is required')
                .email('The email is not valid'),
            password: Yup.string()
                .required('The password is required')
        }),
        onSubmit: (data) => {
            signInFn(data)
        }
    })
    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-semibold text-gray-800 text-center my-4">
                    Sign in
                </h2>
                <div className="flex justify-center">
                    <div className="w-full max-w-lg">
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-black text-sm font-semibold mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    placeholder="Type your email"
                                    type="email"
                                    autoComplete="off"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-gray-200 rounded border-l-4 border-red-600 font-semibold text-red-700 p-2">
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null
                                }
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-black text-sm font-semibold mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    placeholder="Type your password"
                                    type="password"
                                    autoComplete="off"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="my-2 bg-gray-200 rounded border-l-4 border-red-600 font-semibold text-red-700 p-2">
                                        <p>{formik.errors.password}</p>
                                    </div>
                                ) : null
                                }
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded uppercase mt-2"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SignIn
