import React, { CSSProperties, useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { IconAccount, IconAlarm, IconBell, IconBriefcase, IconCalendar } from '../../Icons';
import { IconEyeOff } from '../../Icons/IconEyeOff/IconEyeOff';

export type BaseOptions = {
  [key: string]: any;
};

export type TOptions<T = {}> = BaseOptions & T;

export interface IDropdownItem {
  disabled?: boolean;
  children?: IDropdownItem[];
  value?: any;
  label?: string;
  [key: string]: any;
}

export interface DropdownProps<T> {
  /** Массив элементов для выпадающего списка */
  options: T[];
  /** Идентификатор */
  id?: string;
  /** Лейбл */
  label?: string;
  /** Подсказик заполнения */
  placeholder?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Значение */
  value?: T | T[]| null;
  /** Значение по умолчанию */
  defaultValue?: IDropdownItem | null;
  /** Callback, который будет вызван при изменении значения */
  onChange?: (event: any, value: T | T[] | null) => void;
  /** Флаг, является ли выпадающий список пагинированным */
  showLoadMore?: boolean
  /** Функция для загрузки списка при пагинированных данных */
  loadMore?: () => void;
  /** Функция для получения текста опции */
  getOptionLabel?: (option: IDropdownItem) => string;
  /** Вариaнты выпадающего списка' */
  variant?: 'icons' | 'text' | 'filter';
  /** Размер */
  size?: 'md' | 'lg';
  /** Стили передаваемые напрямую */
  style?: CSSProperties;
  /** Дополнительный класс */
  className?: string;
  /** Отображение левой метки */
  isLeftLabel?: boolean;
  /** Отображение разделителя */
  isDivider?: boolean;
  /** Заблокированный */
  disabled?: boolean;
  /** Только для чтения */
  readOnly?: boolean;
  /** Открытый */
  isOpened?: boolean;
  /** Ошибка */
  error?: boolean;
  /** Текст ошибки */
  helperText?: string;
  /** Callback, который будет вызван при клике */
  onClick?: (event: any) => void;
  /** Callback при потере фокуса */
  onBlur?: (event: any) => void;
  /** Callback при получении фокуса */
  onFocus?: (event: any) => void;
  /** Callback, который будет вызван при закрытии выпадающего списка */
  onClose?: (event: any) => void;
  /** Возможность сброса значения до первоначального */
  clearable?: boolean;
  /** Включение автозаполнения */
  enableAutocomplete?: boolean;
  onSearch?: (value: string) => void;
  /** Текст при отсутствии опций */
  noOptionsText?: string;
  /** Язык */
  lng?: string,
  /** Множественный выбор */
  multiple?: boolean;
  limitTags?: number; 
}


const dropdownOptions = [
  { value: 'Выбор_1', icon: <IconAccount /> },
  { value: 'Выбор_2', icon: <IconAlarm /> },
  { value: 'Задизейбленный выбор', disabled: true, icon: <IconEyeOff /> },
  { value: 'Выбор_4', icon: <IconBell /> },
  { value: 'Выбор_5', icon: <IconBriefcase /> },
  { value: 'Очень длиный текст, который не помещается в окно', icon: <IconCalendar /> },
];

const withWrapper = (Story: React.ComponentType) => (
  <div
    style={{
      backgroundColor: 'var(--white)',
      padding: '30px',
      borderRadius: '10px',
      width: '400px',
      height: '20vh'
    }}
  >
    {<Story />}
  </div>
);

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  args: {
    placeholder: 'Выберите опции',
    disabled: false,
    options: dropdownOptions,
    noOptionsText: 'Нет опций для выбора',
    label: 'Выпадающий список',
  },
  argTypes: {
    id: {
      description: 'Уникальный идентификатор',
    },
    label: {
      description: 'Лейбл селекта',
      control: { type: 'text' },
    },
    placeholder: {
      description: 'Подсказка',
      control: { type: 'text' },
    },
    size: {
      description: 'Размер селекта',
      control: { type: 'radio' },
      options: ['md', 'lg'],
    },
    options: {
      description: 'Список элементов',
    },
    value: {
      description: 'Значение',
    },
    defaultValue: {
      description: 'Значение по умолчанию',
    },
    variant: {
      description: 'Вариaнты выпадающего списка(текст + иконка, текст)',
      control: { type: 'select' },
      options: ['icons', 'text', 'filter'],
    },
    className: { description: 'Дополнительный CSS класс для обертки dropdown' },
    disabled: {
      description: 'Заблокированный инпут для изменений',
      control: { type: 'boolean' },
    },
    readOnly: {
      description: 'Только чтение',
      control: { type: 'boolean' },
    },
    isOpened: {
      description: 'Открытый по умолчанию',
      control: { type: 'boolean' },
    },
    noOptionsText: {
      description: 'Текст, показываемый при отсутствии опций',
      control: { type: 'text' },
    },
    isLeftLabel: {
      description: 'Левый лейбл',
      control: { type: 'boolean' },
    },
    error: {
      description: 'Ошибка',
      control: { type: 'boolean' },
    },
    helperText: {
      description: 'Текст ошибки',
      control: { type: 'text' },
    },
    onChange: {
      description: 'Callback, который будет вызван при изменении значения',
      action: 'changed',
    },
    showLoadMore: {
      description: 'Флаг, является ли выпадающий список пагинированным',
      control: { type: 'boolean' },
    },
    loadMore: {
      description: 'Callback для загрузки списка при пагинированных данных',
      action: 'loaded',
    },
    onClose: {
      description: 'Callback, который будет вызван при закрытии выпадающего списка',
      action: 'closed',
    },
    onClick: {
      description: 'Callback, который будет вызван при нажатии на выпадающий список',
      action: 'clicked',
    },
    onBlur: {
      description: 'Callback, который будет вызван при потере фокуса',
      action: 'blurred',
    },
    onFocus: {
      description: 'Callback, который будет вызван при получении фокуса',
      action: 'focused',
    },
    clearable: {
      description: 'Возможность сброса значения до первоначального значения',
      control: { type: 'boolean' },
    },
    required: {
      description: 'Обязательное поле',
      control: { type: 'boolean' },
    },
    enableAutocomplete: {
      description: 'Позволяет делать поиск по опциям ',
      control: { type: 'boolean' },
    },
    onSearch: {
      description: 'Callback, который будет вызван для получения данных поиска'
    },
    lng: {
      description: 'Язык',
      control: { type: 'radio' },
      options: ['ru', 'en'],
     },
    multiple: {
      description: 'Множественный выбор',
      control: { type: 'boolean' },
    }, 
    limitTags: {
      description: 'Количество видимых значений при множественном выборе',
      control: { type: 'number' }
    }
  },
};

