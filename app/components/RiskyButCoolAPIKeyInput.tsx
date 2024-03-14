import { ChangeEvent, useCallback } from 'react'
import { QuestionIcon } from '@100mslive/react-icons'
import { useBreakpoint } from '@tldraw/tldraw'

export function RiskyButCoolAPIKeyInput() {
	const breakpoint = useBreakpoint()

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('OPEN_AI_KEY', e.target.value)
		}
	}, [])

	const handleQuestionMessage = useCallback(() => {
		window.alert(
			`If you have an OpenAI developer key, you can put it in this input and it will be used when posting to OpenAI.\n\nSee https://platform.openai.com/api-keys to get a key.\n\nPutting API keys into boxes is generally a bad idea! If you have any concerns, create an API key and then revoke it after using this site.`
		)
	}, [])

	return (
		<div className="input-container">
			<div className="input-label">
				Your OpenAI API Key
				<button className="question__button" onClick={handleQuestionMessage}>
					<QuestionIcon height={20} width={20} />
				</button>
			</div>
			<input type="text" placeholder="OpenAI API Key" onChange={handleChange} />
		</div>
	)
}
