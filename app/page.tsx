'use client'
import { HMSRoomProvider } from '@100mslive/react-sdk'
import { Analytics } from '@vercel/analytics/react'
import Home from './components/Home'

export default function App() {
	return (
		<HMSRoomProvider>
			<Home />
			<Analytics />
		</HMSRoomProvider>
	)
}
