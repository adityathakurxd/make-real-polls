'use client'
import { ArrowRightIcon, RefreshIcon, Svg100MsLogoIcon } from '@100mslive/react-icons'
import { useHMSActions } from '@100mslive/react-sdk'
import { useState, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { ROLES } from './constants'
import { RiskyButCoolAPIKeyInput } from './RiskyButCoolAPIKeyInput'

const JoinForm = () => {
	const [activeTabRole, setActiveTabRole] = useState(ROLES.TEACHER)
	const hmsActions = useHMSActions()

	const searchParams = useSearchParams()
	const roomCodeParam = searchParams.get('room') || ''
	const [loading, setLoading] = useState(false)

	const [name, setName] = useState<string>('')

	// Type the event parameter
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		if (roomCodeParam) {
			try {
				localStorage.setItem('roomCode', roomCodeParam)
				const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode: roomCodeParam })
				await hmsActions.join({ userName: name, authToken })
			} catch (e) {
				alert('Room Code might be invalid or expired. Please try again.')
			}
		} else {
			try {
				const response = await fetch('/api/create', {
					method: 'GET',
				})

				const hmsRoomsAPIResponse = await response.json()

				if (hmsRoomsAPIResponse) {
					const roomId = hmsRoomsAPIResponse.body.id

					const res = await fetch('/api/create', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ roomId }),
					})

					const hmsRoomCodesAPIResponse = await res.json()
					const data = hmsRoomCodesAPIResponse.body.data

					if (data.length >= 2) {
						const roomCodeForStudent = data[0].code
						const roomCodeForTeacher = data[1].code

						let authToken = ''
						if (activeTabRole === ROLES.TEACHER) {
							authToken = await hmsActions.getAuthTokenByRoomCode({
								roomCode: roomCodeForTeacher,
							})
							localStorage.setItem('roomCode', roomCodeForTeacher)
						} else {
							authToken = await hmsActions.getAuthTokenByRoomCode({
								roomCode: roomCodeForStudent,
							})
						}

						await hmsActions.join({ userName: name, authToken })
					}
				} else {
					setLoading(false)
					alert('Failed to create a new room')
				}
			} catch (e) {
				setLoading(false)
				alert('Failed to join room')
			}
		}
	}

	return (
		<>
			<div className="input-panel">
				<Svg100MsLogoIcon style={{ height: '150px', width: '150px' }} />
				<div>
					<h4 style={{ margin: '0px' }}>
						Generate Polls with
						<br /> AI in seconds
					</h4>
					<p className="body-regular-text">
						Write, draw or add an image on the whiteboard,
						<br />
						click on create poll. That’s it.
					</p>
				</div>
				{roomCodeParam ? (
					<div className="bottom-banner">
						<div className="bottom-notif body-regular-text">{"You've been invited!"}</div>
					</div>
				) : null}
				<form onSubmit={handleSubmit}>
					<div className="input-container">
						<div className="input-label">Your Name</div>
						<input
							required
							id="name"
							type="text"
							name="name"
							placeholder="Name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<RiskyButCoolAPIKeyInput />

					{roomCodeParam ? null : (
						<div className="input-container">
							<div className="input-label">Join as</div>

							<div className="tabs-container">
								{Object.values(ROLES).map((role) => (
									<div className="tab-item" key={role}>
										<button
											type="button"
											onClick={() => setActiveTabRole(role)}
											style={{ textTransform: 'capitalize' }}
											className={activeTabRole === role ? 'active-tab' : 'disabled-tab'}
										>
											{role}
										</button>
									</div>
								))}
							</div>
						</div>
					)}

					<button type="submit" className="btn-primary primary" disabled={loading}>
						{loading ? (
							<RefreshIcon style={{ animation: 'spin 2s linear infinite' }} />
						) : (
							<>
								{roomCodeParam ? 'Accept Invite' : 'Join Room'}
								<ArrowRightIcon height={20} width={20} style={{ marginLeft: '4px' }} />
							</>
						)}
					</button>
				</form>

				<div className="responsive-banner">
					<div className="responsive-banner-info">PLEASE VIEW IN A DESKTOP</div>
				</div>
			</div>

			<div className="input-graphic">
				<img alt="Generate Polls with AI" src="/images/pollsAI.png" width={600} />
			</div>
		</>
	)
}

export default JoinForm
