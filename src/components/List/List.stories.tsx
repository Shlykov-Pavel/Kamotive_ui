import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { List } from './List';
import { ListProps } from '../../types/index';
import { ListItem } from '../ListItem/ListItem';
import { Loader } from '../Loader/Loader';

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
  argTypes: {},
};

export default meta;

export const ListDefault = () => {
  return (
    <div>
      <List label="Fruits" customBullet="•">
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

export const ListCollapsible = () => {
  return (
    <div>
      <List label="Fruits" customItemBullet="•" collapsible>
        <ListItem label="Apple" />
        <ListItem label="Banana" />
        <List label="Berry Types" collapsible>
          <ListItem label="Strawberry" />
          <ListItem label="Blueberry" />
        </List>
      </List>
    </div>
  );
};
ListCollapsible.storyName = 'List раскрываемый';

export const ListWithDifferentBullets = () => {
  return (
    <div>
      <List label="Fruits" customBullet="•" customItemBullet="-" collapsible>
        <ListItem label="Apple" />
        <ListItem label="Banana" />
        <List label="Berry Types" customBullet="-" customItemBullet=" " collapsible>
          <ListItem label="Strawberry" />
          <ListItem label="Blueberry" />
        </List>
      </List>
    </div>
  );
};
ListWithDifferentBullets.storyName = 'List с разными буллитами';

export const ListWithCheckbox = () => {
  const handleCheckedItems = (checkedItems: string | string[], isChecked: boolean) => {
    console.log(checkedItems);
  };

  return (
    <List id="documents" label="Documents" withCheckbox onCheck={handleCheckedItems} collapsible>
      <ListItem label="Document 1" id="doc1" />
      <ListItem label="Document 2" id="doc2" />
      <List label="Images" id="images" withCheckbox collapsible>
        <ListItem label="Image 1" id="img1" />
        <ListItem label="Image 2" id="img2" />
      </List>
    </List>
  );
};
ListWithCheckbox.storyName = 'List с Checkbox';

export const ListWithRadioButton = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleRadioSelect = (id: string) => {
    setSelectedItemId(id);
    console.log(`Selected item: ${id}`);
  };

  return (
    <List
      label="Options"
      id="options"
      withRadioButton
      selected={selectedItemId === 'options'}
      onRadioSelect={handleRadioSelect}
    >
      <ListItem label="Option 1" id="option1" selected={selectedItemId === 'option1'} />
      <ListItem label="Option 2" id="option2" selected={selectedItemId === 'option2'} />
      <List label="More Options" id="more-options" selected={selectedItemId === 'more-options'}>
        <ListItem label="Option 3" id="option3" selected={selectedItemId === 'option3'} />
        <ListItem label="Option 4" id="option4" selected={selectedItemId === 'option4'} />
      </List>
      <ListItem label="Option 5" id="option5" selected={selectedItemId === 'option5'} />
    </List>
  );
};
ListWithRadioButton.storyName = 'List с RadioButton';

export const ListRadioButtonWithHeader = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleRadioSelect = (id: string) => {
    setSelectedItemId(id);
    console.log(`Selected item: ${id}`);
  };

  return (
    <List label="Options" isHeader withRadioButton onRadioSelect={handleRadioSelect}>
      <ListItem label="Option 1" id="option1" selected={selectedItemId === 'option1'} />
      <ListItem label="Option 2" id="option2" selected={selectedItemId === 'option2'} />
      <List label="More Options" id="more-options" selected={selectedItemId === 'more-options'}>
        <ListItem label="Option 3" id="option3" selected={selectedItemId === 'option3'} />
        <ListItem label="Option 4" id="option4" selected={selectedItemId === 'option4'} />
      </List>
      <ListItem label="Option 5" id="option5" selected={selectedItemId === 'option5'} />
    </List>
  );
};
ListRadioButtonWithHeader.storyName = 'List с RadioButton с заголовком';

export const ListItemsWithChildren = () => {
  return (
    <div>
      <List>
        <ListItem>
          <Loader name="file123.docx" size={5679} />
        </ListItem>
        <ListItem>
          <Loader name="file12.pdf" size={10031} />
        </ListItem>
      </List>
    </div>
  );
};
ListItemsWithChildren.storyName = 'List файлов без заголовка';
