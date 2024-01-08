import {
	MicOffIcon,
	MicOnIcon,
	VideoOffIcon,
	VideoOnIcon,
	ExitIcon,
} from '@/node_modules/@100mslive/react-icons/dist/index'
import { useAVToggle, useHMSActions } from '@100mslive/react-sdk'

function Footer() {
	const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } = useAVToggle()
	const hmsActions = useHMSActions()

	return (
		<div className="control-bar">
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
