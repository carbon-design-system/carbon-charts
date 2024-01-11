declare module '@carbon/colors' {
	interface Color {
		[key: number]: string
	}

	export const colors: {
		black: Color
		blue: Color
		coolGray: Color
		cyan: Color
		gray: Color
		green: Color
		magenta: Color
		orange: Color
		purple: Color
		red: Color
		teal: Color
		warmGray: Color
		white: Color
		yellow: Color
	}
}
