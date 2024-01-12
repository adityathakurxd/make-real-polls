import { ChevronRightIcon } from '@100mslive/react-icons'

export const Pagination = ({
	increment,
	decrement,
	disableIncrement,
	disableDecrement,
}: {
	increment: () => void
	decrement: () => void
	disableIncrement: boolean
	disableDecrement: boolean
}) => {
	return (
		<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
			<div
				onClick={decrement}
				style={{
					opacity: disableDecrement ? '0.3' : '1',
					cursor: disableDecrement ? 'not-allowed' : 'pointer',
				}}
			>
				<ChevronRightIcon style={{ transform: 'rotate(180deg)', color: 'black' }} />
			</div>
			<div
				onClick={increment}
				style={{
					opacity: disableIncrement ? '0.3' : '1',
					cursor: disableIncrement ? 'not-allowed' : 'pointer',
				}}
			>
				<ChevronRightIcon style={{ color: 'black' }} />
			</div>
		</div>
	)
}
