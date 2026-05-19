import type { Meta } from '@storybook/react';
import React from 'react';
import { Spinner } from './Spinner';

export interface SpinnerProps {
  /** Размер */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  testId?: string;
}

const withWrapper = (Story: React.ComponentType) => <div style={{
  backgroundColor: 'var(--white)',
  padding: '30px',
  borderRadius: '10px',
  width: '900px'}}>{<Story />}</div>;

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  decorators: [withWrapper],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
    testId: 'storybook'
  },
  argTypes: {
    size: {
      description: 'Размер прогресс-бара',
      control: { type: 'radio' },
      options: ['xs','sm', 'md', 'lg' ],
    }
  },
};

export default meta;

export const SpinnerDefault = (argTypes: SpinnerProps): JSX.Element => <Spinner {...argTypes} />;
SpinnerDefault.storyName = 'Spinner по умолчанию';
