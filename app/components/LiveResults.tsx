import { selectPolls, useHMSStore } from '@100mslive/react-sdk'
import { PollVotes } from './PollVotes'

export const LiveResults = () => {
	const livePolls = useHMSStore(selectPolls)?.filter((poll) => poll.state === 'started')

	return (
		<div style={{ position: 'fixed', zIndex: '100', bottom: 0, right: 0 }}>
			{livePolls.map((livePoll) => (
				<PollVotes key={livePoll.id} poll={livePoll} />
			))}
		</div>
	)
}
