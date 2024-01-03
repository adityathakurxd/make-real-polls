import { PersonIcon } from '@/node_modules/@100mslive/react-icons/dist/index'
import { HMSPeer, useVideo, useAVToggle } from '@100mslive/react-sdk'
import React from 'react'

// Define the type for the peer prop
interface PeerProps {
	peer: HMSPeer
}

const Peer: React.FC<PeerProps> = ({ peer }) => {
	const { videoRef } = useVideo({
		trackId: peer.videoTrack,
	})

	const { isLocalVideoEnabled } = useAVToggle()

	return (
		<div className="peer-container">
			<div className="tile tile-cover">
				<PersonIcon height={32} width={32} />
			</div>
			<video
				ref={videoRef}
				className={`tile ${peer.isLocal ? 'local' : ''} ${
					isLocalVideoEnabled ? '' : 'muted-video'
				}`}
				autoPlay
				muted
				playsInline
			/>
			<div className="peer-name">
				{peer.name} {peer.isLocal ? '(You)' : ''}
			</div>
		</div>
	)
}

export default Peer
