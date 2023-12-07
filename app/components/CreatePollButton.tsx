'use client'
import { useEditor, useToasts } from '@tldraw/tldraw'
import { useCallback, useState } from 'react'
import { makeReal } from '../makeReal'
import PollForm from './CreatePoll'

export function CreatePollButton() {
	const editor = useEditor()
	const { addToast } = useToasts()

	const [pollFormIsShown, setPollFormIsShown] = useState(false)
	const [apiData, seApiData] = useState()

	const showPollFormHandler = (value: any) => {
		seApiData(value) // Store the API data in a state
		setPollFormIsShown(true)
	}

	const hidePollFormHandler = () => {
		setPollFormIsShown(false)
	}

	const handleClick = useCallback(async () => {
		console.log('make real')
		try {
			await makeReal(editor, showPollFormHandler)
		} catch (e) {
			console.error(e)
			addToast({
				icon: 'cross-2',
				title: 'Something went wrong',
				description: (e as Error).message.slice(0, 100),
			})
		}
	}, [editor, addToast])

	return (
		<>
			{pollFormIsShown && <PollForm onClose={hidePollFormHandler} apiData={apiData} />}
			<button className="makeRealButton" onClick={handleClick}>
				Create Poll
			</button>
		</>
	)
}
