'use client'
import JoinForm from './JoinForm'
import { useEffect, useState } from 'react'
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from '@100mslive/react-sdk'
import Footer from './Footer'
import Conference from './Conference'
import ViewPoll from './ViewPoll'
import PollForm from './CreatePoll'

export default function Home() {
	const isConnected = useHMSStore(selectIsConnectedToRoom)
	const hmsActions = useHMSActions()
	const [pollFormIsShown, setPollFormIsShownn] = useState(false)
	const [pollModalIsShown, setPollModalIsShown] = useState(false)

	const showPollFormHandler = () => {
		setPollFormIsShownn(true)
	}

	const hidePollFormHandler = () => {
		setPollFormIsShownn(false)
	}

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
			{pollFormIsShown && <PollForm onClose={hidePollFormHandler} />}
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
				<button onClick={showPollFormHandler}>Create Poll Form</button>
			</div>
		</div>
	)
}
