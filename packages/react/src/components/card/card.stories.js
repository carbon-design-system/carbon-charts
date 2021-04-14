import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from "./card";
import "./_card.scss";

storiesOf('Card', module)
.add('Default', () => <Card title={"Title"} description={"Description"} />)

