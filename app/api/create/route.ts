import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
	try {
		const response = await fetch('https://api.100ms.live/v2/rooms', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.MANAGEMENT_TOKEN}`,
			},
			body: JSON.stringify({
				name: 'new-room-axa',
				description: 'This is a sample description for the room',
				template_id: '65a4de78cd666ed1654e1f76', // Replace with your actual template ID
			}),
		})

		if (response.ok) {
			const body = await response.json()
			return NextResponse.json({ body }, { status: 200 })
		} 

		return NextResponse.json({ message: 'Failed to create room' }, { status: 401 })
		
	} catch (error) {
		console.error('Error creating room:', error)
		return NextResponse.json({ message: 'Internal Server error' }, { status: 500 })
	}
}
