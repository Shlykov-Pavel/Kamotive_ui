import React from 'react';
import { Meta } from '@storybook/react';
import { LinkProps } from '../../types/index';

import { Link } from './Link';
import { ETypographyVariants } from '../Typography/enums';

const meta: Meta<LinkProps> = {
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'var(--white)',
          padding: '30px',
          borderRadius: '10px',
          width: '900px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    underline: 'hover',
    variant: ETypographyVariants.Body1,
    color: 'var(--text-dark)',
  },
  argTypes: {
    href: { description: 'Гипертекстовая ссылка', type: 'string' },
    children: { description: 'Дочерние элементы' },
    title: { description: 'Заголовок', type: 'string' },
    className: { description: 'Дополнительный класс' },
    style: { description: 'Дополнительный стиль' },
    underline: { description: 'Подчеркивание', control: { type: 'radio' }, options: ['hover', 'underline'] },
    variant: {
      description: 'Вариант шрифта',
      control: { type: 'select' },
      options: Object.values(ETypographyVariants),
    },
    color: {
      description: 'Цвет текста',
      control: { type: 'color' },
    },
    maxWidth: {
      description: 'Максимальная ширина - нужна для отображения тултипа ',
      control: { type: 'text' },
    },
  },
};

export default meta;

export const LinkDefault = (argTypes: LinkProps): JSX.Element => <Link {...argTypes} />;
LinkDefault.storyName = 'Ссылка по умолчанию';
LinkDefault.args = {
  href: 'http://localhost:6006/?path=/docs/components-link--docs',
  children: <> Перейти по ссылке</>,
  title: 'Ссылка на страницу',
};

export const LinkWithWidth = (argTypes: LinkProps): JSX.Element => <Link {...argTypes} />;
LinkWithWidth.storyName = 'Ссылка с заданной максимальной шириной и тултипом';
LinkWithWidth.args = {
  href: 'http://localhost:6006/?path=/docs/components-link--docs',
  children: <> Перейти по очень длинной ссылке</>,
  maxWidth: '180px',
};
