import type { Meta } from '@storybook/react';
import React from 'react';
import { Typography } from './Typography';
import styles from './Typography.module.css';
import { TypographyProps } from 'kamotive_ui';

const typogrphy = [
  {
    title: 'Heading1',
    fontSize: 48,
    lineHeight: 56,
    fontWeight: 700,
    description: 'Заголовок 1 уровня',
  },
  {
    title: 'Subheading1',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 400,
    description: 'Подзаголовок 1 уровня',
  },
  {
    title: 'Heading2',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 700,
    description: 'Заголовок 2 уровня',
  },
  {
    title: 'Subheading2',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 400,
    description: 'Подзаголовок 2 уровня',
  },
  {
    title: 'Heading3',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 700,
    description: 'Заголовок 3 уровня',
  },
  {
    title: 'Subheading3',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 400,
    description: 'Подзаголовок 3 уровня',
  },

  {
    title: 'Heading4',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 700,
    description: 'Заголовок 4 уровня',
  },
  {
    title: 'Body',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 400,
    description: 'Текст контента',
  },
  {
    title: 'Body-Medium',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 500,
    description: 'Текст контента средний',
  },
  {
    title: 'Body-Bold',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 700,
    description: 'Текст контента акцентный',
  },
  {
    title: 'Body1',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 400,
    description: 'Текст контента 1 уровня',
  },
  {
    title: 'Body1-Medium',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 500,
    description: 'Текст контента 1 уровня',
  },

  {
    title: 'Body1-Bold',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 700,
    description: 'Текст контента 1 уровня акцентный',
  },
  {
    title: 'Body2',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 400,
    description: 'Текст контента 2 уровня',
  },
  {
    title: 'Body2-Medium',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 500,
    description: 'Текст контента 2 уровня средний',
  },
  {
    title: 'Body2-Bold',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 700,
    description: 'Текст контента 2 уровня акцентный',
  },
  {
    title: 'Caption',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
    description: 'Текст дополнительный для подписей, шкал графиков',
  },
  {
    title: 'Caption-Medium',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 500,
    description: 'Текст дополнительный средний для подписей, шкал графиков',
  },
  {
    title: 'Caption-Bold',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 700,
    description: 'Текст дополнительный акцентный для подписей, шкал графиков',
  },
  {
    title: 'Caption1',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: 400,
    description: 'Текст мелкий',
  },
  {
    title: 'Caption1-Medium',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: 500,
    description: 'Текст мелкий средний',
  },
  {
    title: 'Caption1-Bold',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: 700,
    description: 'Текст мелкий акцентный',
  },
];

const withWrapper = (Story: any) => <div className={styles[`story--wrapper`]}>{<Story />}</div>;
const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  decorators: [withWrapper],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Типографика',
    variant: 'Body',
    color: '#0d99ff',
    style: {
      alignItems: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  argTypes: {
    children: { description: 'Текст' },
    variant: {
      description: 'Вариант шрифта',
      control: { type: 'select' },
      options: typogrphy.map((el) => el.title),
    },
    color: {
      description: 'Цвет текста',
      control: { type: 'color' },
    },
    style: {
      description: 'Стиль текста',
      control: { type: 'object' },
    },
  },
};
export default meta;

export const TypographyDefault = (argTypes: TypographyProps): JSX.Element => <Typography {...argTypes} />;
TypographyDefault.storyName = 'Типографика по умолчанию';

export const TypographyVariants = (argTypes: TypographyProps): JSX.Element => {
  return (
    <div>
      {typogrphy.map((item, index) => (
        <div key={index} className={styles['typography--wrapper']}>
          <Typography variant={item.title as TypographyProps['variant']}>{item.description}</Typography>
          <Typography variant="Body1" style={{ fontSize: 14, lineHeight: 16, fontWeight: 400, color: '#6b7280' }}>
            {item.title}
          </Typography>
          <Typography variant="Body1" style={{ fontSize: 14, lineHeight: 16, fontWeight: 400, color: '#6b7280' }}>
            {item.fontSize}px
          </Typography>
          <Typography variant="Body1" style={{ fontSize: 14, lineHeight: 16, fontWeight: 400, color: '#6b7280' }}>
            'Raleway', sans-serif
          </Typography>
        </div>
      ))}
    </div>
  );
};
TypographyVariants.storyName = 'Типографика варианты';
TypographyVariants.parameters = {
  controls: { disable: true },
};
