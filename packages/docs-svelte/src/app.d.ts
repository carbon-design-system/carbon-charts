// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface ChartTypes {
		vanilla: string
		svelte: string
		react: string
		vue: string
		angular: string
	}

	interface Example {
		name: string
		data: ChartTabularData
		options: ChartOptions
	}

	type Framework = 'vanilla' | 'svelte' | 'react' | 'vue' | 'angular' | 'html'
}

export {}
