import React, { useState } from 'react'
import Modal from './Modal'
import { useHMSActions } from '@100mslive/react-sdk'
import { toast } from 'react-toastify'

interface ViewPollProps {
	pollNotificationData: any
	onClose: () => void
}

const ViewPoll: React.FC<ViewPollProps> = ({ pollNotificationData, onClose }) => {
	const actions = useHMSActions()
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | undefined>()

	function handleChange(event: any) {
		setSelectedOptionIndex(event.target.value)
	}

	const handleSubmit = async (event: any) => {
		event.preventDefault()

		await actions.interactivityCenter.addResponsesToPoll(pollNotificationData.id, [
			{
				questionIndex: pollNotificationData.questions[0].index,
				option: Number(selectedOptionIndex),
			},
		])
		toast(`Vote done!`)
		onClose()
	}

	return (
		<Modal onClose={onClose} title={pollNotificationData.title}>
			<div>
				{pollNotificationData.questions[0].options.map((option, index) => (
					<div
						key={option.text}
						style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0', gap: '0.25rem' }}
					>
						<input
							style={{ cursor: 'pointer' }}
							type="radio"
							value={option.index}
							checked={Number(selectedOptionIndex) === index + 1}
							onChange={handleChange}
						/>
						{option.text}
					</div>
				))}

				<button onClick={handleSubmit} style={{ marginTop: '0.75rem' }}>
					Submit
				</button>
			</div>
		</Modal>
	)
}

export default ViewPoll
