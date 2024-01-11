'use client'
import { CrossIcon } from '@100mslive/react-icons'
import { Fragment, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

type BackdropProps = {
	onClose: () => void
}

const Backdrop: React.FC<BackdropProps> = (props) => {
	return <div className={classes.backdrop} onClick={props.onClose}></div>
}

type ModalOverlayProps = {
	children: ReactNode
	onClose: () => void
	title?: string
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, onClose, title = '' }) => {
	return (
		<div className={classes.modal}>
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<p style={{ fontWeight: '600', fontSize: '1.25rem', margin: 0 }}>{title}</p>
				<div onClick={onClose} style={{ cursor: 'pointer' }}>
					<CrossIcon />
				</div>
			</div>
			<div className={classes.content}>{children}</div>
		</div>
	)
}

type ModalProps = {
	title?: string
	onClose: () => void
	children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
	const portalElement = document?.getElementById('overlays')
	if (!portalElement) return null

	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay onClose={onClose} title={title}>
					{children}
				</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	)
}

export default Modal
