import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Counter, CounterProps } from './counter';

export default {
  title: 'Scoreboard/counter',
  component: Counter,
};

const Template: Story<CounterProps> = (args) => <Counter {...args} />;

export const CounterExample = Template.bind({});
CounterExample.args = {
  children: '010',
};
