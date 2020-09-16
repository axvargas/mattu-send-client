import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AuthContext from '../context/auth/authContext'
import Alert from '../components/Alert'
const SignUp = () => {
    // * Get the context and state values
    const {
        signUpFn
    } = useContext(AuthContext)

    // * Form validation with formik and yup
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('The name is required'),
            email: Yup.string()
                .required('The email is required')
                .email('The email is not valid'),
            password: Yup.string()
                .required('The password is required')
                .min(6, "The password must be at least 6 character lenght")
        }),
        onSubmit: (data) => {
            signUpFn(data)
        }
    })

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-semibold text-gray-800 text-center my-4">
                    Sign up
                </h2>
                {/* {msg &&
                    <Alert />
                } */}
                <div className="flex justify-center">
                    <div className="w-full max-w-lg">
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-black text-sm font-semibold mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    placeholder="Type your name"
                                    type="text"
                                    autoComplete="off"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="my-2 bg-gray-200 rounded border-l-4 border-red-600 font-semibold text-red-700 p-2">
                                        <p>{formik.errors.name}</p>
                                    </div>
                                ) : null
                                }
                            </div>
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
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SignUp