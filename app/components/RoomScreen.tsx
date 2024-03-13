'use client'
import { useEffect, useState } from 'react'
import {
	useHMSStore,
	useHMSNotifications,
	selectLocalPeerID,
	HMSNotificationTypes,
	HMSPoll,
} from '@100mslive/react-sdk'
import Conference from './Conference'
import PollForm from './PollForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QuestionContext } from '../context'

export const RoomScreen = () => {
	const localPeerID = useHMSStore(selectLocalPeerID)
	const notification = useHMSNotifications(HMSNotificationTypes.POLL_STARTED)
	const [pollNotificationData, setPollNotificationData] = useState<HMSPoll | undefined>()

	const [showPollForm, setShowPollForm] = useState(false)
	const [questionData, setQuestionData] = useState<any>(undefined)

	const ToastNotification = () => {
		return (
			<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
				<p>A new poll is available!</p>
			</div>
		)
	}

	useEffect(() => {
		if (!notification) {
			return
		}

		if (notification.data.startedBy !== localPeerID) {
			setPollNotificationData(notification.data)
			toast(<ToastNotification />)
		}
	}, [notification, localPeerID])

	return (
		<QuestionContext.Provider value={{ questionData, setQuestionData }}>
			<ToastContainer />
			<Conference />

			{showPollForm && (
				<PollForm
					onClose={() => {
						setShowPollForm(false)
					}}
				/>
			)}
		</QuestionContext.Provider>
	)
}
