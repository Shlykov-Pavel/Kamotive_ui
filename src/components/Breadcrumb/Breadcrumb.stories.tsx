import React from 'react';
import type { Meta } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbProps } from '../../types/index'
import { IconBell10 } from '../../Icons/IconBell/IconBell10'

const meta: Meta<BreadcrumbProps> = {
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        backgroundColor: 'var(--white)',
        padding: '30px',
        borderRadius: '10px',
        width: '900px'}}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    active: { description: 'Устанавливает атрибут active', control: { type: 'boolean' } },
    onClick: { description: 'Callback функция, вызываемая при нажатии на элемент' },
	children: { description: 'Передает дочерние элементы для отображения' },
	label: { description: 'Текст для отображения' },
	icon: { description: 'Передает иконку' },
  },
};

export default meta;

export const BreadcrumbActive = (argTypes: BreadcrumbProps): JSX.Element => <Breadcrumb {...argTypes} />;
BreadcrumbActive.storyName = 'Breadcrumb активный';
BreadcrumbActive.args = {
  active: true,
  children: 'Активный',
};

export const BreadcrumbInactive = (argTypes: BreadcrumbProps): JSX.Element => <Breadcrumb {...argTypes} />;
BreadcrumbInactive.storyName = 'Breadcrumb неактивный';
BreadcrumbInactive.args = {
  active: false,
  children: 'Неактивный',
};

export const BreadcrumbWithIcon = (argTypes: BreadcrumbProps): JSX.Element => <Breadcrumb {...argTypes} />;
BreadcrumbWithIcon.storyName = 'Breadcrumb с иконкой';
BreadcrumbWithIcon.args = {
  active: true,
  children: [<IconBell10 />, 'Breadcrumb с иконкой'],
};

export const BreadcrumbIcon = (argTypes: BreadcrumbProps): JSX.Element => <Breadcrumb {...argTypes} />;
BreadcrumbIcon.storyName = 'Breadcrumb без текста';
BreadcrumbIcon.args = {
  active: true,
  children: <IconBell10 />,
};