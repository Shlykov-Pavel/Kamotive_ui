import React, { CSSProperties, useState } from 'react';
import type { Meta } from '@storybook/react';

import { Dialog } from './Dialog';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { IconClose } from '../../Icons';

export interface DialogProps {
  /** Флаг открытия окна */
  open: boolean;
  /** Максимальная ширина окна */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  /** Содержимое окна */
  children?: React.ReactNode;
  /** Стили передаваемые напрямую */
  style?: CSSProperties;
  /** Дополнительный класс */
  className?: string;
  /**Задний фон окна */
  overlay?: boolean;
  /**Окно растягивается до максимальной ширины*/
  fullWidth?: boolean;
  /**Показ лоадера сверху диалогового окна*/
  isLoading?:boolean
 }

const meta: Meta<DialogProps> = {
  component: Dialog,
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
          height: '500px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    maxWidth: 'md',
    overlay: true,
    fullWidth: false,
  },
  argTypes: {
    open: { description: 'Флаг открытия окна', control: { type: 'boolean' } },
    maxWidth: {
      description: 'Максимальная ширина окна ',
      control: {  type: 'text' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'string'],
    },
    children: { description: 'Содержимое окна' },
    style: { description: 'Дополнительные стили для компонента' },
    className: { description: 'Дополнительные классы для компонента' },
    overlay: { description: 'Задний фон окна', control: { type: 'boolean' } },
    fullWidth: { description: 'Окно растягивается до максимальной ширины', control: { type: 'boolean' } },
    isLoading: {description: 'Показ лоадера сверху диалогового окна', control: {type: 'boolean'}}
  },
};

export default meta;

export const DialogDefault = (argTypes: DialogProps): JSX.Element => <Dialog {...argTypes} />;
DialogDefault.storyName = 'Модальное окно по умолчанию';
DialogDefault.args = {
  open: true,
  children: (
    <>
      <Typography variant="Heading4"> Модальное окно</Typography>
      <Typography variant="Body1">
        Компонент Dialog реализован как пустой контейнер, который можно наполнить любым контентом
      </Typography>
    </>
  ),
  fullWidth: true,
};

export const DialogExample = (argTypes: DialogProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button label="Открыть окно" onClick={() => setOpen(true)} />
      <Dialog open={open}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography variant="Heading4"> Модальное окно</Typography>
          <IconButton icon={<IconClose/>} onClick={onClose}/>
        </div>
        <Typography variant="Body1">
          Компонент Dialog реализован как пустой контейнер, который можно наполнить любым контентом
        </Typography>
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'end'}}>
          <Button label="Закрыть" onClick={onClose} variant="outline" />
          <Button label="Кнопка" />
        </div>
      </Dialog>
    </>
  );
};
DialogExample.storyName = 'Модальное окно с состоянием';

export const DialogLoading = (argTypes: DialogProps): JSX.Element => <Dialog {...argTypes} />;
DialogLoading.args = {
  open: true,
  isLoading: true,
  onClose: () => {console.log('close')},
  children: (
    <>
      <Typography variant="Heading4"> Модальное окно</Typography>
      <Typography variant="Body1">
        Компонент Dialog реализован как пустой контейнер, который можно наполнить любым контентом
      </Typography>
    </>
  ),
};

DialogLoading.parameters = {
  controls: { disable: true },
};

DialogLoading.storyName = 'Модальное окно с лоадером';