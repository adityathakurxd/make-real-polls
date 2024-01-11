'use client'
import { useEditor, useToasts } from '@tldraw/tldraw'
import { useCallback, useState } from 'react'
import { useQuestionContext } from '../context'
import { makeReal } from '../makeReal'
import PollForm from './PollForm'

export function CreatePollButton() {
	const editor = useEditor()
	const { addToast } = useToasts()

	const [pollFormIsShown, setPollFormIsShown] = useState(false)
	const { questionData, setQuestionData } = useQuestionContext()

	const hidePollFormHandler = () => {
		setPollFormIsShown(false)
	}

	const handleClick = useCallback(async () => {
		console.log('creating poll')
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
	}, [editor, setQuestionData, addToast])

	return (
		<>
			{pollFormIsShown && questionData && <PollForm onClose={hidePollFormHandler} />}
			<button className="makeRealButton" onClick={handleClick}>
				Create Poll
			</button>
		</>
	)
}
