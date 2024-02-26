import { selectPolls, useHMSStore } from '@100mslive/react-sdk'
import { PollVotes } from './PollVotes'

export const LiveResults = () => {
	const livePolls = useHMSStore(selectPolls)?.filter((poll) => poll.state === 'started')

	if (livePolls?.length < 1) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					padding: '4rem 2rem',
				}}
			>
				<img
					alt="Create poll"
					height={75}
					width={75}
					src="https://storage.googleapis.com/100ms-cms-prod/cms/create_poll_67b25c6048/create_poll_67b25c6048.png?updated_at=2024-01-12T11:18:48.664Z"
				/>
				<p style={{ fontSize: '14px', color: 'gray', fontWeight: '500' }}>
					{'Select content to create a poll'}
				</p>
			</div>
		)
	}

	return (
		<>
			<h3
				style={{
					color: 'black',
					margin: 0,
					padding: '0.5rem',
					background: 'var(--surface_default)',
					alignSelf: 'flex-start',
				}}
			>
				Live poll{livePolls?.length > 1 ? 's' : ''}
			</h3>
			<div
				style={{
					flexGrow: 1,
					overflowY: 'auto',
					position: 'relative',
					paddingRight: '0.75rem',
					marginRight: '-0.75rem',
					width: '100%',
				}}
			>
				<div style={{ flexDirection: 'column', display: 'flex', gap: '0.75rem' }}>
					{livePolls?.map((livePoll) => (
						<PollVotes key={livePoll.id} poll={livePoll} />
					))}
				</div>
			</div>
		</>
	)
}
