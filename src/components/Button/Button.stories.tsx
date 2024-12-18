import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' }, 
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary', 
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary', 
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'large', 
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'small', 
  },
};

export const CustomColor: Story = {
  args: {
    label: 'Custom Color Button',
    backgroundColor: '#ff5733', 
  },
};
