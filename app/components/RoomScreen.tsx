'use client'
import { useEffect, useState } from 'react'
import {
	useHMSStore,
	useHMSNotifications,
	selectLocalPeerID,
	HMSNotificationTypes,
	HMSPoll,
} from '@100mslive/react-sdk'
import Footer from './Footer'
import Conference from './Conference'
import ViewPoll from './ViewPoll'
import PollForm from './PollForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QuestionContext } from '../context'
import { QuestionData } from './constants'

export const RoomScreen = () => {
	const localPeerID = useHMSStore(selectLocalPeerID)
	const notification = useHMSNotifications(HMSNotificationTypes.POLL_STARTED)
	const [pollNotificationData, setPollNotificationData] = useState<HMSPoll | undefined>()

	const [showPollForm, setShowPollForm] = useState(false)
	const [showPollModal, setShowPollModal] = useState(false)
	const [questionData, setQuestionData] = useState<QuestionData | undefined>(undefined)

	const ToastNotification = (pollNotificationData: any) => {
		return (
			<div>
				A new Poll is available: {pollNotificationData.title}!
				<button onClick={() => setShowPollModal(true)}> View Poll</button>
			</div>
		)
	}

	useEffect(() => {
		if (!notification) {
			return
		}

		if (notification.data.startedBy !== localPeerID) {
			console.log('NOTIFICATION RECEIVED')
			console.log(notification.data)
			setPollNotificationData(notification.data)
			toast(<ToastNotification {...notification.data} />)
		}
	}, [notification, localPeerID])

	return (
		// @ts-ignore
		<QuestionContext.Provider value={{ questionData, setQuestionData }}>
			<ToastContainer />
			<Conference />
			<Footer />
			{showPollForm && (
				<PollForm
					onClose={() => {
						setShowPollForm(false)
					}}
				/>
			)}
			{showPollModal && (
				<ViewPoll
					pollNotificationData={pollNotificationData}
					onClose={() => setShowPollModal(false)}
				/>
			)}
		</QuestionContext.Provider>
	)
}
