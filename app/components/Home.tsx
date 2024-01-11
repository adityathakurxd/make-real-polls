'use client'
import JoinForm from './JoinForm'
import { useEffect } from 'react'
import {
	selectIsConnectedToRoom,
	selectRoomState,
	useHMSActions,
	useHMSStore,
	HMSRoomState,
} from '@100mslive/react-sdk'

import { RoomScreen } from './RoomScreen'

export default function Home() {
	const isConnected = useHMSStore(selectIsConnectedToRoom)
	const roomState = useHMSStore(selectRoomState)
	const hmsActions = useHMSActions()

	useEffect(() => {
		window.onunload = () => {
			if (isConnected) {
				hmsActions.leave()
			}
		}
	}, [hmsActions, isConnected])

	return (
		<div className={`App ${isConnected ? 'call' : 'preview'}`}>
			{roomState === HMSRoomState.Disconnected ? <JoinForm /> : null}
			{roomState === HMSRoomState.Connected ? <RoomScreen /> : null}

			{[HMSRoomState.Connecting, HMSRoomState.Disconnecting, HMSRoomState.Reconnecting].includes(
				roomState
			)
				? 'Connecting...'
				: null}
		</div>
	)
}
