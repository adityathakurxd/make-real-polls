import { MicOffIcon, MicOnIcon, VideoOffIcon, VideoOnIcon, ExitIcon } from '@100mslive/react-icons'
import { useAVToggle, useHMSActions } from '@100mslive/react-sdk'

function Footer() {
	const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } = useAVToggle()
	const hmsActions = useHMSActions()

	return (
		<div className="control-bar">
			<a target="_blank" href="https://www.100ms.live">
				{/* eslint-disable-next-line */}
				<img
					alt="HMS"
					src="https://storage.googleapis.com/100ms-cms-prod/cms/100ms_18a29f69f2/100ms_18a29f69f2.png?updated_at=2023-08-18T06:05:59.858Z"
					height={48}
					width={48}
				/>
			</a>
			<button className={`btn-control ${isLocalAudioEnabled ? '' : 'off'}`} onClick={toggleAudio}>
				{isLocalAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}
			</button>
			<button className={`btn-control ${isLocalVideoEnabled ? '' : 'off'}`} onClick={toggleVideo}>
				{isLocalVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
			</button>
			<button className={`btn-control off`} onClick={() => hmsActions.leave()}>
				<ExitIcon />
			</button>
		</div>
	)
}

export default Footer
