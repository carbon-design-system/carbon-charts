import _sanitizeHtml from 'sanitize-html'
export const sanitizeHtml = (html: string, options?: any) => {
	return _sanitizeHtml(html, { ...SANITIZE_HTML_DEFAULT_OPTIONS, ...options })
}

export const SANITIZE_HTML_DEFAULT_OPTIONS = {
	allowedAttributes: {
		'*': [
			'class',
			'id',
			'style',
			'title',
			'aria-label',
			'aria-labelledby',
			'aria-describedby',
			'role',
			'tabindex',
			'lang',
			'dir',
			'contenteditable',
			'name',
			'value',
			'placeholder',
			'disabled',
			'readonly',
			'required',
			'src',
			'alt',
			'width',
			'height',
			'controls',
			'href',
			'target',
			'rel'
		]
	}
}
