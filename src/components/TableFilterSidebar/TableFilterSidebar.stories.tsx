import React, { ReactNode, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { TableFilterSidebar } from './TableFilterSidebar';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { DateInput } from '../DateInput/DateInput';


const FilterGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div style={{ 
      fontSize: '12px', 
      fontWeight: 500, 
      color: 'var(--text-grey, #888)', 
      marginBottom: '6px',
      // textTransform: 'uppercase' 
    }}>
      {label}
    </div>
    {children}
  </div>
);

interface TableFilterSidebarProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  lng: string;
  onReset?: () => void;
  onApply?:()=>void;
  isResetDisabled?: boolean;
  isApplyDisabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  isLoading?: boolean;
  width?: string;
  zIndex?: number;
  top?: number;
  right?: number;
  testId?: string
}


const meta: Meta<TableFilterSidebarProps> = {
  title: 'Components/Title Filter Sidebar',
  component: TableFilterSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100%', height: '600px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
        <div style={{ padding: '20px' }}>Контент таблицы</div>
        <Story />
      </div>
    ),
  ],
  args: {
    open: true,
    onClose: () => console.log('closed'),
    onReset: () => console.log('reset'),
    onApply: () => console.log('apply'),
    isLoading: false,
    width: '320px',
    zIndex: 1000,
    top:60,
    right: 20,
    children: [
       <Dropdown 
        label="Фильтр 1"
        variant='filter'
        placeholder='Выберите фильтр 1'
        options={[
          {value: 'описание 1', name: 'описание 1', description: 'описание 1'},
          {value: 'описание 2', name: 'описание 2', description: 'описание 2'},
          {value: 'описание 3', name: 'описание 3', description: 'Зописание 3'},
        ]}
        testId='filter'
      />,
      <Dropdown 
        label="Фильтр 2"
        variant='filter'
        placeholder='Выберите фильтр 2'
        options={[
          {value: 'Новое', name: 'Новое', description: 'Новые задачи'},
          {value: 'В работе', name: 'В работе', description: 'Задачи в работе'},
          {value: 'Завершено', name: 'Завершено', description: 'Завершенные задачи'},
        ]}
        testId='filter'
      />,
            <Dropdown 
        label="Фильтр 2"
        variant='filter'
        placeholder='Выберите фильтр 2'
        options={[
          {value: 'Новое', name: 'Новое', description: 'Новые задачи'},
          {value: 'В работе', name: 'В работе', description: 'Задачи в работе'},
          {value: 'Завершено', name: 'Завершено', description: 'Завершенные задачи'},
        ]}
        testId='filter'
      />,
            <Dropdown 
        label="Фильтр 2"
        variant='filter'
        placeholder='Выберите фильтр 2'
        options={[
          {value: 'Новое', name: 'Новое', description: 'Новые задачи'},
          {value: 'В работе', name: 'В работе', description: 'Задачи в работе'},
          {value: 'Завершено', name: 'Завершено', description: 'Завершенные задачи'},
        ]}
        testId='filter'
      />,
            <Dropdown 
        label="Фильтр 2"
        variant='filter'
        placeholder='Выберите фильтр 2'
        options={[
          {value: 'Новое', name: 'Новое', description: 'Новые задачи'},
          {value: 'В работе', name: 'В работе', description: 'Задачи в работе'},
          {value: 'Завершено', name: 'Завершено', description: 'Завершенные задачи'},
        ]}
        testId='filter'
      />,
      
    ],
    testId:'storybook'
  },

  argTypes: {
    open: { description: 'Флаг открытия', control: { type: 'boolean' } },
    onClose: { description: 'Функция обработки закрытия' },
    onReset: { description: 'Функция сброса фильтров' },
    children: { description: 'Содержимое окна' },
    style: { description: 'Дополнительные стили для компонента' },
    className: { description: 'Дополнительные классы для компонента' },
    isLoading: {description: 'Показ лоадера сверху диалогового окна', control: {type: 'boolean'}},
    width: { description: 'Ширина окна', control: { type: 'text' } },
    zIndex: { description: 'z-index окна', control: { type: 'number' } },
    top: { description: 'Отступ сверху', control: { type: 'number' } },
    right: { description: 'Отступ справа', control: { type: 'number' } },
  },
};

export default meta;


export const TableFilterDialogDefault = (argTypes: TableFilterSidebarProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(argTypes.open);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Button 
            onClick={handleOpen}
        >
          Открыть фильтры
        </Button>
      </div> 
       <TableFilterSidebar 
        {...argTypes} 
        open={isOpen} 
        onClose={handleClose} 
        onReset={() => console.log('Сбросить')}
        onApply={() => console.log('Применить')}

      />
      </>
  );
}
TableFilterDialogDefault.storyName = 'Окно фильтрации для таблицы';
TableFilterDialogDefault.args = {
  open: false, 
};
