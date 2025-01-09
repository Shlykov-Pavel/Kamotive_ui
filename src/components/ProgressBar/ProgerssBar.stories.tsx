import type { Meta } from '@storybook/react';
import React from 'react';

import styles from './ProgressBar.module.css';
import { ProgressBarProps } from 'kamotive_ui';
import { ProgressBar } from './ProgressBar';

const withWrapper = (Story: any) => <div className={styles[`story--wrapper`]}>{<Story />}</div>;

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [withWrapper],
  parameters: {
    layout: 'centered',
  },
  args: {
    max: 100,
    size: 'md',
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
    max: { description: 'Максимальное значение прогресса' },
    size: {
      description: 'Размер прогресс-бара',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    // color: {
    // description: 'Цвет прогресс-бара',
    // control: { type: 'radio' },
    // options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    // },
    showValue: { description: 'Показывать значение прогресса' },
    animated: { description: 'Показывать анимацию' },
  },
};
export default meta;

export const ProgressBarWithValues = (argTypes: ProgressBarProps): JSX.Element => {
  return (
    <div className={styles['progress-bar--default-story']}>
      <ProgressBar value={0} {...argTypes} />
      <ProgressBar value={50} {...argTypes} />
      <ProgressBar value={100} {...argTypes} />
    </div>
  );
};

ProgressBarWithValues.storyName = 'ProgressBar c состояниями';

export const ProgressBarDefault = (argTypes: ProgressBarProps): JSX.Element => <ProgressBar {...argTypes} />;

ProgressBarDefault.storyName = 'ProgressBar по умолчанию';

export const ProgressBarAnimated = (argTypes: ProgressBarProps): JSX.Element => (
  <ProgressBar {...argTypes} animated={true} value={100} />
);

ProgressBarAnimated.storyName = 'ProgressBar анимированный';
