export enum HMSPollQuestionType {
	SINGLE_CHOICE = 'single-choice',
	MULTIPLE_CHOICE = 'multiple-choice',
	SHORT_ANSWER = 'short-answer',
	LONG_ANSWER = 'long-answer',
}

export type QuestionData = {
	title: string
	options: string[]
}