export default meta;

// Дефолтный Dropdown
type DefaultOption = { value: string; icon?: JSX.Element; disabled?: boolean };

export const DropdownDefault = (argTypes: DropdownProps<DefaultOption>): JSX.Element => (
  <Dropdown {...argTypes} />
);
DropdownDefault.storyName = 'Dropdown по умолчанию';
DropdownDefault.args = {
  isOpened: false,
  options: dropdownOptions,
};
// Dropdown с выбором опций
export const DropdownChange = (argTypes: DropdownProps<DefaultOption>): JSX.Element => {
  const defaultOptions = [
    { id: '1', name: 'name 1', description: 'описание 1' },
    { id: '2', name: 'name 2', description: 'описание 2' },
    { id: '3', name: 'name 3', description: 'описание 3' },
  ];
  const [value, setValue] = useState<string | number | TOptions | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleChange = (e: any, value: string | number | TOptions | null) => {
    setValue(value);
    setIsOpened(false);
  };
  useEffect(() => {
    if (argTypes.error) setValue(null);
  }, [argTypes.error]);
  return (
    <div style={{ display: 'flex', gap: '30px' }}>
      <Dropdown
        {...argTypes}
        options={defaultOptions}
        getOptionLabel={(option: TOptions) => option.description}
        value={value}
        onChange={handleChange}
        isOpened={isOpened}
        required={true}
      />
    </div>
  );
};
DropdownChange.storyName = 'Dropdown изменяемый';
DropdownChange.parameters = {
  controls: { disable: true },
};

