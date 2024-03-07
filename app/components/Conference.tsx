import { selectPeerCount, selectPeers, useHMSStore } from '@100mslive/react-sdk'
import Peer from '../components/Peer'
import '@tldraw/tldraw/tldraw.css'
import { TldrawLogo } from '../components/TldrawLogo'
import { CreatePollButton } from '../components/CreatePollButton'
import './styles.css'
import { Tldraw } from '@tldraw/tldraw'
import { useYjsStore } from '../useYjsStore'
import { useState } from 'react'
import { Pagination } from './Pagination'
import { LiveResults } from './LiveResults'
import Footer from './Footer'
import CopyButton from './CopyButton'
import { PeopleIcon } from '@100mslive/react-icons'
const HOST_URL = 'wss://demo-yjs-server-production.up.railway.app'

function Conference() {
	const peers = useHMSStore(selectPeers)
	const peerCount = useHMSStore(selectPeerCount)
	const roomCode = localStorage.getItem('roomCode') ?? ''

	const store = useYjsStore({
		roomId: roomCode,
		hostUrl: HOST_URL,
	})

	const [peerIndex, setPeerIndex] = useState(0)

	return (
		<div className="conference-component">
			<div className="conference-section">
				<div className="peers-container">
					<div className="peer-count-container">
						<PeopleIcon />
						<p className='peer-count-text'> {peerCount}</p>
					</div>
					{peers?.[peerIndex]?.videoTrack ? <Peer peer={peers[peerIndex]} /> : null}
					{peers?.[peerIndex + 1]?.videoTrack ? <Peer peer={peers[peerIndex + 1]} /> : null}

					{peers.length > 2 ? (
						<Pagination
							increment={() =>
								setPeerIndex(Math.min(Number((peers.length + 1) / 2), peerIndex + 2))
							}
							decrement={() => setPeerIndex(Math.max(0, peerIndex - 2))}
							disableDecrement={peerIndex === 0}
							disableIncrement={peerIndex * 2 >= peers.length}
						/>
					) : null}
				</div>
				<LiveResults />
				<div className="invite-banner">
					<div className="invite-text">COPY INVITE LINK</div>
					<CopyButton value={`make-real-polls.vercel.app/?room=${roomCode}`} />
				</div>
				<Footer />
			</div>
			<div className="editor">
				<Tldraw autoFocus store={store} shareZone={<CreatePollButton />}>
					<TldrawLogo />
				</Tldraw>
			</div>
		</div>
	)
}

export default Conference
