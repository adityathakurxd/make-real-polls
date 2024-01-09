import React, { useState } from 'react'
import Modal from './Modal'
import { useHMSActions } from '@100mslive/react-sdk'
import { toast } from 'react-toastify'
import { Button } from '@tldraw/tldraw'

interface ViewPollProps {
	pollNotificationData: any
	// pollNotificationData: HMSPollNotificationData
	onClose: () => void
}

const ViewPoll: React.FC<ViewPollProps> = (props) => {
	const actions = useHMSActions()
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | undefined>()

	function handleChange(event: any) {
		setSelectedOptionIndex(event.target.value)
	}

	const handleSubmit = async (event: any) => {
		event.preventDefault()

		await actions.interactivityCenter.addResponsesToPoll(props.pollNotificationData.id, [
			{
				questionIndex: props.pollNotificationData.questions[0].index,
				option: Number(selectedOptionIndex),
			},
		])

		toast(`Vote done!`)
	}

	return (
		<Modal onClose={props.onClose}>
			<h1>Poll: {props.pollNotificationData.title}</h1>

			<h3>{props.pollNotificationData.questions[0].text}</h3>

			<form onSubmit={handleSubmit}>
				<div className="radio">
					<label>
						<input
							type="radio"
							value={props.pollNotificationData.questions[0].options[0].index}
							checked={Number(selectedOptionIndex) === 1}
							onChange={handleChange}
						/>
						{props.pollNotificationData.questions[0].options[0].text}
					</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={props.pollNotificationData.questions[0].options[1].index}
							checked={Number(selectedOptionIndex) === 2}
							onChange={handleChange}
						/>
						{props.pollNotificationData.questions[0].options[1].text}
					</label>
				</div>

				<br />
				<button type="submit">Submit</button>
			</form>
		</Modal>
	)
}

export default ViewPoll
