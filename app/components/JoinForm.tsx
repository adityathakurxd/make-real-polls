'use client'
import { ArrowRightIcon, Svg100MsLogoIcon } from '@100mslive/react-icons'
import { useHMSActions } from '@100mslive/react-sdk'
import Image from 'next/image'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// Define a type for your state
type InputValues = {
	name: string
	roomCode: string // Assuming roomCode is optional
}

const JoinForm = () => {
	const [activeTabRole, setActiveTabRole] = useState('teacher')
	const hmsActions = useHMSActions()

	const handleTabClick = (tab) => {
		setActiveTabRole(tab)
	}

	const [inputValues, setInputValues] = useState<InputValues>({
		name: '',
		roomCode: '',
	})

	// Type the event parameter
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValues((prevValues) => ({
			...prevValues,
			[e.target.name]: e.target.value,
		}))
	}

	// Type the event parameter
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const { name: userName = '', roomCode = '' } = inputValues

		try {
			const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })
			await hmsActions.join({ userName, authToken })
		} catch (e) {
			console.error(e)
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

				<form onSubmit={handleSubmit}>
					<div className="input-container">
						<div className="input-label">Your Name</div>
						<input
							required
							id="name"
							type="text"
							name="name"
							value={inputValues.name}
							onChange={handleInputChange}
							placeholder="Name"
						/>
					</div>
					<div className="input-container">
						<div className="input-label">Join as</div>

						<div className="tabs-container">
							<div className="tab-item">
								<button
									onClick={() => handleTabClick('teacher')}
									className={activeTabRole === 'teacher' ? 'active-tab' : 'disabled-tab'}
								>
									Teacher
								</button>
							</div>
							<div className="tab-item">
								<button
									onClick={() => handleTabClick('student')}
									className={activeTabRole === 'student' ? 'active-tab' : 'disabled-tab'}
								>
									Student
								</button>
							</div>
						</div>
					</div>
					<button className="btn-primary primary">
						Join Room{' '}
						<ArrowRightIcon style={{ height: '15px', width: '15px', paddingLeft: '5px' }} />
					</button>
				</form>
				<div className="bottom-banner">
					<div className="bottom-room-info">PUBLIC ROOM</div>
					<div className="bottom-notif body-regular-text ">There might be others in the room</div>
				</div>
			</div>
			<div className="input-graphic">
				<Image alt="" src="/images/pollsAI.png" width={500} height={500} />
			</div>
		</>
	)
}

export default JoinForm
