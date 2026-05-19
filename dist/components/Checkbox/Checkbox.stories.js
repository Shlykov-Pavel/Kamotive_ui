import React, { useState } from 'react';
import { Checkbox } from './Checkbox';
const meta = {
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (React.createElement("div", { style: {
                backgroundColor: 'var(--white)',
                padding: '30px',
                borderRadius: '10px',
                width: '900px'
            } },
            React.createElement(Story, null))),
    ],
    args: {
        size: 'sm',
        disabled: false,
        testId: 'storybook'
    },
    argTypes: {
        size: {
            description: 'Свойство, позволяющее регулировать размер чекбокса',
            control: { type: 'radio' },
            options: ['sm', 'md'],
        },
        disabled: { description: 'Устанавливает атрибут disabled', control: { type: 'boolean' } },
        checked: { description: 'Задаёт включённое состояние для компонента' },
        label: { description: 'Текст лейбла чекбокса', type: 'string' },
    },
};
export default meta;
export const CheckboxOff = (argTypes) => {
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(prev => !prev);
    };
    return (React.createElement(Checkbox, Object.assign({ checked: checked, onChange: handleChange }, argTypes)));
};
CheckboxOff.storyName = 'Checkbox по умолчанию';
export const CheckboxLabel = (argTypes) => React.createElement(Checkbox, Object.assign({}, argTypes));
CheckboxLabel.storyName = 'Checkbox c label';
CheckboxLabel.args = {
    label: 'Чекбокс',
};
export const CheckboxChecked = (argTypes) => React.createElement(Checkbox, Object.assign({}, argTypes));
CheckboxChecked.storyName = 'Checkbox выбран';
CheckboxChecked.args = {
    checked: true,
    disabled: false,
};
export const CheckboxDisabled = (argTypes) => React.createElement(Checkbox, Object.assign({}, argTypes));
CheckboxDisabled.storyName = 'Checkbox заблокирован';
CheckboxDisabled.args = {
    checked: false,
    disabled: true,
};
export const CheckboxCheckedDisabled = (argTypes) => React.createElement(Checkbox, Object.assign({}, argTypes));
CheckboxCheckedDisabled.storyName = 'Checkbox выбран и заблокирован';
CheckboxCheckedDisabled.args = {
    checked: true,
    disabled: true,
};
export const CheckboxCustomColor = (argTypes) => React.createElement(Checkbox, Object.assign({}, argTypes));
CheckboxCustomColor.storyName = 'Checkbox с кастомным цветом';
CheckboxCustomColor.args = {
    color: 'red',
};
export const CheckboxCustomColorFilled = (argTypes) => React.createElement(Checkbox, Object.assign({}, argTypes));
CheckboxCustomColorFilled.storyName = 'Checkbox с кастомным цветом заполненный';
CheckboxCustomColorFilled.args = {
    color: 'red',
    filled: true,
};
