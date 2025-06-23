import React from 'react';
import { Meta } from '@storybook/react';
import { LinkProps } from '../../types/index';

import { Link } from './Link';
import { Typography } from '../Typography/Typography';

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
  },
  argTypes: {
    href: { description: 'Гипертекстовая ссылка', type: 'string' },
    children: { description: 'Дочерние элементы' },
    title: { description: 'Заголовок', type: 'string' },
    className: { description: 'Дополнительный класс' },
    style: { description: 'Дополнительный стиль' },
    underline: { description: 'Подчеркивание', control: { type: 'radio' }, options: ['hover', 'underline'] },
  },
};

export default meta;

export const LinkDefault = (argTypes: LinkProps): JSX.Element => <Link {...argTypes} />;
LinkDefault.storyName = 'Ссылка по умолчанию';
LinkDefault.args = {
  href: 'http://localhost:6006/?path=/docs/components-link--docs',
  children: (
    <>
      <Typography variant="Body1">Перейти по ссылке</Typography>
    </>
  ),
  title: 'Ссылка на страницу',
};
