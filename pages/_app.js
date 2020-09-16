import React from 'react'
import AppState from '../context/app/appState'
import AuthState from '../context/auth/authState'
import { ToastProvider } from 'react-toast-notifications'
import CustomToast from '../components/CustomToast'

const MyApp = ({ Component, pageProps }) => {
	return (
		<ToastProvider
			components={{ Toast: CustomToast }}
			autoDismiss
			autoDismissTimeout={4500}
			placement="bottom-left"
		>
			<AppState>
				<AuthState>
					<Component {...pageProps} />
				</AuthState>
			</AppState>
		</ToastProvider >
	)
}

export default MyApp
