declare module '@carbon/icons/es/*' {
	interface CarbonIcon {
		elem: string
		attrs: {
			xmlns: string
			viewBox: string
			fill: string
			width: number
			height: number
		}
		content: {
			elem: string
			attrs: {
				d: string
			}
		}[]
		name: string
		size: number
	}

	const icon: CarbonIcon
	export default icon
}
