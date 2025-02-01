import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ColorPicker, ColorPickerProps } from './ColorPicker';
import styles from './ColorPicker.module.css';

const withWrapper = (Story: any) => <div className={styles[`story--wrapper`]}>{<Story />}</div>;


const colorsOptions = [ '#ff9500', '#ffcc00', '#34c759', '#30b0c7', '#007aff', '#5856d6', '#af52de', '#FF2D55']

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withWrapper],
  argTypes: {
    color: {
      description: 'Цвет выбранный пользователем',
      control: 'color',
    },
    mainColor: {
      description: 'Основной цвет',
      control: 'color',
    },
    recentColors: {
      description: 'Последние использованные цвета',
      options: colorsOptions,
      mapping: colorsOptions,
    },
    setIsHovered: {
      description: 'Задает флаг наведения на меню',
    },
    width: {
      description: 'Ширина ColorPicker',
      control: 'number',
    },
    height: {
      description: 'Высота ColorPicker',
      control: 'number',
    },
    autoOpen: {
      description: 'Автофокус ColorPicker',
      control: 'boolean',
    },
    onChange: {
      description: 'Callback, который будет вызван при выборе цвета',
       action: 'Color changed' },
  },

};
export default meta;

// Дефолтный ColorPicker
export const ColorPickerDefault = (argTypes: ColorPickerProps): JSX.Element => {
  return (
    <div style={{display: 'flex', gap: '20px'}}>
     <ColorPicker {...argTypes} autoOpen={true} /> 
    </div>
   )
   
}

ColorPickerDefault.storyName = 'ColorPicker по умолчанию';
ColorPickerDefault.args = {
  width: 20,
  height: 20,
  // onChange: (color: string) => console.log('Color changed:', color),
};


//Предустановленный цвет
export const ColorPickerColorSet = (argTypes: ColorPickerProps): JSX.Element => {
  return (
    <div style={{display: 'flex', gap: '20px', flexDirection: 'column'}}>
     <ColorPicker {...argTypes} mainColor='#ff3b30' recentColors={colorsOptions}/>
     <ColorPicker {...argTypes} mainColor='#007aff'/>
     <ColorPicker {...argTypes} />
    </div>
   
  )
};
ColorPickerColorSet.storyName = 'ColorPicker c вариантами настроек предустановленных цветов';
ColorPickerColorSet.parameters = {
  controls: { disable: true },
};

