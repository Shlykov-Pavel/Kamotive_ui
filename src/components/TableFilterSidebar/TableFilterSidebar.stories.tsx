import React, { CSSProperties, ReactNode, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { TableFilterSidebar } from './TableFilterSidebar';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { Checkbox } from '../Checkbox/Checkbox';
import { DateInput } from '../DateInput/DateInput';

// const [isPaused, setIsPaused] = useState(false);


//   const { data, isFetching } = useGetUserQuery(userId ?? '', {
//     skip: !userId || isPaused,
//   });
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
  right?: number
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
      />,
       
      // <DateInput/>, 
      // <>
      //   <Checkbox label='Петров П.П' />
      //   <Checkbox label='Иванов И.И.' />
      //   <Checkbox label='Сидоров С.С.' />
      // </>,

    ]
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




// export const TableFilterDialogDefault = (argTypes: TableFilterSidebarProps): JSX.Element => <TableFilterSidebar {...argTypes} />;
// TableFilterDialogDefault.storyName = 'Окно фильтрации для таблицы';
// TableFilterDialogDefault.args = {
// open: true,


// };



const Template: StoryFn<TableFilterSidebarProps> = (args) => {
  const [isOpen, setIsOpen] = useState(args.open);

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
        {...args} 
        open={isOpen} 
        onClose={handleClose} 
        onReset={() => console.log('Filters reset')}
        onApply={() => console.log('Filters applu')}

      />
      </>
  );
};
export const TableFilterDialogDefault = Template.bind({});
TableFilterDialogDefault.storyName = 'Окно фильтрации для таблицы';
TableFilterDialogDefault.args = {
  open: false, 
};

export const TableFilterDialogDisabledBtns = Template.bind({});
TableFilterDialogDisabledBtns.storyName = 'Окно фильтрации для таблицы';
TableFilterDialogDisabledBtns.args = {
  open: false, 
};






// children: (
    // <>
      {/* 1. Текстовый фильтр */}
      {/* <FilterGroup label="Название задачи">
        <input 
          type="text" 
          placeholder="Введите название..." 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </FilterGroup> */}

      {/* 2. Фильтр-селект (Статус) */}
      {/* <FilterGroup label="Статус">
        <select style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="">Все статусы</option>
          <option value="new">Новое</option>
          <option value="in_progress">В работе</option>
          <option value="completed">Завершено</option>
        </select>
      </FilterGroup> */}
       {/* 3. Фильтр даты */}
      {/* <FilterGroup label="Дата создания">
        <input 
          type="date" 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </FilterGroup> */}

      {/* 4. Множественный выбор (Исполнитель) */}
      {/* <FilterGroup label="Исполнитель">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" /> Иванов И.И.
          </label>
          <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" /> Петров П.П.
          </label>
          <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" /> Сидоров С.С.
          </label>
        </div>
      </FilterGroup> */}
    // </>
// ),
