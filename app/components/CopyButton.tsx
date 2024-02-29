import { CheckIcon, CopyIcon } from '@100mslive/react-icons'
import { useState } from 'react'

const CopyButton = ({ value }: { value: string }) => {
	const [copied, setCopied] = useState(false)

	const copyText = () => {
		navigator.clipboard.writeText(value)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<button
			title="Copy"
			style={{ padding: '4px', display: 'flex' }}
			disabled={copied}
			onClick={copyText}
		>
			{copied ? <CheckIcon height={16} width={16} /> : <CopyIcon height={16} width={16} />}
		</button>
	)
}
export default CopyButton
