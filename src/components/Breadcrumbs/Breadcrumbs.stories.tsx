import React from 'react';
import type { Meta } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbsProps } from '../../types/index'
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';

const meta: Meta<BreadcrumbsProps> = {
  component: Breadcrumbs,
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
	className: { description: 'Кастомные стили' },
	separator: { description: 'Разделитель между ссылками' },
	children: { description: 'Передает дочерние элементы для отображения' },
  },
};

export default meta;

export const BreadcrumbsDefault = (argTypes: BreadcrumbsProps): JSX.Element => {
	return (
		<Breadcrumbs {...argTypes}>
			<Breadcrumb>Parent</Breadcrumb>
			<Breadcrumb>Level 1</Breadcrumb>
			<Breadcrumb active>Active</Breadcrumb>
		</Breadcrumbs>
	)
};
BreadcrumbsDefault.storyName = 'Breadcrumbs с тремя уровнями';
