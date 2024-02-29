import { selectPeers, useHMSStore } from '@100mslive/react-sdk'
import Peer from '../components/Peer'
import '@tldraw/tldraw/tldraw.css'
import { TldrawLogo } from '../components/TldrawLogo'
import { CreatePollButton } from '../components/CreatePollButton'
import './styles.css'
import { Tldraw, coreShapes } from '@tldraw/tldraw'
import { useYjsStore } from '../useYjsStore'
import { useState } from 'react'
import { ChevronRightIcon } from '@/node_modules/@100mslive/react-icons/dist/index'
import { Pagination } from './Pagination'
import { LiveResults } from './LiveResults'
import Footer from './Footer'
import CopyInviteButton from './CopyInviteButton'

const HOST_URL = 'wss://demo-yjs-server-production.up.railway.app'

function Conference() {
	const peers = useHMSStore(selectPeers)
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
					<div className="invite-text">INVITE</div>
					<div className="invite-link body-regular-text" id="inviteLink">
						make-real-polls.vercel.app/?room={roomCode}
					</div>
					<div className="invite-link body-regular-text">
						<CopyInviteButton />
					</div>
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
