'use client'

import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { MakeRealButton } from './components/MakeRealButton'
import { TldrawLogo } from './components/TldrawLogo'
import { ResponseShapeUtil } from './ResponseShape/ResponseShape'
import { RiskyButCoolAPIKeyInput } from './components/RiskyButCoolAPIKeyInput'
import { HMSRoomProvider } from '@100mslive/react-sdk'

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

const shapeUtils = [ResponseShapeUtil]

export default function App() {
	return (
		<HMSRoomProvider>
			<div className="editor">
				<Tldraw persistenceKey="make-real" shareZone={<MakeRealButton />} shapeUtils={shapeUtils}>
					<TldrawLogo />
					{/* <RiskyButCoolAPIKeyInput /> */}
				</Tldraw>
			</div>
		</HMSRoomProvider>
	)
}
