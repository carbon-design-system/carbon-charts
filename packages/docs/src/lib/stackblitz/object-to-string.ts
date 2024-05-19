type GenericObject = { [key: string]: any }

export function objectToString(
	obj: GenericObject | any[] | Date,
	indent: number = 0,
	isTopLevel: boolean = true
): string {
	let str = isTopLevel ? 'export default ' : ''
	const padding = ' '.repeat(indent * 2)

	if (Array.isArray(obj)) {
		str += '[\n'

		obj.forEach((item: any[] | GenericObject | Date, index: number) => {
			str += padding + '  ' + objectToString(item, indent + 1, false)
			if (index < obj.length - 1) str += ','
			str += '\n'
		})

		str += padding + ']'
	} else if (typeof obj === 'object' && obj !== null) {
		if (obj instanceof Date) {
			str += `new Date(${obj.getFullYear()}, ${obj.getMonth()}, ${obj.getDate()})`
		} else {
			str += '{\n'

			const keys = Object.keys(obj)
			keys.forEach((key: string, index: number) => {
				const formattedKey = /^[a-z$_][a-z0-9$_]*$/i.test(key) ? key : `'${key}'`
				str += padding + '  ' + formattedKey + ': '
				if (typeof obj[key] === 'function') {
					str += obj[key].toString().replace(/\\(['"`])/g, '$1') // Unescape ' , " and `
				} else if (key === 'content' && typeof obj[key] === 'string') {
					str += '`' + obj[key].replace(/`/g, '\\`') + '`' // If it's SVG content, escape it
				} else {
					str += objectToString(obj[key], indent + 1, false)
				}
				if (index < keys.length - 1) str += ','
				str += '\n'
			})

			str += padding + '}'
		}
	} else if (typeof obj === 'string') {
		const objStr = obj as string
		str += `'${objStr.replace(/(['"`])/g, '\\$1')}'` // Escape ' , " and `
	} else {
		str += obj
	}

	return str
}
