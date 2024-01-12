export const ProgressBar = ({ percentage = 0 }: { percentage: number }) => {
	return (
		<div
			style={{
				height: '0.5rem',
				borderRadius: '2rem',
				overflow: 'clip',
				width: '100%',
				background: 'var(--surface_bright)',
			}}
		>
			<div className="primary" style={{ width: `${percentage * 100}%`, height: '100%' }} />
		</div>
	)
}
