import React from 'react';
import type { Meta } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { TooltipProps } from '../../types/index'
import { Typography } from '../Typography/Typography';

const meta: Meta<TooltipProps> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
          backgroundColor: 'var(--white)',
          padding: '30px',
          borderRadius: '10px'
        }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: { description: 'Передает дочерние элементы для отображения' },
    label: { description: 'Текст для отображения' },
    overlayChildren: { description: 'Положение подсказки: если пропс overlayChildren true, подсказка будет поверх дочерних компонентов в месте наведения, в ином случае подсказка всплывает под дочерним элементом' }
  },
};

export default meta;

export const TooltipDefault = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipDefault.storyName = 'Tooltip по умолчанию';
TooltipDefault.args = {
  label: 'Tooltip',
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipOverlay = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipOverlay.storyName = 'Tooltip перекрывающий дочерний элемент';
TooltipOverlay.args = {
  label: 'Tooltip',
  overlayChildren: true,
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};