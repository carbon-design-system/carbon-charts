// Internal Imports
import { ChartModel } from '../model';
import { DOMUtils } from '../services';
import { Tools } from '../tools';

// D3 Imports
import { select } from 'd3-selection';

// import the settings for the css prefix
import settings from 'carbon-components/es/globals/js/settings';

export class Component {
	public type: string;
	public id: string;

	protected parent: any;

	protected configs: any = {};

	protected model: ChartModel;
	protected services: any;

	constructor(model: ChartModel, services: any, configs?: any) {
		this.model = model;
		this.services = services;

		if (configs) {
			this.configs = configs;
			if (this.configs.id) {
				const chartprefix = Tools.getProperty(
					this.model.getOptions(),
					'style',
					'prefix'
				);
				this.id = `${chartprefix}--${this.configs.id}`;
			}
		}

		// Set parent element to shell SVG if no parent exists for component
		if (!this.parent) {
			this.setParent(select(this.services.domUtils.getMainSVG()));
		}
	}

	init() {}

	render(animate = true) {
		console.error('render() method is not implemented');
	}

	destroy() {}

	// Used to pass down information to the components
	setModel(newObj) {
		this.model = newObj;
	}

	// Used to pass down information to the components
	setServices(newObj) {
		this.services = newObj;
	}

	setParent(parent) {
		const oldParent = this.parent;
		this.parent = parent;

		if (oldParent && oldParent.node() === parent.node()) {
			return;
		}

		if (this.type) {
			const chartprefix = Tools.getProperty(
				this.model.getOptions(),
				'style',
				'prefix'
			);
			this.parent
				.classed(
					`${settings.prefix}--${chartprefix}--${this.type}`,
					true
				)
				.attr('id', this.id);

			if (oldParent) {
				oldParent
					.classed(
						`${settings.prefix}--${chartprefix}--${this.type}`,
						false
					)
					.attr('id', this.id);
			}
		}
	}

	getParent() {
		return this.parent;
	}

	getContainerSVG(configs = { withinChartClip: false }) {
		if (this.type) {
			const chartprefix = Tools.getProperty(
				this.model.getOptions(),
				'style',
				'prefix'
			);

			const idSelector = this.id ? `#${this.id}` : '';
			const svg = DOMUtils.appendOrSelect(
				this.parent,
				`g${idSelector}.${settings.prefix}--${chartprefix}--${this.type}`
			);

			if (configs.withinChartClip) {
				// get unique chartClipId int this chart from model
				const chartClipId = this.model.get('chartClipId');
				if (chartClipId) {
					svg.attr('clip-path', `url(#${chartClipId})`);
				}
			}
			return svg;
		}

		return this.parent;
	}

	/**
	 * graphs used in combo charts share a model with global options but can receive their own local options.
	 * this function retrieves the global options and merges it with any options passed into this
	 * component's config.options object.
	 */
	getOptions() {
		if (this.configs.options) {
			const options = Tools.merge(
				{},
				this.model.getOptions(),
				this.configs.options
			);
			return options;
		}
		return this.model.getOptions();
	}
}
