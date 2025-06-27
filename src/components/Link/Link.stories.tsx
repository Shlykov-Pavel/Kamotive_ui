import React, { useEffect, useState } from 'react';
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
    onClick: {
      description:
        'Обработчик клика. Функция, которая будет вызвана при клике по ссылке, если необходима дополнительная логика обработки. Заменяет переход по href',
      type: 'function',
    },
    children: { description: 'Дочерние элементы' },
    title: { description: 'Заголовок', type: 'string' },
    className: { description: 'Дополнительный класс' },
    style: { description: 'Дополнительный стиль' },
    underline: { description: 'Подчеркивание', control: { type: 'radio' }, options: ['hover', 'underline', 'none'] },
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
    size: {
      description: 'Размер - для отображения тултипа',
      control: { type: 'number' },
    },
    widthInPixels: {
      description: 'Ширина в пикселях - для отображения тултипа',
      control: { type: 'number' },
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

export const LinkWithTooltip = (argTypes: LinkProps): JSX.Element => <Link {...argTypes} />;
LinkWithTooltip.storyName = 'Ссылка с тултипом';
LinkWithTooltip.args = {
  href: 'http://localhost:6006/?path=/docs/components-link--docs',
  children: 'Очень длинный текст ссылки который должен показать тултип',
  size: 300,
  widthInPixels: 200,
  maxWidth: '200px',
  title: 'Ссылка с тултипом',
};

export const LinkWithAutoMeasuredTooltip = (): JSX.Element => {
  const [widthInPixels, setWidthInPixels] = useState(200);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link
          href="http://localhost:6006/?path=/docs/components-link--docs"
          widthInPixels={widthInPixels}
          maxWidth={`${widthInPixels}px`}
        >
          Короткий
        </Link>
        <Link
          href="http://localhost:6006/?path=/docs/components-link--docs"
          widthInPixels={widthInPixels}
          maxWidth={`${widthInPixels}px`}
        >
          Средний текст ссылки
        </Link>
        <Link
          href="http://localhost:6006/?path=/docs/components-link--docs"
          widthInPixels={widthInPixels}
          maxWidth={`${widthInPixels}px`}
        >
          Длинный текст ссылки который должен показать тултип
        </Link>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Изменить ширину:
          <input
            type="range"
            min="50"
            max="500"
            value={widthInPixels}
            onChange={(e) => setWidthInPixels(Number(e.target.value))}
            style={{ marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px' }}>{widthInPixels}px</span>
        </label>
      </div>
    </div>
  );
};
LinkWithAutoMeasuredTooltip.storyName = 'Ссылка с автоматическим измерением размера';

export const LinkWithOnClick = (argTypes: LinkProps): JSX.Element => <Link {...argTypes} />;
LinkWithOnClick.storyName = 'Ссылка с обработчиком onClick';
LinkWithOnClick.args = {
  onClick: () => alert('Клик по ссылке обработан!'),
  children: 'Кликабельная ссылка',
  title: 'Ссылка с onClick',
};
