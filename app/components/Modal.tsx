'use client'
import { Fragment, ReactNode, useEffect, useState } from 'react'
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
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	)
}

type ModalProps = {
	onClose: () => void
	children: ReactNode
}

const Modal: React.FC<ModalProps> = (props) => {
	const [isBrowser, setIsBrowser] = useState(false)

	useEffect(() => {
		setIsBrowser(true)
	}, [])
	const portalElement = isBrowser ? document.getElementById('overlays') : null
	if (!portalElement) return null

	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
			{ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
		</Fragment>
	)
}

export default Modal
