declare module 'carbon-components' {
	export interface ModalOptions {
		selectorInit: string
		selectorModalClose: string
		selectorPrimaryFocus: string
		selectorsFloatingMenus: string[]
		selectorModalContainer: string
		classVisible: string
		classBody: string
		attribInitTarget: string
		initEventNames: string[]
		eventBeforeShown: string
		eventAfterShown: string
		eventBeforeHidden: string
		eventAfterHidden: string
	}

	interface Handle {
		release: () => null
	}

	type Component = any

	export class Modal {
		// carbon-components Modal class
		constructor(element: HTMLDivElement, options?: Partial<ModalOptions>)
		element: HTMLDivElement // implied
		previouslyFocusedNode: Element // implied
		_handleFocusinListener?: Handle
		_handleKeydownListener: Handle
		createdByLauncher(evt: Event): void
		shouldStateBeChanged(state: string): boolean
		_changeState(state: string, detail: object, callback: () => void): void // overrides mixin EventedState
		_hookCloseActions(): void
		_handleFocusin: (evt: FocusEvent) => void
		static components: WeakMap<HTMLDivElement, Modal>
		static get options(): ModalOptions

		// mixin CreateComponent
		children: Component[]
		static create(node: HTMLDivElement): Modal
		release(): null

		// mixin InitComponentByLauncher
		static forLazyInit: boolean
		init(target: Document, options: ModalOptions): void

		// mixin EventedShowHideState
		show(evtOrElem?, callback?): void
		hide(evtOrElem?, callback?): void

		// mixin EventedState
		_changeState(): void // overload
		changeState(...args): void

		// mixin Handles
		handles: Set<Handle> // mixin Handles
		manage(handle: Handle): Handle
		unmanage(handle: Handle): Handle
		// release - handles vs. release in CreateComponent mixin which is for children
	}
}
