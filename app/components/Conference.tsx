import { selectPeers, useHMSStore } from '@100mslive/react-sdk'
import Peer from '../components/Peer'
import '@tldraw/tldraw/tldraw.css'
import dynamic from 'next/dynamic'
// import { ResponseShapeUtil } from '../ResponseShape/ResponseShape'
import { TldrawLogo } from '../components/TldrawLogo'
import { CreatePollButton } from '../components/CreatePollButton'
import './styles.css'

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

// const shapeUtils = [ResponseShapeUtil]

function Conference() {
	const peers = useHMSStore(selectPeers)

	return (
		<div className="conference-component">
			<div className="conference-section">
				<h2 className="conference-title">Conference</h2>
				<div className="peers-container">
					{peers.map((peer) => (
						<Peer key={peer.id} peer={peer} />
					))}
				</div>
			</div>
			<div className="editor">
				<Tldraw persistenceKey="make-real" shareZone={<CreatePollButton />}>
					<TldrawLogo />
				</Tldraw>
			</div>
		</div>
	)
}

export default Conference
