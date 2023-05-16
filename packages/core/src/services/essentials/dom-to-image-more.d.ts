declare module 'dom-to-image-more' {
	export type DomToImageOptions = {
		bgcolor?: string
		quality?: number
		filter?: (node: HTMLElement) => boolean
	}

	const domToImage: {
		toJpeg: (node: HTMLElement, options?: DomToImageOptions) => Promise<string>
		toPng: (node: HTMLElement, options?: DomToImageOptions) => Promise<string>
	}

	export default domToImage
}
