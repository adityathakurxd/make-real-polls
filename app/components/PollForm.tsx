import { useState, useCallback, useEffect } from 'react'
import { useHMSActions } from '@100mslive/react-sdk'
import { useEditor, useToasts } from '@tldraw/tldraw'
import Modal from './Modal'
import { HMSPollQuestionType } from './constants'
import { makeReal } from '../makeReal'
import { useQuestionContext } from '../context'

interface PollFormProps {
	onClose: () => void
}

const PollForm: React.FC<PollFormProps> = ({ onClose }) => {
	const hmsActions = useHMSActions()
	const editor = useEditor()
	const { addToast } = useToasts()

	const { questionData, setQuestionData } = useQuestionContext()
	const [localQuestionData, setLocalQuestionData] = useState(questionData)

	useEffect(() => {
		setLocalQuestionData(questionData)
		console.log('ollo updated to', questionData)
	}, [questionData])

	const regenerateQuestion = useCallback(
		async (question: string) => {
			try {
				await makeReal(
					editor,
					(value) => {
						setQuestionData(value)
					},
					question
				)
			} catch (e) {
				console.error(e)
				addToast({
					icon: 'cross-2',
					title: 'Something went wrong',
					description: (e as Error).message.slice(0, 100),
				})
			}
		},
		[editor, setQuestionData, addToast]
	)

	const createPollOnClick = async () => {
		const id = Date.now().toString()
		await hmsActions.interactivityCenter
			.createPoll({
				id,
				title: questionData?.question || '',
				type: 'poll',
				rolesThatCanViewResponses: ['host'],
			})
			.catch((err: Error) => console.log(err.message))
		console.log('POLL Created')
		await hmsActions.interactivityCenter
			.addQuestionsToPoll(id, [
				{
					text: questionData?.question || '',
					type: 'single-choice' as HMSPollQuestionType,
					options: [
						{
							text: questionData?.options[0] || '',
							isCorrectAnswer: false,
						},
						{
							text: questionData?.options[1] || '',
							isCorrectAnswer: false,
						},
						{
							text: questionData?.options[2] || '',
							isCorrectAnswer: false,
						},
						{
							text: questionData?.options[3] || '',
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
		onClose()
	}

	return (
		<Modal title="Confirm problem set" onClose={onClose}>
			<input
				value={localQuestionData.question}
				onChange={(e) =>
					setLocalQuestionData((prev) => {
						return { ...prev, question: e.target.value }
					})
				}
			/>
			<br />
			{localQuestionData?.options.map((option: string, index: number) => (
				<input
					style={{ margin: '0.5rem 0' }}
					key={index}
					value={option}
					onChange={(e) =>
						setLocalQuestionData((prev) => {
							const optionsCopy = prev.options
							optionsCopy[index] = e.target.value
							return { ...prev, options: optionsCopy }
						})
					}
				/>
			))}

			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<button onClick={() => regenerateQuestion(localQuestionData.question)}>Regenerate</button>
				<button onClick={createPollOnClick}>Start Poll</button>
			</div>
		</Modal>
	)
}

export default PollForm
