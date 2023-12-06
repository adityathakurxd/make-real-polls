'use client'
import JoinForm from './JoinForm'
import { useEffect, useState } from 'react'
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from '@100mslive/react-sdk'
import Footer from './Footer'
import Conference from '../conference/page'
import ViewPoll from './ViewPoll'

export default function Home() {
	const isConnected = useHMSStore(selectIsConnectedToRoom)
	const hmsActions = useHMSActions()

	const [pollModalIsShown, setPollModalIsShown] = useState(false)
	// const [pollNotificationData, setPollNotificationData] = useState()

	const showPollModalHandler = () => {
		setPollModalIsShown(true)
	}

	const hidePollModalHandler = () => {
		setPollModalIsShown(false)
	}

	useEffect(() => {
		window.onunload = () => {
			if (isConnected) {
				hmsActions.leave()
			}
		}
	}, [hmsActions, isConnected])

	return (
		<div className="App">
			{pollModalIsShown && <ViewPoll onClose={hidePollModalHandler} />}

			{isConnected ? (
				<>
					<Conference />
					<Footer />
				</>
			) : (
				<JoinForm />
			)}
			<div className="poll-div">
				<button onClick={showPollModalHandler}>View Poll</button>
			</div>
		</div>
	)
}