// Dropdown с множественным выбором опций
export const DropdownMultiple= (argTypes: DropdownProps<DefaultOption>): JSX.Element => {
  const defaultOptions = [
    { id: '1', name: 'name 1', description: 'описание 1' },
    { id: '2', name: 'name 2', description: 'описание 2' },
    { id: '3', name: 'name 3', description: 'описание 3' },
    { id: '4', name: 'name 1', description: 'описание 4' },
    { id: '5', name: 'name 2', description: 'описание 5' },
    { id: '6', name: 'name 3', description: 'очень длиный текст, который не помещается в окно' },
  ];
  const [value, setValue] = useState<TOptions[]>([]);
  const [isOpened, setIsOpened] = useState(false);

  const handleChange = (e: any, item: any) => {
    setValue(item);
  };
  useEffect(() => {
    if (argTypes.error) setValue([]);
  }, [argTypes.error]);

  return (
    <div style={{ display: 'flex', gap: '30px' }}>
      <Dropdown
        {...argTypes}
        options={defaultOptions}
        getOptionLabel={(option: TOptions) => option.description}
        value={value}
        onChange={handleChange}
        required={true}
        limitTags={2}
        multiple={true}
      />
    </div>
  );
};
DropdownMultiple.storyName = 'Dropdown с множественным выбором';
DropdownMultiple.parameters = {
  controls: { disable: true },
};

// Dropdown с ошибкой
export const DropdownWithError = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownWithError.storyName = 'Dropdown c ошибкой';
DropdownWithError.args = {
  isOpened: false,
  options: dropdownOptions,
  error: true,
  helperText: 'Необходимо выбрать значение',
};
DropdownWithError.parameters = {
  controls: { disable: true },
};

// Dropdown с иконкой открытый
export const DropdownOpenedDefault = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedDefault.storyName = 'Dropdown открытый с иконками по умолчанию';
DropdownOpenedDefault.args = {
  isOpened: true,
  variant: 'icons',
  options: dropdownOptions,
};
DropdownOpenedDefault.parameters = {
  controls: { disable: true },
};

// Dropdown c выбранным значением
export const DropdownOpenedDefaultSelected = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedDefaultSelected.storyName = 'Dropdown открытый с иконками по умолчанию c выбранным значением';
DropdownOpenedDefaultSelected.args = {
  defaultValue: { value: 'Выбор_2', icon: <IconAlarm /> },
  isOpened: true,
  variant: 'icons',
  options: dropdownOptions,
};
DropdownOpenedDefaultSelected.parameters = {
  controls: { disable: true },
};

// Dropdown без иконок по умолчанию
export const DropdownOpenedText = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedText.storyName = 'Dropdown открытый без иконок по умолчанию';
DropdownOpenedText.args = {
  isOpened: true,
};
DropdownOpenedText.parameters = {
  controls: { disable: true },
};

// Dropdown без иконок с выбранным значением
export const DropdownOpenedTextSelected = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownOpenedTextSelected.storyName = 'Dropdown открытый без иконок по умолчанию c выбранным значением';
DropdownOpenedTextSelected.args = {
  defaultValue: { value: 'Длиный тексттттттттттттттттттттт', icon: <IconCalendar /> },
  isOpened: true,
  variant: 'text',
  options: dropdownOptions,
};
DropdownOpenedTextSelected.parameters = {
  controls: { disable: true },
};

// Dropdown заблокированный
export const DropdownDisabled = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownDisabled.storyName = 'Dropdown заблокированный';
DropdownDisabled.args = {
  disabled: true,
  defaultValue: dropdownOptions.find((el) => el.value === 'Задизейбленный выбор'),
  isOpened: false,
  options: dropdownOptions,
};
DropdownDisabled.parameters = {
  controls: { disable: true },
};

// Dropdown только чтение
export const DropdownReadOnly = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownReadOnly.storyName = 'Dropdown только чтение';
DropdownReadOnly.args = {
  readOnly: true,
  defaultValue: { value: 'Только чтение' },
  isOpened: false,
  options: dropdownOptions,
};
DropdownReadOnly.parameters = {
  controls: { disable: true },
};

