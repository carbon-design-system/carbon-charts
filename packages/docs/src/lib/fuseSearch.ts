import Fuse from 'fuse.js'
import searchIndex from '../searchIndex'

const options = {
	keys: [
		{ name: 'title', weight: 0.4 },
		{ name: 'text', weight: 0.4 },
		{ name: 'charts', weight: 0.2 }
	],
	threshold: 0.3
}

const fuse = new Fuse(searchIndex, options)

export default fuse
