import Modal from './Modal'
import { useEffect, useState } from 'react'
import { useHMSActions } from '@100mslive/react-sdk'

interface PollFormProps {
	onClose: () => void
	apiData?: PollData // Assuming apiData has the same structure as Inputs
}

interface PollData {
	'Poll title': string
	options: string[]
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
	// useEffect(() => {
	// 	if (props.apiData) {
	// 		setInputs(props.apiData)
	// 	}
	// }, [props.apiData])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name
		const value = event.target.value
		setInputs((values) => ({ ...values, [name]: value }))
	}

	const printAPIData = () => {
		console.log(props.apiData)
	}
	const createPollOnClick = async () => {
		const id = Date.now().toString()
		await hmsActions.interactivityCenter
			.createPoll({
				id,
				title: props.apiData?.['Poll title'] || '',
				type: 'poll',
				rolesThatCanViewResponses: ['host'],
			})
			.catch((err: Error) => console.log(err.message))
		console.log('POLL Created')
		await hmsActions.interactivityCenter.addQuestionsToPoll(id, [
			{
				text: props.apiData?.['Poll title'] || '',
				type: 'single-choice' as HMSPollQuestionType,
				options: [
					{
						text: props.apiData?.options[0] || '',
						isCorrectAnswer: false,
					},
					{
						text: props.apiData?.options[1] || '',
						isCorrectAnswer: false,
					},
					{
						text: props.apiData?.options[2] || '',
						isCorrectAnswer: false,
					},
					{
						text: props.apiData?.options[3] || '',
						isCorrectAnswer: false,
					},
				],
				skippable: true,
			},
		])
		console.log('Adding options')
		await hmsActions.interactivityCenter.startPoll(id)
		console.log('POLL Started')
	}

	return (
		<Modal onClose={props.onClose}>
			<h1>{props.apiData?.['Poll title']}</h1>
			<p>{props.apiData?.options[0]}</p>
			<p>{props.apiData?.options[1]}</p>
			<p>{props.apiData?.options[2]}</p>
			<p>{props.apiData?.options[3]}</p>
			<button onClick={createPollOnClick}>Start Poll</button>
			{/* <form onSubmit={handleSubmit}> */}
			{/* <label>
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
				</label> */}
			{/* <input type="submit" /> */}
			{/* </form> */}
		</Modal>
	)
}

export default PollForm
