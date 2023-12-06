import { Editor, TLShapeId, createShapeId } from '@tldraw/tldraw'
import { ResponseShape } from './ResponseShape/ResponseShape'
import { getSelectionAsImageDataUrl } from './lib/getSelectionAsImageDataUrl'
import {
	GPT4VCompletionResponse,
	GPT4VMessage,
	MessageContent,
	fetchFromOpenAi,
} from './lib/fetchFromOpenAi'

// the system prompt explains to gpt-4 what we want it to do and how it should behave.
const systemPrompt = `You are expert at engaging audience through interative polls and quizzes. Your job is to accept a drawing or an image and generate a poll with multiple options for the attendees to vote on to make a session more interative. For example, if there a 2 + 2 question genearte the correct answer which is 4 and three other options which could be 2,3,5, etc


When sent new wireframes, respond ONLY with the a json of Poll title and 4 options.`

export async function makeReal(editor: Editor) {
	// we can't make anything real if there's nothing selected
	const selectedShapes = editor.getSelectedShapes()
	if (selectedShapes.length === 0) {
		throw new Error('First select something to make real.')
	}

	// first, we build the prompt that we'll send to openai.
	const prompt = await buildPromptForOpenAi(editor)

	// then, we create an empty response shape. we'll put the response from openai in here, but for
	// now it'll just show a spinner so the user knows we're working on it.
	const responseShapeId = makeEmptyResponseShape(editor)

	try {
		// If you're using the API key input, we preference the key from there.
		// It's okay if this is undefined—it will just mean that we'll use the
		// one in the .env file instead.
		const apiKeyFromDangerousApiKeyInput = (
			document.body.querySelector('#openai_key_risky_but_cool') as HTMLInputElement
		)?.value

		// make a request to openai. `fetchFromOpenAi` is a next.js server action,
		// so our api key is hidden.
		const openAiResponse = await fetchFromOpenAi(apiKeyFromDangerousApiKeyInput, {
			model: 'gpt-4-vision-preview',
			max_tokens: 4096,
			temperature: 0,
			messages: prompt,
		})

		// const id = Date.now().toString()
		// await hmsActions.interactivityCenter
		// 	.createPoll({
		// 		id,
		// 		title: inputs.name,
		// 		type: 'poll',
		// 		rolesThatCanViewResponses: ['host'],
		// 	})
		// 	.then(() => handleCreate(id))
		// 	.catch((err) => console.log(err.message))

		// // populate the response shape with the html we got back from openai.
		// populateResponseShape(editor, responseShapeId, openAiResponse)
	} catch (e) {
		// if something went wrong, get rid of the unnecessary response shape
		editor.deleteShape(responseShapeId)
		throw e
	}
}

async function buildPromptForOpenAi(editor: Editor): Promise<GPT4VMessage[]> {
	// if the user has selected a previous response from gpt-4, include that too. hopefully gpt-4 will
	// modify it with any other feedback or annotations the user has left.
	const previousResponseContent = getContentOfPreviousResponse(editor)

	// the user messages describe what the user has done and what they want to do next. they'll get
	// combined with the system prompt to tell gpt-4 what we'd like it to do.
	const userMessages: MessageContent = [
		{
			type: 'image_url',
			image_url: {
				// send an image of the current selection to gpt-4 so it can see what we're working with
				url: await getSelectionAsImageDataUrl(editor),
				detail: 'high',
			},
		},
		{
			type: 'text',
			text: previousResponseContent
				? 'Here are the latest wireframes. Could you make a new website based on these wireframes and notes and send back just the html file?'
				: 'Here are the latest wireframes including some notes on your previous work. Could you make a new website based on these wireframes and notes and send back just the html file?',
		},
		{
			// send the text of all selected shapes, so that GPT can use it as a reference (if anything is hard to see)
			type: 'text',
			text: getSelectionAsText(editor),
		},
	]

	if (previousResponseContent) {
		userMessages.push({
			type: 'text',
			text: previousResponseContent,
		})
	}

	// combine the user prompt with the system prompt
	return [
		{ role: 'system', content: systemPrompt },
		{ role: 'user', content: userMessages },
	]
}

function populateResponseShape(
	editor: Editor,
	responseShapeId: TLShapeId,
	openAiResponse: GPT4VCompletionResponse
) {
	if (openAiResponse.error) {
		throw new Error(openAiResponse.error.message)
	}

	// // extract the html from the response
	// const message = openAiResponse.choices[0].message.content
	// const start = message.indexOf('<!DOCTYPE html>')
	// const end = message.indexOf('</html>')
	// const html = message.slice(start, end + '</html>'.length)

	// // update the response shape we created earlier with the content
	// editor.updateShape<ResponseShape>({
	// 	id: responseShapeId,
	// 	type: 'response',
	// 	props: { html },
	// })

	console.log(openAiResponse)
}

function makeEmptyResponseShape(editor: Editor) {
	const selectionBounds = editor.getSelectionPageBounds()
	if (!selectionBounds) throw new Error('No selection bounds')

	const newShapeId = createShapeId()
	editor.createShape<ResponseShape>({
		id: newShapeId,
		type: 'response',
		x: selectionBounds.maxX + 60,
		y: selectionBounds.y,
	})

	return newShapeId
}

function getContentOfPreviousResponse(editor: Editor) {
	const previousResponses = editor
		.getSelectedShapes()
		.filter((shape): shape is ResponseShape => shape.type === 'response')

	if (previousResponses.length === 0) {
		return null
	}

	if (previousResponses.length > 1) {
		throw new Error('You can only have one previous response selected')
	}

	return previousResponses[0].props.html
}

function getSelectionAsText(editor: Editor) {
	const selectedShapeIds = editor.getSelectedShapeIds()
	const selectedShapeDescendantIds = editor.getShapeAndDescendantIds(selectedShapeIds)

	const texts = Array.from(selectedShapeDescendantIds)
		.map((id) => {
			const shape = editor.getShape(id)
			if (!shape) return null
			if (
				shape.type === 'text' ||
				shape.type === 'geo' ||
				shape.type === 'arrow' ||
				shape.type === 'note'
			) {
				// @ts-expect-error
				return shape.props.text
			}
			return null
		})
		.filter((v) => v !== null && v !== '')

	return texts.join('\n')
}
