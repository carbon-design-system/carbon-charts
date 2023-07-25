// Takes a JavaScript object and converts to a string to send to StackBlitz (vs. JSON)

type GenericObject = { [key: string]: any }

export function objectToString(obj: GenericObject | any[] | Date, indent: number = 0): string {
	let str = indent === 0 ? 'export default ' : ''
	const padding = ' '.repeat(indent * 2)

	if (Array.isArray(obj)) {
		str += '[\n'

		obj.forEach((item: any, index: number) => {
			str += padding + '  ' + objectToString(item, indent + 1)
			if (index < obj.length - 1) str += ','
			str += '\n'
		})

		str += padding + ']'
	} else if (typeof obj === 'object' && obj !== null) {
		if (obj instanceof Date) {
			str += `'${obj.toISOString()}'`
		} else {
			str += '{\n'

			const keys = Object.keys(obj)
			keys.forEach((key: string, index: number) => {
				const formattedKey = /^[a-z$_][a-z0-9$_]*$/i.test(key) ? key : `'${key}'`
				str += padding + '  ' + formattedKey + ': ' + objectToString(obj[key], indent + 1)
				if (index < keys.length - 1) str += ','
				str += '\n'
			})

			str += padding + '}'
		}
	} else if (typeof obj === 'function') {
		str += obj.toString()
	} else if (typeof obj === 'string') {
		str += "'" + obj + "'"
	} else {
		str += obj
	}

	return str
}
