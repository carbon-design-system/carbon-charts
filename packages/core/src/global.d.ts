interface Document {
	webkitFullscreenElement?: Element
	mozFullScreenElement?: Element
	msFullscreenElement?: Element
  webkitFullscreenEnabled?: boolean
  mozFullScreenEnabled?: boolean
  msFullscreenEnabled?: boolean
	webkitExitFullscreen?: () => void
	mozCancelFullScreen?: () => void
	msExitFullscreen?: () => void
}

interface HTMLElement {
	webkitRequestFullscreen?: () => void
	mozRequestFullScreen?: () => void
	msRequestFullscreen?: () => void
}

interface Navigator {
	msSaveBlob?: any
}