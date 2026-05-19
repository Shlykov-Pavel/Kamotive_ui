import type { Meta } from '@storybook/react';
import React from 'react';
import { ProgressBar } from './ProgressBar';

export interface ProgressBarProps {
  /** Значение */
  value?: number;
  /** Максимальное значение */
  max?: number;
  /** Размер */
  size?: 'sm' | 'md' | 'lg';
  /** Показывать значение */
  showValue?: boolean;
  /** Анимация */
  animated?: boolean;
  /** Длительность анимации */
  animationDuration?: number;
  /**Для выставления флага окончания загрузки */
  setIsLoadingFinished?: (value: boolean) => void;
  testId?: string;
}

const withWrapper = (Story: React.ComponentType) => (
  <div
    style={{
      backgroundColor: 'var(--white)',
      padding: '30px',
      borderRadius: '10px',
      width: '900px',
    }}
  >
    {<Story />}
  </div>
);

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
    testId: 'storybook',
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
    showValue: { description: 'Показывать значение прогресса' },
    animated: { description: 'Показывать анимацию' },
    animationDuration: { description: 'Длительность анимации' },
    setIsLoadingFinished: { description: 'Для выставления флага окончания загрузки' },
  },
};
export default meta;

export const ProgressBarWithValues = (argTypes: ProgressBarProps): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}
    >
      <ProgressBar value={0} {...argTypes} />
      <ProgressBar value={50} {...argTypes} />
      <ProgressBar value={100} {...argTypes} />
    </div>
  );
};
ProgressBarWithValues.storyName = 'ProgressBar c состояниями';
ProgressBarWithValues.parameters = {
  controls: { disable: true },
};

export const ProgressBarDefault = (argTypes: ProgressBarProps): JSX.Element => <ProgressBar {...argTypes} />;
ProgressBarDefault.storyName = 'ProgressBar по умолчанию';

export const ProgressBarAnimated = (argTypes: ProgressBarProps): JSX.Element => (
  <ProgressBar {...argTypes} animated={true} value={100} />
);

ProgressBarAnimated.storyName = 'ProgressBar анимированный';
ProgressBarAnimated.parameters = {
  controls: { disable: true },
};
