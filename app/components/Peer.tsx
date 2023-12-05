import { HMSPeer, useVideo } from '@100mslive/react-sdk'
import React from 'react'

// Define the type for the peer prop
interface PeerProps {
	peer: HMSPeer
}

const Peer: React.FC<PeerProps> = ({ peer }) => {
	const { videoRef } = useVideo({
		trackId: peer.videoTrack,
	})

	return (
		<div className="peer-container">
			<video
				ref={videoRef}
				className={`peer-video ${peer.isLocal ? 'local' : ''}`}
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