// Dropdown с лейблом
export const DropdownSelectVariantSelect = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownSelectVariantSelect.storyName = 'Dropdown селект c лейблом';
DropdownSelectVariantSelect.args = {
  label: 'Лейбл селекта',
  defaultValue: { value: 'Выбор_1', icon: <IconAccount /> },
  isOpened: false,
  options: dropdownOptions,
};
DropdownSelectVariantSelect.parameters = {
  controls: { disable: true },
};

// Dropdown с боковым лейблом
export const DropdownSelectVariantSelectLeftLabel = (argTypes: DropdownProps<DefaultOption>): JSX.Element => (
  <Dropdown {...argTypes} />
);
DropdownSelectVariantSelectLeftLabel.storyName = 'Dropdown селект c боковым лейблом';
DropdownSelectVariantSelectLeftLabel.args = {
  defaultValue: { value: 'Выбор_1', icon: <IconAccount /> },
  isOpened: false,
  options: dropdownOptions,
  label: 'Лейбл селекта',
  isLeftLabel: true,
  placeholder: 'Боковой лейбл',
};
DropdownSelectVariantSelectLeftLabel.parameters = {
  controls: { disable: true },
};

// Dropdown с поиском
export const DropdownAutocomplete = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownAutocomplete.storyName = 'Dropdown с поиском';
DropdownAutocomplete.args = {
  isOpened: false,
  options: dropdownOptions,
  label: 'Лейбл селекта',
  enableAutocomplete: true,
};
DropdownAutocomplete.parameters = {
  controls: { disable: true },
};

const complexNestedOptions = [
  {
    access: {
      id: '12345678-1234-1234-1234-123456789012',
      name: 'READ_ONLY',
      description: 'Только чтение',
    },
    active: true,
    createDate: '2024-02-15',
    creatorUser: {
      id: 'creator-002',
      login: 'petrov',
      firstName: 'Петр',
      lastName: 'Петров',
      middleName: 'Петрович',
      email: 'petrov@example.com',
      department: {
        id: 'dept-002',
        name: 'Marketing Department',
        manager: {
          id: 'mgr-002',
          name: 'Мария Сидорова',
          position: 'Marketing Director',
        },
      },
    },
    description: 'Marketing Space',
    groupMembers: [
      {
        id: 'group-002',
        name: 'Marketing Team',
        permissions: ['read', 'comment'],
      },
    ],
    iconName: 'MarketingIcon',
    id: 'marketing-space-001',
    key: 'marketing-space-001',
    name: 'Marketing Workspace',
    orgUnitMembers: [
      {
        id: 'org-unit-001',
        name: 'Regional Office',
        location: 'Moscow',
      },
    ],
    organization: {
      id: 'org-002',
      name: 'ООО "Маркетинг Плюс"',
      status: {
        id: 'status-002',
        name: 'Active',
        code: 'ACT',
      },
      inn: '7701234567',
      phoneNumber: '+7-495-123-45-67',
      address: {
        country: 'Russia',
        city: 'Moscow',
        street: 'Tverskaya',
        building: '10',
        coordinates: {
          lat: 55.7558,
          lng: 37.6176,
        },
      },
    },
    updateDate: '2024-04-25',
    userMembers: [
      {
        id: 'user-002',
        login: 'sidorova',
        profile: {
          firstName: 'Мария',
          lastName: 'Сидорова',
          avatar: 'avatar2.jpg',
          settings: {
            theme: 'light',
            language: 'ru',
            notifications: {
              email: true,
              push: true,
              sms: false,
            },
          },
        },
      },
    ],
  },
  {
    access: {
      id: 'access-003',
      name: 'ADMIN',
      description: 'Администратор',
    },
    active: true,
    createDate: '2024-01-10',
    creatorUser: {
      id: 'creator-003',
      login: 'admin',
      firstName: 'Администратор',
      lastName: 'Системы',
      middleName: '',
      email: 'admin@example.com',
      department: {
        id: 'dept-003',
        name: 'System Administration',
        manager: {
          id: 'mgr-003',
          name: 'Системный Администратор',
          position: 'System Admin',
        },
      },
    },
    description: 'Admin Control Panel',
    groupMembers: [],
    iconName: 'AdminIcon',
    id: 'admin-space-001',
    key: 'admin-space-001',
    name: 'Admin Panel',
    orgUnitMembers: [],
    organization: {
      id: 'org-003',
      name: 'Системная Организация',
      status: {
        id: 'status-003',
        name: 'System',
        code: 'SYS',
      },
      inn: '0000000000',
      phoneNumber: '+7-800-555-35-35',
      address: {
        country: 'Russia',
        city: 'System',
        street: 'Virtual',
        building: '0',
        coordinates: {
          lat: 0,
          lng: 0,
        },
      },
    },
    updateDate: '2024-04-28',
    userMembers: [
      {
        id: 'user-003',
        login: 'sysadmin',
        profile: {
          firstName: 'System',
          lastName: 'Administrator',
          avatar: 'admin.jpg',
          settings: {
            theme: 'system',
            language: 'en',
            notifications: {
              email: true,
              push: true,
              sms: true,
            },
          },
        },
      },
    ],
  },
];

