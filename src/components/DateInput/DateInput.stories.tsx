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
	  <div style={{
		backgroundColor: 'var(--white)',
		padding: '30px',
		borderRadius: '10px',
		width: '900px'}}>
		<Story />
	  </div>
	),
  ],
  args: {
	disabled: false,
  },
  argTypes: {
	disabled: { description: 'Устанавливает атрибут disabled', control: { type: 'boolean' } },
  },
};

export default meta;

export const DateInputDefault = (argTypes: DateInputProps): JSX.Element => <DateInput {...argTypes} />;
DateInputDefault.storyName = 'Date Input по умолчанию';
DateInputDefault.args = {
	disabled: false
};

export const DateInputDisabled = (argTypes: DateInputProps): JSX.Element => <DateInput {...argTypes} />;
DateInputDisabled.storyName = 'Date Input заблокированный';
DateInputDisabled.args = {
	disabled: true
};

export const DateInputError = (argTypes: DateInputProps): JSX.Element => <DateInput {...argTypes} />;
DateInputError.storyName = 'Date Input с ошибкой';
DateInputError.args = {
	error: true,
	helperText: 'Сообщение об ошибке'
};
