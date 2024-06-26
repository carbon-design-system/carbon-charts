import { getVanillaProject } from './vanilla'
import { getSvelteProject } from './svelte'
import { getReactProject } from './react'
import { getVueProject } from './vue'
import { getAngularProject } from './angular'
import { getHtmlProject } from './html'

export const getProject = {
	vanilla: getVanillaProject,
	svelte: getSvelteProject,
	react: getReactProject,
	vue: getVueProject,
	angular: getAngularProject,
	html: getHtmlProject
}
