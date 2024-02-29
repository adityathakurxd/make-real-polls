import { CopyIcon } from '@100mslive/react-icons'

const CopyInviteButton = () => {
	const copyText = () => {
		const textToCopy = document.getElementById('inviteLink').innerText
		navigator.clipboard.writeText(textToCopy)
	}

	return (
		<button onClick={copyText}>
			<CopyIcon />
		</button>
	)
}
export default CopyInviteButton
