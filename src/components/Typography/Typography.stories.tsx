import type { Meta } from '@storybook/react';
import React, { CSSProperties, ReactNode } from 'react';
import { Typography } from './Typography';

import { ETypographyVariants } from './enums';

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
    title: 'Subheading2-Medium',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 500,
    description: 'Подзаголовок 2 уровня средний',
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
    title: 'Subheading3-Medium',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 500,
    description: 'Подзаголовок 3 уровня средний',
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
    title: 'Body1-Light',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 300,
    description: 'Текст контента 1 уровня тонкий (инпуты, ячейки таблиц)',
  },
  {
    title: 'Body1',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 400,
    description: 'Текст контента 1 уровня (кнопки, инпуты)',
  },
  {
    title: 'Body1-Medium',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 500,
    description: 'Текст контента 1 уровня средний',
  },
  {
    title: 'Body1-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 600,
    description: 'Текст контента 1 уровня акцентный полужирный (заголовки ячеек таблиц)',
  },
  {
    title: 'Body1-Bold',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 700,
    description: 'Текст контента 1 уровня акцентный жирный (активные элементы)',
  },
  {
    title: 'Body1Mono-Regular',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 400,
    description: 'Текст контента 1 уровня для цифр',
    fontFamily: 'Quicksand, sans-serif',
  },
  {
    title: 'Body1Mono-Bold',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 600,
    description: 'Текст контента 1 уровня для цифр акцентный',
    fontFamily: 'Quicksand, sans-serif',
  },
  {
    title: 'Body2-Light',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 300,
    description: 'Текст контента 2 уровня тонкий (инпуты, ячейки таблиц)',
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
    description: 'Текст контента 2 уровня средний (активные элементы)',
  },
  {
    title: 'Body2-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 600,
    description: 'Текст контента 2 уровня акцентный',
  },
  {
    title: 'Body2-Bold',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 700,
    description: 'Текст контента 2 уровня акцентный',
  },
  {
    title: 'Body2Mono-Medium',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 500,
    description: 'Текст контента 2 уровня для цифр средний',
    fontFamily: 'Quicksand, sans-serif',
  },
  {
    title: 'Body2Mono-Bold',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 700,
    description: 'Текст контента 2 уровня для цифр акцентный',
    fontFamily: 'Quicksand, sans-serif',
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
    title: 'CaptionMono',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
    description: 'Моноширинное начертание для числовых данных',
    fontFamily: 'Quicksand, sans-serif',
  },
  {
    title: 'CaptionMono-Medium',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 500,
    description: 'Моноширинное среднее начертание для числовых данных',
    fontFamily: 'Quicksand, sans-serif',
  },
  {
    title: 'CaptionMono-Bold',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 700,
    description: 'Моноширинное акцентный начертание для числовых данных',
    fontFamily: 'Quicksand, sans-serif',
  },
];

export interface TypographyProps {
  /** Вариант шрифта */
  variant?: `${ETypographyVariants}`;
  /** Текст */
  children: ReactNode;
  /** Дополнительный класс */
  className?: string;
  /** Цвет текста */
  color?: CSSProperties['color'];
  /** Стиль текста */
  style?: CSSProperties;
}
const withWrapper = (Story: React.ComponentType) => <div style={{backgroundColor: 'var(--white)',
  width: '900px'}}>{<Story />}</div>;

const meta: Meta<typeof Typography> = {
  title: 'Introduction/Typography',
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


export const TypographyVariants = (argTypes: TypographyProps): JSX.Element => {
  return (
    <div>
      {typogrphy.map((item, index) => (
        <div key={index} style={{
          display: 'grid',
          gridTemplateColumns: '4fr 170px 80px 150px',
          gap: '20px',
          alignItems: 'center',
          height: '60px',
          width: '1100px'
        }}>
          <Typography variant={item.title as TypographyProps['variant']}>{item.description}</Typography>
          <Typography variant="Body1" style={{ fontSize: 14, lineHeight: 16, fontWeight: 400, color: '#6b7280' }}>
            {item.title}
          </Typography>
          <Typography variant="Body1" style={{ fontSize: 14, lineHeight: 16, fontWeight: 400, color: '#6b7280' }}>
            {item.fontSize}-{item.lineHeight}px
          </Typography>
          <Typography variant="Body1" style={{ fontSize: 14, lineHeight: 16, fontWeight: 400, color: '#6b7280' }}>
            {item.fontFamily || 'Raleway, sans-serif'}
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
