// Internal Imports
import { ChartModel } from '../model/model';
import { DOMUtils } from '../services';
import { RenderTypes } from '../interfaces';
import { Tools } from '../tools';

// D3 Imports
import { select } from 'd3-selection';

// import the settings for the css prefix
import settings from 'carbon-components/es/globals/js/settings';

export class Component {
	public type: string;
	public renderType = RenderTypes.HTML;

	public id: string;

	protected parent: any;

	protected configs: any = {};

	protected model: any;
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
			this.setParent(select(this.services.domUtils.getMainContainer()));
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

	getComponentContainer(configs = { withinChartClip: false }) {
		if (this.type) {
			const chartprefix = Tools.getProperty(
				this.model.getOptions(),
				'style',
				'prefix'
			);

			const idSelector = this.id ? `#${this.id}` : '';
			const container = DOMUtils.appendOrSelect(
				this.parent,
				`${
					this.renderType === RenderTypes.SVG ? 'svg' : 'div'
				}${idSelector}.${settings.prefix}--${chartprefix}--${this.type}`
			);

			if (configs.withinChartClip) {
				// get unique chartClipId int this chart from model
				const chartClipId = this.model.get('chartClipId');

				if (chartClipId) {
					const chartClipSelection = select(`#${chartClipId}`);
					const chartClipRectSelection = chartClipSelection.select(
						'rect'
					);

					/*
					 * these checks are needed because of a chrome bug
					 * related to the rendering of the clip path
					 */
					if (
						chartClipRectSelection.size() !== 0 &&
						parseFloat(chartClipRectSelection.attr('height')) > 0
					) {
						container.attr('clip-path', `url(#${chartClipId})`);
					}
				}
			}

			return container.attr('width', '100%').attr('height', '100%');
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
