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
        }}>
        <Story />
      </div>
    ),
  ],
  args: {
    testId: 'storybook',
  },
  argTypes: {
    label: { description: 'Текст для отображения' },
    children: { description: 'Передает дочерние элементы для отображения' },
    overlayChildren: { description: 'Положение подсказки: если пропс overlayChildren true, подсказка будет поверх дочерних компонентов в месте наведения, в ином случае подсказка всплывает под дочерним элементом' },
  },
};

export default meta;

export const TooltipDefault = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipDefault.storyName = 'Tooltip по умолчанию';
TooltipDefault.args = {
  label: 'Tooltip',
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipBottomCenter = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipBottomCenter.storyName = 'Tooltip, расположенный снизу по центру';
TooltipBottomCenter.args = {
  label: 'Tooltip',
  position: 'bottom-center',
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipBottomRight = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipBottomRight.storyName = 'Tooltip, расположенный снизу справа';
TooltipBottomRight.args = {
  label: 'Tooltip',
  position: 'bottom-right',
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipBottomLeft = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipBottomLeft.storyName = 'Tooltip, расположенный снизу слева';
TooltipBottomLeft.args = {
  label: 'Tooltip',
  position: 'bottom-left',
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipTopCenter = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipTopCenter.storyName = 'Tooltip, расположенный сверху по центру';
TooltipTopCenter.args = {
  label: 'Tooltip',
  position: 'top-center',
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipTopRight = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipTopRight.storyName = 'Tooltip, расположенный сверху справа';
TooltipTopRight.args = {
  label: 'Tooltip',
  position: 'top-right',
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipTopLeft = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipTopLeft.storyName = 'Tooltip, расположенный сверху слева';
TooltipTopLeft.args = {
  label: 'Tooltip',
  position: 'top-left',
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipOverlay = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipOverlay.storyName = 'Tooltip перекрывающий дочерний элемент';
TooltipOverlay.args = {
  label: 'Tooltip',
  overlayChildren: true,
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipCustomColor = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipCustomColor.storyName = 'Tooltip с кастомным цветом и прозрачностью';
TooltipCustomColor.args = {
  label: 'Tooltip',
  color: '#FF6EB9',
  opacity: 0.6,
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipCustomDelay = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipCustomDelay.storyName = 'Tooltip с кастомной задержкой появления и исчезновения';
TooltipCustomDelay.args = {
  label: 'Tooltip',
  displayDelay: 0,
  hideDelay: 0,
  position: 'bottom-center',
  children: <Typography variant="Body1" style={{ padding: '50px' }}>text with tooltip</Typography>
};

export const TooltipFollowCursor = (argTypes: TooltipProps): JSX.Element => <Tooltip {...argTypes} />;
TooltipFollowCursor.storyName = 'Tooltip, следующий за курсором';
TooltipFollowCursor.args = {
  label: 'Tooltip',
  color: '#6203ff',
  opacity: 0.3,
  displayDelay: 0,
  hideDelay: 0,
  followCursor: true,
  children: (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="Body1">text with tooltip</Typography>
    </div>
  ),
};