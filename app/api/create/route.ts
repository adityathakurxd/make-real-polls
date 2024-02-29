import { randomUUID } from 'crypto';
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
				name: `polls-ai-${randomUUID()}`,
				description: 'This is a sample description for the room',
				template_id: process.env.TEMPLATE_ID, 
			}),
		})

		if (response.ok) {
			const body = await response.json()
			return NextResponse.json({ body }, { status: 200 })
		} else{
			return NextResponse.json({ message: 'Failed to create room' }, { status: 401 });
		}

		
		
	} catch (error) {
		console.error('Error creating room:', error)
		return NextResponse.json({ message: 'Internal Server error' }, { status: 500 })
	}
}

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const { roomId } = await req.json()
		console.log(roomId)
		const response = await fetch('https://api.100ms.live/v2/room-codes/room/'+roomId, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.MANAGEMENT_TOKEN}`,
			},
		})

		if (response.ok) {
			const body = await response.json()
			return NextResponse.json({ body }, { status: 200 })
		} else{
			return NextResponse.json({ message: 'Failed to create room codes' }, { status: 401 });
		}

		
		
	} catch (error) {
		console.error('Error creating room codes:', error)
		return NextResponse.json({ message: 'Internal Server error' }, { status: 500 })
	}
}