import React from 'react'
import { HMSPeer, useVideo, selectVideoTrackByID, useHMSStore } from '@100mslive/react-sdk'
import { PersonIcon } from '@100mslive/react-icons'

// Define the type for the peer prop
interface PeerProps {
	peer: HMSPeer
}

const Peer: React.FC<PeerProps> = ({ peer }) => {
	const { videoRef } = useVideo({
		trackId: peer.videoTrack,
	})

	const videoTrackId = peer.videoTrack
	const track = useHMSStore(selectVideoTrackByID(videoTrackId))
	const isVideoEnabled = !!track?.enabled

	return (
		<div className="peer-container">
			<div className="tile tile-cover">
				<PersonIcon height={32} width={32} />
			</div>
			<video
				ref={videoRef}
				className={`tile ${peer.isLocal ? 'local' : ''} ${isVideoEnabled ? '' : 'muted-video'}`}
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
