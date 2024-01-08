'use client'
import JoinForm from './JoinForm'
import { useEffect, useState } from 'react'
import {
	selectIsConnectedToRoom,
	useHMSActions,
	useHMSStore,
	useHMSNotifications,
	selectLocalPeerID,
	HMSNotificationTypes,
	HMSPoll,
} from '@100mslive/react-sdk'
import Footer from './Footer'
import Conference from './Conference'
import ViewPoll from './ViewPoll'
import PollForm from './StartPollForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
	const isConnected = useHMSStore(selectIsConnectedToRoom)
	const hmsActions = useHMSActions()
	const notification = useHMSNotifications()
	const localPeerID = useHMSStore(selectLocalPeerID)

	const [pollFormIsShown, setPollFormIsShownn] = useState(false)
	const [pollModalIsShown, setPollModalIsShown] = useState(false)
	const [pollNotificationData, setPollNotificationData] = useState<HMSPoll | undefined>()

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

	useEffect(() => {
		if (!notification) {
			return
		}
		switch (notification.type) {
			case HMSNotificationTypes.POLL_STARTED:
				if (notification.data.startedBy !== localPeerID) {
					console.log('NOTIFICATION RECEIVED')
					console.log(notification.data)
					setPollNotificationData(notification.data)
					toast(`A new Poll is available: ${notification.data.title}!`)
				}
				break
			default:
				break
		}
	}, [notification, localPeerID])

	return (
		<div className={`App ${isConnected ? 'call' : 'preview'}`}>
			{pollFormIsShown && <PollForm onClose={hidePollFormHandler} />}
			{pollModalIsShown && <ViewPoll onClose={hidePollModalHandler} />}

			{isConnected ? (
				<>
					<ToastContainer />
					<Conference />
					<Footer />
				</>
			) : (
				<JoinForm />
			)}
		</div>
	)
}
