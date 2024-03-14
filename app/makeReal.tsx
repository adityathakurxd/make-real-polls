import { Editor, TLShapeId, createShapeId } from '@tldraw/tldraw'

import { getSelectionAsImageDataUrl } from './lib/getSelectionAsImageDataUrl'
import {
	GPT4VCompletionResponse,
	GPT4VMessage,
	MessageContent,
	fetchFromOpenAi,
} from './lib/fetchFromOpenAi'

const SYSTEM_PROMPT = `You are an expert at constructing interative polls and quizzes for audiences.
Your job is to accept a design and turn it into a poll with multiple options for attendees to vote on to make a session more interative.
The poll must closely match the image you've been sent. Use the exact question and answers from the image. If the question or answers are missing, come up with those yourself so that they closely match the image.
For example, if you receive an image asking the user to pick their food, and a drawing of a banana, an apple, and a pear, the three options will be Banana, Apple, and Pear.
Some of the images and polls may be unusual. That's ok! The goal is to make the poll as close to the image as possible, and have some fun. If the image shows some creativity and humor, feel free to match that creativity and humor in the poll. For example, there might be a clear non-food in the previous example design, and instead the image contains a drawing of planet earth. If that's the case, it's ok! The options will be Banana, Apple, Pear, and Planet Earth.
if the image is a drawing of a cat, the question will be "What is this?" and the options will be "Cat", "Dog", "Fish", and "Bird". Try to randomize the order of the options. The options could be "Dog", "Fish", "Cat", and "Bird" or it could be "Fish", "Bird", "Dog", and "Cat" and so on. 
When sent new image as input, respond ONLY with the a json of question and array called options with between 2 and 10 string values without any words like "json" or characters like "\`".`

export async function makeReal(
	editor: Editor,
	showPollFormHandler: (value: any) => void,
	customQuestion?: string
) {
	// we can't make anything real if there's nothing selected
	const selectedShapes = editor.getSelectedShapes()
	if (selectedShapes.length === 0) {
		throw new Error('First select something to make a poll from.')
	}

	// first, we build the prompt that we'll send to openai.
	const prompt = await buildPromptForOpenAi(editor, customQuestion)

	// then, we create an empty response shape. we'll put the response from openai in here, but for
	// now it'll just show a spinner so the user knows we're working on it.
	// const responseShapeId = makeEmptyResponseShape(editor)

	try {
		// If you're using the API key input, we preference the key from there.
		// It's okay if this is undefined—it will just mean that we'll use the
		// one in the .env file instead.
		const apiKeyFromDangerousApiKeyInput = sessionStorage.getItem('OPEN_AI_KEY')

		// make a request to openai. `fetchFromOpenAi` is a next.js server action,
		// so our api key is hidden.
		const openAiResponse: GPT4VCompletionResponse = await fetchFromOpenAi(
			apiKeyFromDangerousApiKeyInput,
			{
				model: 'gpt-4-vision-preview',
				max_tokens: 4096,
				temperature: 0,
				messages: prompt,
			}
		)

		if ('choices' in openAiResponse) {
			const messageContent = openAiResponse.choices[0].message.content
			const parsedContent: { [key: string]: any } = JSON.parse(messageContent) // Removing the ```json```
			showPollFormHandler(parsedContent)
		}
	} catch (e) {
		// if something went wrong, get rid of the unnecessary response shape
		// editor.deleteShape(responseShapeId)
		throw e
	}
}

async function buildPromptForOpenAi(
	editor: Editor,
	customQuestion?: string
): Promise<GPT4VMessage[]> {
	// if the user has selected a previous response from gpt-4, include that too. hopefully gpt-4 will
	// modify it with any other feedback or annotations the user has left.

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
			text: customQuestion || '',
		},
		{
			// send the text of all selected shapes, so that GPT can use it as a reference (if anything is hard to see)
			type: 'text',
			text: getSelectionAsText(editor),
		},
	]

	// combine the user prompt with the system prompt
	return [
		{
			role: 'system',
			content: SYSTEM_PROMPT,
		},
		{ role: 'user', content: userMessages },
	]
}

// function populateResponseShape(
// 	editor: Editor,
// 	responseShapeId: TLShapeId,
// 	openAiResponse: GPT4VCompletionResponse
// ) {
// 	if (openAiResponse.error) {
// 		throw new Error(openAiResponse.error.message)
// 	}

// 	// extract the html from the response
// 	const message = openAiResponse.choices[0].message.content
// 	const start = message.indexOf('<!DOCTYPE html>')
// 	const end = message.indexOf('</html>')
// 	const html = message.slice(start, end + '</html>'.length)

// 	// update the response shape we created earlier with the content
// 	editor.updateShape<ResponseShape>({
// 		id: responseShapeId,
// 		type: 'response',
// 		props: { html },
// 	})

// 	console.log(openAiResponse)
// }

// function makeEmptyResponseShape(editor: Editor) {
// 	const selectionBounds = editor.getSelectionPageBounds()
// 	if (!selectionBounds) throw new Error('No selection bounds')

// 	const newShapeId = createShapeId()
// 	editor.createShape<ResponseShape>({
// 		id: newShapeId,
// 		type: 'response',
// 		x: selectionBounds.maxX + 60,
// 		y: selectionBounds.y,
// 	})

// 	return newShapeId
// }

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
