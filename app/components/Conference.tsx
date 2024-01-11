import { selectPeers, useHMSStore } from '@100mslive/react-sdk'
import Peer from '../components/Peer'
import '@tldraw/tldraw/tldraw.css'
import dynamic from 'next/dynamic'

import { TldrawLogo } from '../components/TldrawLogo'
import { CreatePollButton } from '../components/CreatePollButton'
import './styles.css'
import { Tldraw, track, useEditor } from '@tldraw/tldraw'
import { useYjsStore } from '../useYjsStore'

const HOST_URL = 'wss://demo-yjs-server-production.up.railway.app'

// const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
// 	ssr: false,
// })

// const shapeUtils = [ResponseShapeUtil]

function Conference() {
	const peers = useHMSStore(selectPeers)

	const store = useYjsStore({
		roomId: 'example17',
		hostUrl: HOST_URL,
	})

	const NameEditor = track(() => {
		const editor = useEditor()

		const { color, name } = editor.user

		return (
			<div style={{ pointerEvents: 'all', display: 'flex' }}>
				<input
					type="color"
					value={color}
					onChange={(e) => {
						editor.user.updateUserPreferences({
							color: e.currentTarget.value,
						})
					}}
				/>
				<input
				type="text"
					value={name}
					onChange={(e) => {
						editor.user.updateUserPreferences({
							name: e.currentTarget.value,
						})
					}}
				/>
			</div>
		)
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
					// persistenceKey="make-real"
					shareZone={
						<>
							<NameEditor />
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
