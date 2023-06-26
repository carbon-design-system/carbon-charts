declare module 'carbon-components' {
	export class Modal {
		static create(node: any): any
	}
}

declare module 'carbon-components/es/globals/js/settings' {
	export default {
		disableAutoInit: boolean,
		prefix: string,
		selectorTabbable: string,
		selectorFocusable: string
	}
}
