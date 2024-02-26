import { MicOffIcon, MicOnIcon, VideoOffIcon, VideoOnIcon, ExitIcon } from '@100mslive/react-icons'
import { useAVToggle, useHMSActions } from '@100mslive/react-sdk'

function Footer() {
	const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } = useAVToggle()
	const hmsActions = useHMSActions()

	return (
		<div className="control-bar">
			<a target="_blank" href="https://www.100ms.live">
				<img
					alt="100ms Logo"
					src="https://storage.googleapis.com/100ms-cms-prod/cms/100ms_18a29f69f2/100ms_18a29f69f2.png?updated_at=2023-08-18T06:05:59.858Z"
					height={48}
					width={48}
					style={{ position: 'relative', bottom: 2 }}
				/>
			</a>
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				<button className="btn-control secondary" onClick={toggleAudio}>
					{isLocalAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}
				</button>
				<button className="btn-control secondary" onClick={toggleVideo}>
					{isLocalVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
				</button>
				<button
					className="btn-control"
					style={{
						backgroundColor: 'var(--error_default)',
						color: 'white',
						border: 'none',
						width: '6rem',
					}}
					onClick={() => hmsActions.leave()}
				>
					<ExitIcon
						style={{
							transform: 'rotate(180deg)',
							marginRight: '0.5rem',
						}}
					/>
					<p>Leave</p>
				</button>
			</div>
		</div>
	)
}

export default Footer
