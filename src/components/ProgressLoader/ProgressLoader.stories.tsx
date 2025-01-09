import type { Meta } from '@storybook/react';
import React from 'react';

import styles from './ProgressLoader.module.css';
import { ProgressLoaderProps } from 'kamotive_ui';
import { ProgressLoader } from './ProgressLoader';

const withWrapper = (Story: any) => <div className={styles['story--wrapper']}>{<Story />}</div>;

const meta: Meta<typeof ProgressLoader> = {
  title: 'Components/ProgressLoader',
  component: ProgressLoader,
  tags: ['autodocs'],
  decorators: [withWrapper],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'xl',
    showValue: true,
    animated: false,
  },
  argTypes: {
    value: {
      description: 'Значение прогресса',
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
    size: {
      description: 'Размер прогресс-бара',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    showValue: { description: 'Показывать значение прогресса' },
    animated: { description: 'Показывать анимацию' },
  },
};

export default meta;

export const ProgressLoaderwithValues = (argTypes: ProgressLoaderProps): JSX.Element => {
  return (
    <div className={styles['progress-bar--default-story']}>
      <ProgressLoader {...argTypes} value={0} />
      <ProgressLoader {...argTypes} value={50} />
      <ProgressLoader {...argTypes} value={100} />
    </div>
  );
};
ProgressLoaderwithValues.storyName = 'ProgressLoader cостояния';

export const ProgressLoaderDefault = (argTypes: ProgressLoaderProps): JSX.Element => <ProgressLoader {...argTypes} />;

ProgressLoaderDefault.storyName = 'ProgressLoader по умолчанию';

export const ProgressLoaderAnimated = (argTypes: ProgressLoaderProps): JSX.Element => (
  <ProgressLoader {...argTypes} value={100} />
);
ProgressLoaderAnimated.storyName = 'ProgressLoader анимированный';
ProgressLoaderAnimated.args = {
  animated: true,
};