// Dropdown со сложными вложенными объектами
export const DropdownComplexObjects = (argTypes: DropdownProps<DefaultOption>): JSX.Element => {
  const [value, setValue] = useState<string | number | TOptions | null>(null);

  const handleChange = (e: any, value: string | number | TOptions | null) => {
    setValue(value);
  };
  return (
    <Dropdown
      {...argTypes}
      options={complexNestedOptions}
      getOptionLabel={(option: TOptions) => option.organization.name}
      value={value}
      onChange={handleChange}
      placeholder="Выберите организацию"
      label="Организация"
    />
  );
};

DropdownComplexObjects.storyName = 'Dropdown со сложными объектами';
DropdownComplexObjects.parameters = {
  controls: { disable: true },
};

const optionsWithNestedValue = [
  {
    id: '1',
    name: 'Option 1',
    value: [
      {
        id: 'nested-1',
        name: 'Nested Option 1',
        description: 'This is nested',
      },
      {
        id: 'nested-2',
        name: 'Nested Option 2',
        description: 'This is another nested',
      },
    ],
    icon: <IconAccount />,
  },
  {
    id: '2',
    name: 'Option 2',
    value: 'Simple string value',
    icon: <IconAlarm />,
  },
  {
    id: '3',
    name: 'Option 3',
    value: [
      {
        id: 'nested-3',
        name: 'Nested Option 3',
        description: 'Another nested option',
      },
      {
        id: 'nested-4',
        name: 'Nested Option 4',
        description: 'Yet another nested option',
        icon: <IconBell />,
      },
      {
        id: 'nested-5',
        name: 'Nested Option 5',
        description: 'Yet another nested option',
        icon: <IconBell />,
      },
    ],

    icon: <IconBell />,
  },
];

export const DropdownNestedValue = (argTypes: DropdownProps<DefaultOption>): JSX.Element => {
  const [value, setValue] = useState<string | number | TOptions | null>(null);

  const handleChange = (e: any, value: string | number | TOptions | null) => {
    setValue(value);
  };

  return (
    <Dropdown
      {...argTypes}
      options={optionsWithNestedValue}
      value={value}
      onChange={handleChange}
      placeholder="Выберите опцию с вложенным заначением"
      label="Вложенное значение"
      variant="icons"
    />
  );
};

DropdownNestedValue.storyName = 'Dropdown с вложенным значением';
DropdownNestedValue.parameters = {
  controls: { disable: true },
};


export const DropdownFilter = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownFilter.storyName = 'Dropdown для фильтрации';
DropdownFilter.args = {
  isOpened: false,
  options: dropdownOptions,
  label: 'Лейбл селекта',
  variant: 'filter',
  enableAutocomplete: true,
};
DropdownFilter.parameters = {
  controls: { disable: true },
};



