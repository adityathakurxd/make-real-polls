import JoinForm from './JoinForm'
import { useEffect } from 'react'
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from '@100mslive/react-sdk'
import Footer from './Footer'
import Conference from '../conference/page'

export default function Home() {
	const isConnected = useHMSStore(selectIsConnectedToRoom)
	const hmsActions = useHMSActions()

	useEffect(() => {
		window.onunload = () => {
			if (isConnected) {
				hmsActions.leave()
			}
		}
	}, [hmsActions, isConnected])

	return (
		<div className="App">
			{isConnected ? (
				<>
					<Conference />
					<Footer />
				</>
			) : (
				<JoinForm />
			)}
		</div>
	)
}
