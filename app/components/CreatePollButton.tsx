'use client'
import { RefreshIcon } from '@/node_modules/@100mslive/react-icons/dist/index'
import { SparkleIcon } from '@100mslive/react-icons'
import { useEditor, useToasts } from '@tldraw/tldraw'
import { useCallback, useState } from 'react'
import { useQuestionContext } from '../context'
import { makeReal } from '../makeReal'
import PollForm from './PollForm'
import { selectLocalPeerRoleName, useHMSStore } from '@100mslive/react-sdk'
import { ROLES } from './constants'

export function CreatePollButton() {
	const editor = useEditor()
	const { addToast } = useToasts()

	const [pollFormIsShown, setPollFormIsShown] = useState(false)
	const [fetchingQuestion, setFetchingQuestion] = useState(false)
	const { questionData, setQuestionData } = useQuestionContext()
	const localPeerRoleName = useHMSStore(selectLocalPeerRoleName)
	const showCreatePollButton = localPeerRoleName === ROLES.TEACHER

	const hidePollFormHandler = () => {
		setPollFormIsShown(false)
	}

	const handleClick = useCallback(async () => {
		if (fetchingQuestion) {
			return
		}
		console.log('creating poll')
		setFetchingQuestion(true)
		try {
			await makeReal(editor, (value) => {
				setQuestionData(value)
				setPollFormIsShown(true)
			})
		} catch (e) {
			console.error(e)
			addToast({
				icon: 'cross-2',
				title: 'Something went wrong',
				description: (e as Error).message.slice(0, 100),
			})
		}
		setFetchingQuestion(false)
	}, [editor, setQuestionData, addToast, fetchingQuestion])

	return (
		<>
			{pollFormIsShown && questionData && <PollForm onClose={hidePollFormHandler} />}
			{showCreatePollButton && (
				<button
					title="Create poll"
					className="create-poll-button"
					onClick={handleClick}
					disabled={fetchingQuestion}
				>
					{fetchingQuestion ? (
						<RefreshIcon style={{ animation: 'spin 2s linear infinite' }} />
					) : (
						<>
							<span className="create-poll-text">Create Poll</span>
							<SparkleIcon style={{ marginRight: -4 }} />
						</>
					)}
				</button>
			)}
		</>
	)
}
