import React, { CSSProperties, useState } from 'react';
import type { Meta } from '@storybook/react';
import { Tabs } from './Tabs';
import { Tab } from '../Tab/Tab';

interface TabProps {
  /**  Лейбл */
 label?:string;
 /** Выбрано */
 selected?: boolean;
 /** Заблокировано */
 disabled?:boolean;
 /** Значение */
 value?:string;
 /** Вложенность */
 children?: React.ReactNode;
 /** Обработчик клика */
 onClick?: (value: string ) => void;
 /** Стили передаваемые напрямую */
 style?: CSSProperties;
 /** Дополнительный класс */
 className?: string;
  testId?: string
}
interface TabsProps {
  /** Табы */
 children: React.ReactElement<TabProps>[];
 /** Значение */
 value?: string;
 /** Обработчик изменения значения */
 onChange?: (value: string) => void;
  /** Стили передаваемые напрямую */
  style?: CSSProperties;
  /** Дополнительный класс */
  className?: string;
  testId?: string
}


const meta: Meta<TabsProps> = {
  component: Tabs,
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
    value: { description: 'Задает выбор активного таба. Выбран по умолчанию первый таб.' },
    onChange: { description: 'Callback функция, вызываемая при изменении значения' },
    children: { description: 'Содержимое вкладок' },
    style: { description: 'Стили передаваемые напрямую' },
    className: { description: 'Дополнительный класс' },
  },
};

export default meta;


export const TabsDefault = (argTypes: TabsProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<string>('tab1');

  const handleChange = (newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs value={selectedTab} onChange={handleChange} testId='storybook'>
        <Tab value="tab1" label="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab value="tab2" label="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab value="tab3" label="Item 3" disabled />
      </Tabs>
    </>
  );
};
TabsDefault.storyName = 'Tabs';
