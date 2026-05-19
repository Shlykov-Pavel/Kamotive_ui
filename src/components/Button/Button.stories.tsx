import React, { CSSProperties, ReactNode, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from './Button';
import { IconAccount, IconAlarm, IconAddress, IconBell, IconBriefcase, IconCalendar } from '../../Icons';

export interface ButtonProps {
  /** Тест кнопки */
 label?: string;
 /** Вид кнопки (заполненный/обводка/ссылка) */
 variant?: 'fill' | 'outline' | 'link';
 /** Размер кнопки */
 size?: 'sm' | 'md' | 'lg';
 /** Стиль кнопки(текст+иконка, текст, иконка) */
 mode?: 'default' | 'text' | 'icon';
style?: CSSProperties;
 /** Состояние кнопки */
 condition?: 'default' | 'error' | 'success' | 'warning' | 'info';
 /** Иконка кнопки */
 icon?: React.ReactNode;
 /** Заблокированная кнопка */
 disabled?: boolean;
 /** Callback, который будет вызван при клике по кнопке */
 onClick?: () => void;
 /** Дочерние элементы */
  children?: ReactNode;
  /** Указатель на ошибку для установки condition */
  error?: boolean;
  /** Дополнительный цвет кнопки*/
  color?: string;
  /** Имя поля */
  name?: string;
  /** Тип кнопки */
  type?: 'button' | 'submit' | 'reset';
  /** Указатель на форму */
  form?: string;
}


const iconOptions = {
  IconAlarm: <IconAlarm />,
  IconAccount: <IconAccount />,
  IconAddress: <IconAddress />,
  IconBell: <IconBell />,
  IconBriefcase: <IconBriefcase />,
  IconCalendar: <IconCalendar />,
  unset: null,
};

const withWrapper = (Story: React.ComponentType) => (
  <div style={{
    backgroundColor: 'var(--white)',
    padding: '30px',
    borderRadius: '10px',
    width: '900px'
  }}>
    <Story />
  </div>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  args: {
    label: 'Кнопка',
    variant: 'fill',
    size: 'md',
    disabled: false,
    error: false,
    testId:'storybook'
  },
  argTypes: {
    label: { description: 'Текст кнопки' },
    variant: {
      description: 'Вариант кнопки',
      control: { type: 'select' },
      options: ['fill', 'outline', 'link'],
    },
    size: {
      description: 'Размер кнопки',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    mode: {
      description: 'Стиль кнопки',
      control: { type: 'select' },
      options: ['default', 'text', 'icon'],
    },
    condition: {
      description: 'Состояние кнопки',
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning', 'info'],
      mapping: {
        default: 'default',
        error: 'error',
        success: 'success',
        warning: 'warning',
        info: 'info',
      },
    },
    icon: {
      description: 'Иконка кнопки',
      control: { type: 'select' },
      options: Object.keys(iconOptions),
      mapping: iconOptions,
    },
    disabled: { description: 'Заблокированная кнопка', control: { type: 'boolean' } },
    onClick: { description: 'Callback, который будет вызван при клике по кнопке', action: 'clicked' },
    children: { description: 'Дочерние элементы', control: { type: 'text' } },
    error: { description: 'Указатель на ошибку для установки condition', control: { type: 'boolean' } },
    color: { description: 'Дополнительный цвет кнопки', control: { type: 'color' } },
    name: { description: 'Имя поля', control: { type: 'text' } },
    type: {
      description: 'Тип кнопки',
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },

  },
};

export default meta;


// Дефолтный Button
export const ButtonDefault = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonDefault.storyName = 'Button по умолчанию';
ButtonDefault.args = {
  icon: <IconAccount />,
};

// Стандартная синияя кнопка без иконки
export const ButtonWithoutIcon = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonWithoutIcon.storyName = 'Button без иконки';
ButtonWithoutIcon.args = {
  variant: 'fill',
  size: 'md',
};
ButtonWithoutIcon.parameters = {
  controls: { disable: true },
};

// Button c внутренним лейблом и кастомным цветом
export const ButtonWithLabelChild = (argTypes: ButtonProps): JSX.Element => <Button color='#2c2487' disabled={true} {...argTypes}>Кнопка</Button>;
ButtonWithLabelChild.storyName = 'Button c внутренним лейблом и кастомным цветом';
ButtonWithLabelChild.args = {
  variant: 'fill',
  size: 'md',
  icon: <IconAccount />,
  
};
ButtonWithLabelChild.parameters = {
  controls: { disable: true },
};


// Стандартная синияя кнопка только иконка проброс через children
export const ButtonFillOnlyIcon = (argTypes: ButtonProps): JSX.Element => <Button icon={<IconAlarm />}/>;
ButtonFillOnlyIcon.storyName = 'Button только иконка';
ButtonFillOnlyIcon.args = {
  label: '',
  variant: 'fill',
  size: 'md',
};
ButtonFillOnlyIcon.parameters = {
  controls: { disable: true },
};

// Outlined Button c иконкой
export const ButtonOutlinedWithIcon = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonOutlinedWithIcon.storyName = 'Button outlined по умолчанию';
ButtonOutlinedWithIcon.args = {
  variant: 'outline',
  icon: <IconAccount />,
  iconColor: '#0D99FF',
};
ButtonOutlinedWithIcon.parameters = {
  controls: { disable: true },
};

// Outlined Button
export const ButtonOutlinedWithoutIcon = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonOutlinedWithoutIcon.storyName = 'Button outlined без иконки';
ButtonOutlinedWithoutIcon.args = {
  variant: 'outline',
};
ButtonOutlinedWithoutIcon.parameters = {
  controls: { disable: true },
};

// Outlined Button
export const ButtonOutlinedOnlyIcon = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonOutlinedOnlyIcon.storyName = 'Button outlined только иконка';
ButtonOutlinedOnlyIcon.args = {
  label: '',
  variant: 'outline',
  condition: 'default',
  icon: <IconAccount />,
};
ButtonOutlinedOnlyIcon.parameters = {
  controls: { disable: true },
};

// Текстовый/ссылка Button
export const ButtonLink = (argTypes: ButtonProps): JSX.Element => <Button {...argTypes} />;
ButtonLink.args = {
  size: 'md',
  variant: 'link',
  disabled: false,
};
ButtonLink.storyName = 'Button текстовый/ссылка';
ButtonOutlinedOnlyIcon.parameters = {
  controls: { disable: true },
};

//Состояния
export const ButtonStates = (argTypes: ButtonProps): JSX.Element => {
  const [state, setState] = useState<'default' | 'error' | 'success' | 'warning' | 'info'>('default');
  const [label, setLabel] = useState('Клик дефолтная кнопка');

  const handleButtonClick = () => { 
    if (label === 'Клик дефолтная кнопка') {
      setState('error');
      setLabel('Клик error');
    } else if (label === 'Клик error') {
      setState('success');
      setLabel('Клик success');
    } else if (label === 'Клик success') {
      setState('warning');
      setLabel('Клик warning');
    } else if (label === 'Клик warning') {
      setState('info');
      setLabel('Клик info');
    } else {
      setState('default');
      setLabel('Клик дефолтная кнопка');
    }
  };

  return (
    <Button
      label={label}
      variant="fill"
      icon={<IconAccount />}
      condition={state}
      onClick={handleButtonClick}
    />
  );
};
ButtonStates.storyName = 'Состояния button';
ButtonStates.parameters = {
  controls: { disable: true },
};

//Состояния
export const ButtonOutlineStates = (argTypes: ButtonProps): JSX.Element => {
  const [state, setState] = useState<'default' | 'error' | 'success' | 'warning' | 'info'>('default');
  const [label, setLabel] = useState('Клик дефолтная кнопка');

  const handleButtonClick = () => {
    if (label === 'Клик дефолтная кнопка') {
      setState('error');
      setLabel('Клик error');
    } else if (label === 'Клик error') {
      setState('success');
      setLabel('Клик success');
    } else if (label === 'Клик success') {
      setState('warning');
      setLabel('Клик warning');
    } else if (label === 'Клик warning') {
      setState('info');
      setLabel('Клик info');
    } else {
      setState('default');
      setLabel('Клик дефолтная кнопка');
    }
  };

  return (
    <Button
      label={label}
      variant="outline"
      condition={state}
      onClick={handleButtonClick}
      icon={<IconAccount />}
    />
  );
};
ButtonOutlineStates.storyName = 'Состояния outlined button';
ButtonOutlineStates.parameters = {
  controls: { disable: true },
};
