'use client'
import { HMSPoll, selectLocalPeerID, useHMSActions, useHMSStore } from '@100mslive/react-sdk'
import { useEffect, useState } from 'react'
import { ProgressBar } from './ProgressBar'
import { toast } from 'react-toastify'

export const PollVotes = ({ poll }: { poll: HMSPoll }) => {
	const hmsActions = useHMSActions()
	const question = poll.questions?.[0]
	const responses = question?.responses
	const [voteCount, setVoteCount] = useState<number[]>([])
	const totalCount = voteCount.reduce((sum, value) => (sum += value), 0)
	const localPeerId = useHMSStore(selectLocalPeerID)
	const isPollAuthor = localPeerId === poll.startedBy
	const hasVoted = question?.responses?.some((response) => response.peer.peerid === localPeerId)

	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | undefined>()
	const [loading, setLoading] = useState(false)

	function handleChange(event: any) {
		setSelectedOptionIndex(event.target.value)
	}

	useEffect(() => {
		const newVoteCount = question.options.map(() => 0)
		console.log('Initial Vote Count:', newVoteCount)
		console.log('Initial Responses:', responses)
		console.log('Question Options:', question.options)

		responses?.forEach((response) => {
			const count = newVoteCount[response.option - 1] ?? 0
			newVoteCount[response.option - 1] = count + 1
		})

		console.log('Updated Vote Count:', newVoteCount)
		console.log('Question Options:', question.options)
		setVoteCount(newVoteCount)
	}, [responses, question])

	return (
		<div
			style={{
				maxWidth: '400px',
				padding: '1rem',
				borderRadius: '0.25rem',
				paddingTop: '0',
				border: '1px solid grey',
			}}
		>
			<p style={{ fontWeight: '600', color: 'black' }}>{question?.text}</p>
			{question?.options?.map((option, index) => (
				<div key={index} style={{ marginBottom: '10px' }}>
					<div style={{ display: 'flex', gap: '5px', marginBottom: '4px' }}>
						{!isPollAuthor && (
							<input
								style={{ cursor: 'pointer' }}
								type="radio"
								value={index}
								checked={Number(selectedOptionIndex) === index}
								onChange={handleChange}
								id={'' + index}
							/>
						)}
						<p style={{ color: 'black', fontWeight: '400', fontSize: '14px', margin: 0 }}>
							{option.text}
						</p>
						<p
							style={{
								color: 'black',
								fontWeight: '400',
								fontSize: '14px',
								margin: 0,
								marginLeft: 'auto',
							}}
						>
							{voteCount[index]} vote{voteCount[index] === 1 ? '' : 's'}
						</p>
					</div>
					<ProgressBar percentage={totalCount ? voteCount[index] / totalCount : 0} />
				</div>
			))}
			{isPollAuthor ? (
				<button
					style={{
						width: '100%',
						textAlign: 'center',
						background: 'var(--error_default)',
						display: 'block',
						padding: '0.75rem',
						marginTop: '18px',
					}}
					onClick={() => hmsActions.interactivityCenter.stopPoll(poll.id)}
				>
					End poll
				</button>
			) : (
				<button
					style={{
						width: '100%',
						textAlign: 'center',
						background: 'var(--primary_default)',
						color: 'white',
						display: 'block',
						padding: '0.75rem',
						marginTop: '18px',
					}}
					disabled={hasVoted}
					onClick={async () => {
						try {
							await hmsActions.interactivityCenter
								.addResponsesToPoll(poll.id, [
									{
										questionIndex: poll.questions[0].index,
										option: Number(selectedOptionIndex + 1),
									},
								])
								.then(() => toast(`Your vote has been submitted for "${question.text}`))
						} catch (err) {
							console.log(err.message)
							toast.error('Failed to submit vote. Please try again or reach out to the team.')
						}
					}}
				>
					Submit
				</button>
			)}
		</div>
	)
}
