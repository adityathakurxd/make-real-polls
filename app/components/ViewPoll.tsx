import React, { useState } from 'react'
import Modal from './Modal'
import { useHMSActions } from '@100mslive/react-sdk'

interface ViewPollProps {
	// pollNotificationData: HMSPollNotificationData
	onClose: () => void
}

const ViewPoll: React.FC<ViewPollProps> = (props) => {
	const actions = useHMSActions()
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | undefined>()

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setSelectedOptionIndex(parseInt(event.target.value))
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		// event.preventDefault()
		// if (selectedOptionIndex !== undefined) {
		// 	await actions.interactivityCenter.addResponsesToPoll(props.pollNotificationData.id, [
		// 		{
		// 			questionIndex: props.pollNotificationData.questions[0].index,
		// 			option: selectedOptionIndex,
		// 		},
		// 	])
		// 	toast(`Vote done!`)
		// 	props.onClose()
		// }
	}

	return (
		<Modal onClose={props.onClose}>
			<h1>Poll: Hello</h1>

			<h3>sssss</h3>
		</Modal>
	)
}

export default ViewPoll
