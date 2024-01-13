import { HMSPoll, selectLocalPeerID, useHMSActions, useHMSStore } from '@100mslive/react-sdk'
import { useEffect, useState } from 'react'
import { ProgressBar } from './ProgressBar'

export const PollVotes = ({ poll }: { poll: HMSPoll }) => {
	const hmsActions = useHMSActions()
	const question = poll.questions?.[0]
	const responses = question?.responses
	const [voteCount, setVoteCount] = useState([0, 0, 0, 0])
	const totalCount = voteCount.reduce((sum, value) => (sum += value), 0)
	const localPeerId = useHMSStore(selectLocalPeerID)
	const showEndPollButton = localPeerId === poll.startedBy

	useEffect(() => {
		const newVoteCount = [0, 0, 0, 0]
		// Option index starts from 1
		responses?.forEach((response) => newVoteCount[response.option - 1]++)
		setVoteCount(newVoteCount)
	}, [responses])

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
					<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
						<p style={{ color: 'black', fontWeight: '400', fontSize: '14px', margin: 0 }}>
							{option.text}
						</p>
						<p style={{ color: 'black', fontWeight: '400', fontSize: '14px', margin: 0 }}>
							{voteCount[index]} vote{voteCount[index] === 1 ? '' : 's'}
						</p>
					</div>
					<ProgressBar percentage={totalCount ? voteCount[index] / totalCount : 0} />
				</div>
			))}
			{showEndPollButton ? (
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
			) : null}
		</div>
	)
}
