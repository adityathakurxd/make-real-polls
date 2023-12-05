'use client'

import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { MakeRealButton } from './components/MakeRealButton'
import { TldrawLogo } from './components/TldrawLogo'
import { ResponseShapeUtil } from './ResponseShape/ResponseShape'
import {
	HMSRoomProvider,
	selectIsConnectedToRoom,
	useHMSActions,
	useHMSStore,
} from '@100mslive/react-sdk'
import JoinForm from './components/JoinForm'
import { useEffect } from 'react'
import Conference from './conference/page'
import Footer from './components/Footer'
import Home from './components/Home'

// const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
// 	ssr: false,
// })

// const shapeUtils = [ResponseShapeUtil]

export default function App() {
	return (
		<HMSRoomProvider>
			<Home></Home>
		</HMSRoomProvider>
	)
}

{
	/* <div className="editor">
				<Tldraw persistenceKey="make-real" shareZone={<MakeRealButton />} shapeUtils={shapeUtils}>
					<TldrawLogo />
					
				</Tldraw>
			</div> */
}
