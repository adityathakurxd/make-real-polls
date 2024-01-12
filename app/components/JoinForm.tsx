'use client'
import { useHMSActions } from '@100mslive/react-sdk'
import { useState, ChangeEvent, FormEvent } from 'react'

// Define a type for your state
type InputValues = {
	name: string
	roomCode: string // Assuming roomCode is optional
}

const JoinForm = () => {
	const hmsActions = useHMSActions()
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
		<form onSubmit={handleSubmit}>
			<h2 style={{ color: 'black' }}>Join Room</h2>
			<div className="input-container">
				<input
					required
					id="name"
					type="text"
					name="name"
					value={inputValues.name}
					onChange={handleInputChange}
					placeholder="Your Name"
				/>
			</div>
			<div className="input-container">
				<input
					required
					id="room-code"
					type="text"
					name="roomCode"
					value={inputValues.roomCode}
					onChange={handleInputChange}
					placeholder="Room Code"
				/>
			</div>
			<button className="btn-primary primary">Join</button>
		</form>
	)
}

export default JoinForm
