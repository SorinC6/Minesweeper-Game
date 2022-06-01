import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Cell, CellProps } from './Cell';

export default {
  title: 'Grid/Cell',
  component: Cell,
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const CellClosed = Template.bind({});
CellClosed.args = {
  children: 10,
};

export const CellEmpty = Template.bind({});
CellClosed.args = {
  children: 0,
};

export const CellWithBomb = Template.bind({});
CellWithBomb.args = {
  children: 9,
};

export const CellWithFlag = Template.bind({});
CellWithFlag.args = {
  children: 11,
};

export const CellWeakFlag = Template.bind({});
CellWeakFlag.args = {
  children: 12,
};
