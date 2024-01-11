import { createContext, useContext } from 'react'

export const QuestionContext = createContext<any>(undefined)

export const useQuestionContext = () => {
	const { questionData, setQuestionData } = useContext(QuestionContext)
	return { questionData, setQuestionData }
}
