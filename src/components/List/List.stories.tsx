import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { List } from './List';
import { ListProps } from '../../types/index';
import { ListItem } from '../ListItem/ListItem';
import { FileItem } from '../FileItem/FileItem';

const meta: Meta<ListProps> = {
  component: List,
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
    collapsible: false,
    withCheckbox: false,
    withRadioButton: false,
    checkboxFilled: false,
    isHeader: false,
    open: true,
  },
  argTypes: {
    collapsible: { description: 'Возможность раскрытия списка', control: { type: 'boolean' } },
    withCheckbox: { description: 'Чекбокс вместо буллита', control: { type: 'boolean' } },
    checkboxColor: { description: 'Цвет чекбокса', type: 'string' },
    checkboxFilled: { description: 'Заливка чекбокса', control: { type: 'boolean' } },
    withRadioButton: { description: 'RadioButton вместо буллита', control: { type: 'boolean' } },
    isHeader: { description: 'Убирает буллиты у заголовка', control: { type: 'boolean' } },
  },
};

export default meta;

export const ListDefault = (argTypes: ListProps) => {
  return (
    <div>
      <List label="Fruits" customBullet="•" {...argTypes}>
        <ListItem label="Apple" />
        <ListItem label="Banana" />
        <List label="Berry Types">
          <ListItem label="Strawberry" />
          <ListItem label="Blueberry" />
        </List>
      </List>
    </div>
  );
};
ListDefault.storyName = 'List с тремя уровнями вложенности';

export const ListCollapsible = (argTypes: ListProps) => {
  return (
    <div>
      <List label="Fruits" customItemBullet="•" {...argTypes}>
        <ListItem label="Apple" />
        <ListItem label="Banana" />
        <List label="Berry Types" {...argTypes}>
          <ListItem label="Strawberry" />
          <ListItem label="Blueberry" />
        </List>
      </List>
    </div>
  );
};
ListCollapsible.storyName = 'List раскрываемый';
ListCollapsible.args = {
  collapsible: true,
};

export const ListWithDifferentBullets = (argTypes: ListProps) => {
  return (
    <div>
      <List label="Fruits" customBullet="•" customItemBullet="-" {...argTypes}>
        <ListItem label="Apple" />
        <ListItem label="Banana" />
        <List label="Berry Types" customBullet="-" customItemBullet=" " {...argTypes}>
          <ListItem label="Strawberry" />
          <ListItem label="Blueberry" />
        </List>
      </List>
    </div>
  );
};
ListWithDifferentBullets.storyName = 'List с разными буллитами';
ListWithDifferentBullets.args = {
  collapsible: true,
};

export const ListWithCheckbox = (argTypes: ListProps) => {
  const handleCheckedItems = (checkedItems: string | string[], isChecked: boolean) => {};

  return (
    <List id="documents" label="Documents" onCheck={handleCheckedItems} checkboxColor="var(--red)" {...argTypes}>
      <ListItem label="Document 1" id="doc1" checkboxColor="var(--orange)" />
      <ListItem label="Document 2" id="doc2" checkboxColor="var(--yellow)" />
      <List label="Images" id="images" checkboxColor="var(--green)" {...argTypes}>
        <ListItem label="Image 1" id="img1" checkboxColor="var(--blue)" />
        <ListItem label="Image 2" id="img2" checkboxColor="var(--purple)" />
      </List>
    </List>
  );
};
ListWithCheckbox.storyName = 'List с Checkbox';
ListWithCheckbox.args = {
  collapsible: true,
  withCheckbox: true,
  color: 'red',
  checkboxFilled: true,
};

export const ListWithRadioButton = (argTypes: ListProps) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleRadioSelect = (id: string) => {
    setSelectedItemId(id);
  };

  return (
    <List
      label="Options"
      id="options"
      selected={selectedItemId === 'options'}
      onRadioSelect={handleRadioSelect}
      style={{ gap: '5px' }}
      {...argTypes}
    >
      <ListItem label="Option 1" id="option1" selected={selectedItemId === 'option1'} />
      <ListItem label="Option 2" id="option2" selected={selectedItemId === 'option2'} />
      <List label="More Options" id="more-options" selected={selectedItemId === 'more-options'} {...argTypes}>
        <ListItem label="Option 3" id="option3" selected={selectedItemId === 'option3'} />
        <ListItem label="Option 4" id="option4" selected={selectedItemId === 'option4'} />
      </List>
      <ListItem label="Option 5" id="option5" selected={selectedItemId === 'option5'} />
    </List>
  );
};
ListWithRadioButton.storyName = 'List с RadioButton';
ListWithRadioButton.args = {
  collapsible: true,
  withRadioButton: true,
};

export const ListRadioButtonWithHeader = (argTypes: ListProps) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleRadioSelect = (id: string) => {
    setSelectedItemId(id);
  };

  return (
    <List label="Options" onRadioSelect={handleRadioSelect} {...argTypes} style={{ gap: '5px' }}>
      <ListItem label="Option 1" id="option1" selected={selectedItemId === 'option1'} />
      <ListItem label="Option 2" id="option2" selected={selectedItemId === 'option2'} />
      <List label="More Options" id="more-options" selected={selectedItemId === 'more-options'} collapsible>
        <ListItem label="Option 3" id="option3" selected={selectedItemId === 'option3'} />
        <ListItem label="Option 4" id="option4" selected={selectedItemId === 'option4'} />
      </List>
      <ListItem label="Option 5" id="option5" selected={selectedItemId === 'option5'} />
    </List>
  );
};
ListRadioButtonWithHeader.storyName = 'List с RadioButton с заголовком';
ListRadioButtonWithHeader.args = {
  collapsible: true,
  withRadioButton: true,
  isHeader: true,
};

// export const ListItemsWithChildren = (argTypes: ListProps) => {
//   return (
//     <div>
//       <List {...argTypes}>
//         <ListItem>
//           <FileItem name="file123.docx" size={5679} style={{ width: '250px' }} />
//         </ListItem>
//         <ListItem>
//           <FileItem name="file12.pdf" size={10031} style={{ width: '250px' }} />
//         </ListItem>
//       </List>
//     </div>
//   );
// };
// ListItemsWithChildren.storyName = 'List файлов без заголовка';
// ListItemsWithChildren.args = {};
