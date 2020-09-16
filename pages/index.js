import React, { useEffect, useContext } from 'react'
import Layout from '../components/Layout'
import AuthContext from '../context/auth/authContext'
import AppContext from '../context/app/appContext'
import Link from 'next/link'
import Dropzone from '../components/Dropzone'
const Home = () => {

	// * Get the auth user
	const { authenticated, authUserFn } = useContext(AuthContext)
	const { url } = useContext(AppContext)
	useEffect(() => {
		const token = localStorage.getItem('rms-token');
		if (token) {
			authUserFn()
		}
	}, [])
	return (
		<Layout>
			<div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
				{url ?
					<>
						<p className="text-center font-semibold text-2xl">
							<span className="font-bold text-red-600 text-2xl uppercase">
								Your URL is:{' '}
							</span>
							{`${process.env.frontendURL}/links/${url}`}
						</p>
						<button
							type="button"
							className="w-full bg-red-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded uppercase mt-2"
							onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
						>
							Copy to clipboard
                    	</button>
					</>
					:
					<div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
						<Dropzone />
						<div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
							<h2 className="text-4xl font-sans font-semibold text-gray-800 my-4">
								Share your files simply and privately
							</h2>
							<p className="text-lg leading-loose mb-4">
								<span className="text-red-600 font-semibold">React Mattu Send{" "}</span>
								allows you to share files with end-to-end encryption and the files are
								deleted after they are downloaded. So you can keep what you share private
								and make sure your files don't stay online forever.
							</p>
							{!authenticated &&
								<Link href='/signup'>
									<a className="text-red-600 font-semibold text-lg hover:text-red-800">
										Create an account for free, to get premiun benefits
									</a>
								</Link>
							}

						</div>
					</div>
				}
			</div>
		</Layout>
	)
}
export default Home