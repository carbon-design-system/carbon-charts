type GenericObject = { [key: string]: any }

export function objectToString(obj: GenericObject | any[] | Date, indent: number = 0, isTopLevel: boolean = true): string {
    let str = indent === 0 ? 'export default ' : ''
    const padding = ' '.repeat(indent * 2)
    let importStatement = '';

    if (Array.isArray(obj)) {
        str += '[\n'

        obj.forEach((item: any, index: number) => {
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
                if (typeof obj[key] === 'function' && obj[key].name === 'timeFormat') {
                    importStatement = 'import { timeFormat } from \'d3\'\n';
                    str += padding + '  ' + formattedKey + ': ' + obj[key].name + '(' + obj[key].arguments + ')';
                } else {
                    str += padding + '  ' + formattedKey + ': ' + objectToString(obj[key], indent + 1, false)
                }
                if (index < keys.length - 1) str += ','
                str += '\n'
            })

            str += padding + '}'
        }
    } else if (typeof obj === 'string') {
        str += `'${obj}'`
    } else {
        str += obj
    }

    if (isTopLevel) {
        str = importStatement + str;
    }

    return str
}
