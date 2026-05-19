import React from 'react';
import type { Meta } from '@storybook/react';
import { DateInput } from './DateInput'
import { DateInputProps } from '../../types'

const meta: Meta<DateInputProps> = {
  component: DateInput,
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
				width: '300px'
			}}
		>
			<Story />
	  	</div>
	),
  ],
  args: {
	disabled: false,
	testId: 'storybook'
  },
  argTypes: {
	disabled: { description: 'Устанавливает атрибут disabled', control: { type: 'boolean' } },
	readOnly: { description: 'Устанавливает атрибут readOnly', control: { type: 'boolean' } },
	value: { description: 'Передает значение даты' }
  },
};

export default meta;

export const DateInputDefault = (argTypes: DateInputProps): JSX.Element => <DateInput {...argTypes} />;
DateInputDefault.storyName = 'Date Input по умолчанию';
DateInputDefault.args = {
	disabled: false
};

export const DateInputWithValue = (argTypes: DateInputProps): JSX.Element => <DateInput {...argTypes} />;
DateInputWithValue.storyName = 'Date Input с переданным значением';
DateInputWithValue.args = {
	value: new Date()
};

export const DateInputDisabled = (argTypes: DateInputProps): JSX.Element => <DateInput {...argTypes} />;
DateInputDisabled.storyName = 'Date Input заблокированный';
DateInputDisabled.args = {
	disabled: true,
	value: new Date()
};

export const DateInputReadOnly = (argTypes: DateInputProps): JSX.Element => <DateInput {...argTypes} />;
DateInputReadOnly.storyName = 'Date Input только для чтения';
DateInputReadOnly.args = {
	readOnly: true,
	value: new Date()
};

export const DateInputError = (argTypes: DateInputProps): JSX.Element => <DateInput {...argTypes} />;
DateInputError.storyName = 'Date Input с ошибкой';
DateInputError.args = {
	error: true,
	helperText: 'Сообщение об ошибке',
	value: new Date()
};

export const DateInputEn = (argTypes: DateInputProps): JSX.Element => <DateInput {...argTypes} />;
DateInputEn.storyName = 'Date Input локализованный en-EN';
DateInputEn.args = {
	lng: 'en',
	label: 'Select a date',
	dateFormat: 'dd-MM-yyyy hh:mm',
	value: new Date()
};
