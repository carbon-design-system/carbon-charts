import DOMPurify from 'dompurify'

export const sanitizeHtml = (html: string) => {
	return DOMPurify.sanitize(html, {
		USE_PROFILES: {
			html: true,
			svg: true,
			svgFilters: true
		}
	})
}

// This is a more restrictive version of sanitizeHtml that focuses on SVGs
export const sanitizeSVG = (svgContent: string) => {
	return DOMPurify.sanitize(svgContent, {
		NAMESPACE: 'http://www.w3.org/2000/svg',
		USE_PROFILES: {
			html: true,
			svg: true,
			svgFilters: true
		}
	})
}

// This is a more restrictive version of sanitizeHtml that only allows text
export const sanitizeText = (html: string) => {
	return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] })
}
