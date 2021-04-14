import React from 'react';
import { storiesOf } from '@storybook/react';

const MyComponent = () => {
	return <div>Hello world...</div>
}

storiesOf('Graph', module)
.add('Default', () => <MyComponent />)


// Components
// 1. Create a primitive for an edge (SVG)
// 2. Create a primitive for a nodes (ForeignObject + HTML)
// 3. Create a primitive for a marker (SVG)

// 1. Edge component
// Wrapper for path function and some props
// source (x,y) and target (x,y)
// dash prop, either sm, md, lg, xl or [0,8]
// double prop
// tunnel prop
// type: bezier, elbow, elbow-rounded, straight (pass in a function?)
// Fill value can be overridden similar to carbon icons

// 2. Node component
// a. Bullet
//	- Label(?) prop
//  - Orientation prop (see tooltip)
// b. Circle
// 	- Label(?) prop
//  - Description(?) prop
//  - RenderIcon prop
// c. Card
// 	- Title(?) prop
//  - Description(?) prop
//  - Label prop
//  - RenderIcon prop
//  - RenderAction prop

// Homes
// Component lives in relevant repo (React, Angular)
// Styles live in core
// Utility functions (e.g. line drawing) live in core

// Storybook examples (basic)
// — Fixed coordinates network

// Possible codepen examples (3rd party)
// — Dendrogram (d3)
// — Force layout (d3)
// — ElkJS layouts
// - VisX network
// - VisX tree
// - VisX dendogram
// - Grommet diagram
// - React-flow-chart


// Ideas
// - Decide where it makes sense (if at  all) for things like lines, add utilities to core

// Questions
// - Do we create components in vanilla, react, and angular?
// - Does each node component have a prop for ports?
