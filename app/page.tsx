'use client'
import { HMSRoomProvider } from '@100mslive/react-sdk'
import Home from './components/Home'

export default function App() {
	return (
		<HMSRoomProvider>
			<Home></Home>
		</HMSRoomProvider>
	)
}
