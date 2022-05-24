import React from 'react';
import { storiesOf } from '@storybook/react';

const introStories = storiesOf('Docs|Getting Started', module);

// Loop through the demos for the group
introStories.add('Welcome', () => (
	<div className="container intro">
		<div
			className="welcome__container"
			style={{
				background: 'url(./welcome.png) no-repeat center center fixed',
				backgroundSize: 'cover',
			}}>
			<div className="welcome__content">
				<h2 className="welcome__heading">Carbon Charts</h2>
				<h4 className="welcome__heading welcome__heading--subtitle">
					(React)
				</h4>
				<h5 className="welcome__heading welcome__heading--other">
					Other versions
				</h5>
				<ul>
					<li>
						<a
							href="https://charts.carbondesignsystem.com"
							className="welcome__heading welcome__heading--other">
							vanilla
						</a>
					</li>
					<li>
						<a
							href="https://charts.carbondesignsystem.com/angular"
							className="welcome__heading welcome__heading--other">
							Angular
						</a>
					</li>
					<li>
						<a
							href="https://charts.carbondesignsystem.com/vue"
							className="welcome__heading welcome__heading--other">
							Vue
						</a>
					</li>
					<li>
						<a
							href="https://charts.carbondesignsystem.com/svelte"
							className="welcome__heading welcome__heading--other">
							Svelte
						</a>
					</li>
				</ul>
				<span className="netlify">
					Deploys by{' '}
					<a href="https://netlify.com" target="_blank">
						Netlify
					</a>
				</span>
			</div>
		</div>
	</div>
));
