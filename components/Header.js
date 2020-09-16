import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import AuthContext from '../context/auth/authContext'
import AppContext from '../context/app/appContext'
import { useRouter } from 'next/router'
const Header = () => {
    // * useRouter hook destructuring 
    const router = useRouter()

    // * Auth context, getting things to use
    const { user, signOutFn } = useContext(AuthContext)

    // * App context, getting things to use
    const { cleanStateFn } = useContext(AppContext)

    // ! This was fool code
    // useEffect(() => {
    //     authUserFn()
    // }, [])
    const redirectToHome = () => {
        router.push('/')
        cleanStateFn()
    }
    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" alt="logo"
                onClick={() => redirectToHome()}
            />
            <div className="flex items-center">
                {user ?
                    <>
                        <p className="font-semibold mr-4">{user.name} &#10024;</p>
                        <button
                            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded uppercase"
                            onClick={() => signOutFn()}
                        >
                            Sign out
                            </button>

                    </>
                    :
                    <>
                        <Link href="/signin">
                            <a className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded uppercase mr-3">
                                Sign in
                            </a>
                        </Link>
                        <Link href="/signup">
                            <a className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded uppercase">
                                Sign up
                            </a>
                        </Link>
                    </>
                }
            </div>
        </header >
    )
}

export default Header