const optionsPaginated = [
  { value: 'Элемент 1', icon: <IconAccount /> },
  { value: 'Элемент 2', icon: <IconAlarm /> },
  { value: 'Элемент 3', icon: <IconBell /> },
  { value: 'Элемент 4', icon: <IconBriefcase /> },
  { value: 'Элемент 5', icon: <IconAccount /> },
  { value: 'Элемент 6', icon: <IconAlarm /> },
  { value: 'Элемент 7', icon: <IconBell /> },
  { value: 'Элемент 8', icon: <IconBriefcase /> },
  { value: 'Элемент 9', icon: <IconAccount /> },
  { value: 'Элемент 10', icon: <IconAlarm /> },
  { value: 'Элемент 11', icon: <IconBell /> },
  { value: 'Элемент 12', icon: <IconBriefcase /> },
  { value: 'Элемент 13', icon: <IconAccount /> },
  { value: 'Элемент 14', icon: <IconAlarm /> },
  { value: 'Элемент 15', icon: <IconBell /> },
  { value: 'Элемент 16', icon: <IconBriefcase /> },
  { value: 'Элемент 17', icon: <IconAccount /> },
  { value: 'Элемент 18', icon: <IconAlarm /> },
  { value: 'Элемент 19', icon: <IconBell /> },
  { value: 'Элемент 20', icon: <IconBriefcase /> },
  { value: 'Элемент 21', icon: <IconAccount /> },
  { value: 'Элемент 22', icon: <IconAlarm /> },
  { value: 'Элемент 23', icon: <IconBell /> },
  { value: 'Элемент 24', icon: <IconBriefcase /> },
  { value: 'Элемент 25', icon: <IconAccount /> },
  { value: 'Элемент 26', icon: <IconAlarm /> },
  { value: 'Элемент 27', icon: <IconBell /> },
  { value: 'Элемент 28', icon: <IconBriefcase /> },
  { value: 'Элемент 29', icon: <IconAccount /> },
  { value: 'Элемент 30', icon: <IconAlarm /> }
]
// Dropdown с подгрузкой значений
export const DropdownWithPaginatedData = (argTypes: DropdownProps<DefaultOption>): JSX.Element => {
  const [value, setValue] = useState<string | number | TOptions | null>(null);
  const [currentOptions, setCurrentOptions] = useState(optionsPaginated.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: any, value: string | number | TOptions | null) => {
    setValue(value);
  };

  const handleLoadMore = () => {
    setIsLoading(true);

    setTimeout(() => {
      setCurrentOptions((prevOptions) => {
      const nextIndex = prevOptions.length;
      const nextBatch = optionsPaginated.slice(nextIndex, nextIndex + 10);
      
      if (nextBatch.length > 0) {
        const newTotalLength = prevOptions.length + nextBatch.length;
        
        if (newTotalLength >= optionsPaginated.length) {
          setHasMore(false);
        }
        
        return [...prevOptions, ...nextBatch];
      }
      
      return prevOptions;
    });

    setIsLoading(false);
  }, 1000);
};


  return (
    <Dropdown
      {...argTypes}
      options={currentOptions}
      value={value}
      onChange={handleChange}
      showLoadMore={hasMore}
      loadMore={handleLoadMore}
      isSearchLoading={isLoading}
      placeholder="Выберите элемент"
      label="Пагинированный список"
      variant="icons"
    />
  );
};
DropdownWithPaginatedData.storyName = 'Dropdown с пагинацией';

DropdownWithPaginatedData.parameters = {
  controls: { disable: true },
};


const englishDropdown = [
  { value: 'Select 1', icon: <IconAccount /> },
  { value: 'Select 2', icon: <IconAlarm /> },
  { value: 'Disabled select', disabled: true, icon: <IconEyeOff /> },
  { value: 'Select 4', icon: <IconBell /> },
  { value: 'Select 5', icon: <IconBriefcase /> },
];

export const DropdownEnglish = (argTypes: DropdownProps<DefaultOption>): JSX.Element => <Dropdown {...argTypes} />;
DropdownEnglish.storyName = 'Dropdown на английском';
DropdownEnglish.args = {
  placeholder: 'Select option',
  isOpened: false,
  options: englishDropdown,
  label: 'Label',
  enableAutocomplete: true,
  lng: 'en'
};

DropdownEnglish.parameters = {
  controls: { disable: true },
};