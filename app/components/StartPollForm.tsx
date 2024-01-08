import Modal from './Modal'
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

const PollForm: React.FC<PollFormProps> = (props) => {
	const hmsActions = useHMSActions()

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
		await hmsActions.interactivityCenter
			.addQuestionsToPoll(id, [
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
			.catch((err: Error) => console.log(err.message))
		console.log('Adding options')
		await hmsActions.interactivityCenter
			.startPoll(id)
			.catch((err: Error) => console.log(err.message))
		console.log('POLL Started')
		props.onClose()
	}

	return (
		<Modal onClose={props.onClose}>
			<h1>{props.apiData?.['Poll title']}</h1>
			{props.apiData?.options.map((option, index) => (
				<p key={index}>{option}</p>
			))}

			<button onClick={createPollOnClick}>Start Poll</button>
		</Modal>
	)
}

export default PollForm
