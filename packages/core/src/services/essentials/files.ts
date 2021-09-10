// Internal Imports
import { Service } from '../service';

export class Files extends Service {
	constructor(model: any, services: any) {
		super(model, services);
	}

	downloadCSV(content, filename, mimeType) {
		var anchor = document.createElement('a');
		mimeType = 'text/csv;encoding:utf-8';

		if (navigator.msSaveBlob) {
			// Internet Explorer 10
			navigator.msSaveBlob(
				new Blob([content], {
					type: mimeType,
				}),
				filename
			);
		} else if (URL && 'download' in anchor) {
			// HTML5
			const href = URL.createObjectURL(
				new Blob([content], {
					type: mimeType,
				})
			);
			anchor.href = href;
			anchor.setAttribute('download', filename);

			// Add anchor to body
			document.body.appendChild(anchor);

			// Click anchor
			anchor.click();

			// Remove anchor from body
			document.body.removeChild(anchor);
			URL.revokeObjectURL(href);
		} else {
			location.href = `data:application/octet-stream,${encodeURIComponent(
				content
			)}`;
		}
	}

	downloadImage(uri, name) {
		const link = document.createElement('a');
		link.download = name;
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}
