import { useEffect, useState } from 'react'

export const PollVotes = ({ poll }: { poll: any }) => {
	const question = poll.questions[0]
	const responses = question?.responses
	const [voteCount, setVoteCount] = useState([0, 0, 0, 0])

	useEffect(() => {
		const newVoteCount = [0, 0, 0, 0]
		// Option index starts from 1
		responses?.forEach((response) => newVoteCount[response.option - 1]++)
		setVoteCount(newVoteCount)
	}, [responses])

	return (
		<div
			style={{ maxWidth: '400px', background: 'black', padding: '1rem', borderRadius: '0.25rem' }}
		>
			{question.text}
			{question.options.map((option, index) => (
				<div key={index}>{voteCountValue}</div>
			))}
		</div>
	)
}
