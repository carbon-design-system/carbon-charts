import React from 'react';
import { storiesOf } from '@storybook/react';
import Edge from './edge';
import './_edge.scss';

const linkSource = { x: 0, y:0 };
const linkTarget = { x: 200, y:0 };

storiesOf('Edge', module).add('Default', () => (
	<svg height="800" width="800">
      <g transform="translate(16,16)">
        <Edge source={linkSource} target={linkTarget} />
      </g>
    </svg>
));
