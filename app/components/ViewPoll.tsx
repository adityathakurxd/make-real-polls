import React, { useState } from 'react'
import Modal from './Modal'
import { useHMSActions } from '@100mslive/react-sdk'
import { toast } from 'react-toastify'
import { RefreshIcon } from '@100mslive/react-icons'

interface ViewPollProps {
	pollNotificationData: any
	onClose: () => void
}

const ViewPoll: React.FC<ViewPollProps> = ({ pollNotificationData, onClose }) => {
	const actions = useHMSActions()
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | undefined>()
	const [loading, setLoading] = useState(false)

	function handleChange(event: any) {
		setSelectedOptionIndex(event.target.value)
	}

	const handleSubmit = async (event: any) => {
		event.preventDefault()
		setLoading(true)

		await actions.interactivityCenter.addResponsesToPoll(pollNotificationData.id, [
			{
				questionIndex: pollNotificationData.questions[0].index,
				option: Number(selectedOptionIndex),
			},
		])
		toast(`Vote submitted!`)
		onClose()
	}

	return (
		<Modal onClose={onClose} title={pollNotificationData.title}>
			<div style={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
				{pollNotificationData.questions[0].options.map(
					(
						option: {
							text: any
							index: string | number | readonly string[] | undefined
						},
						index: number
					) => (
						<label
							key={index}
							htmlFor={'' + index}
							style={{
								display: 'flex',
								alignItems: 'center',
								margin: '0.25rem 0',
								gap: '0.25rem',
								width: 'fit-content',
								cursor: 'pointer',
							}}
						>
							<input
								style={{ cursor: 'pointer' }}
								type="radio"
								value={option.index}
								checked={Number(selectedOptionIndex) === index + 1}
								onChange={handleChange}
								id={'' + index}
							/>
							<label
								htmlFor={'' + index}
								style={{ color: 'black', fontWeight: '500', cursor: 'pointer' }}
							>
								{option.text}
							</label>
						</label>
					)
				)}

				<button className="primary" onClick={handleSubmit} style={{ marginTop: '0.75rem' }}>
					{loading ? <RefreshIcon style={{ animation: 'spin 2s linear infinite' }} /> : 'Submit'}
				</button>
			</div>
		</Modal>
	)
}

export default ViewPoll
