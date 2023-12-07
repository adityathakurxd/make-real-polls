import Modal from './Modal'
import { useEffect, useState } from 'react'
import { useHMSActions } from '@100mslive/react-sdk'

interface PollFormProps {
	onClose: () => void
	apiData?: Inputs // Assuming apiData has the same structure as Inputs
}

export enum HMSPollQuestionType {
	SINGLE_CHOICE = 'single-choice',
	MULTIPLE_CHOICE = 'multiple-choice',
	SHORT_ANSWER = 'short-answer',
	LONG_ANSWER = 'long-answer',
}

interface Inputs {
	name?: string
	text?: string
	first?: string
	second?: string
}

const PollForm: React.FC<PollFormProps> = (props) => {
	const hmsActions = useHMSActions()
	const [inputs, setInputs] = useState<Inputs>({})

	// Update the form state when apiData changes
	useEffect(() => {
		if (props.apiData) {
			setInputs(props.apiData)
		}
	}, [props.apiData])

	const handleCreate = async (id: string) => {
		console.log(`POLL CREATED with ${id}`)
		await hmsActions.interactivityCenter.addQuestionsToPoll(id, [
			{
				text: inputs.text || '',
				options: [
					{
						text: inputs.first || '',
						isCorrectAnswer: false,
					},
					{
						text: inputs.second || '',
						isCorrectAnswer: false,
					},
				],
				skippable: true,
				type: 'single-choice' as HMSPollQuestionType,
			},
		])
		await hmsActions.interactivityCenter.startPoll(id)
		props.onClose()
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name
		const value = event.target.value
		setInputs((values) => ({ ...values, [name]: value }))
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const id = Date.now().toString()
		await hmsActions.interactivityCenter
			.createPoll({
				id,
				title: inputs.name || '',
				type: 'poll',
				rolesThatCanViewResponses: ['host'],
			})
			.then(() => handleCreate(id))
			.catch((err: Error) => console.log(err.message))
	}

	return (
		<Modal onClose={props.onClose}>
			<form onSubmit={handleSubmit}>
				<label>
					Enter a Name for the Poll:
					<div className="input-container">
						<input type="text" name="name" value={inputs.name || ''} onChange={handleChange} />
					</div>
				</label>
				<label>
					Enter a Title for the Poll:
					<div className="input-container">
						<input type="text" name="text" value={inputs.text || ''} onChange={handleChange} />
					</div>
				</label>
				<label>
					Enter the First Value:
					<div className="input-container">
						<input type="text" name="first" value={inputs.first || ''} onChange={handleChange} />
					</div>
				</label>
				<label>
					Enter the Second Value:
					<div className="input-container">
						<input type="text" name="second" value={inputs.second || ''} onChange={handleChange} />
					</div>
				</label>
				<input type="submit" />
			</form>
		</Modal>
	)
}

export default PollForm
