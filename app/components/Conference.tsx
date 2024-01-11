import { selectPeers, useHMSStore } from '@100mslive/react-sdk'
import Peer from '../components/Peer'
import '@tldraw/tldraw/tldraw.css'
import { TldrawLogo } from '../components/TldrawLogo'
import { CreatePollButton } from '../components/CreatePollButton'
import './styles.css'
import { Tldraw } from '@tldraw/tldraw'
import { useYjsStore } from '../useYjsStore'

const HOST_URL = 'wss://demo-yjs-server-production.up.railway.app'

function Conference() {
	const peers = useHMSStore(selectPeers)

	const store = useYjsStore({
		roomId: 'example17',
		hostUrl: HOST_URL,
	})

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
				<Tldraw
					autoFocus
					store={store}
					shareZone={
						<>
							<CreatePollButton />
						</>
					}
				>
					<TldrawLogo />
				</Tldraw>
			</div>
		</div>
	)
}

export default Conference
