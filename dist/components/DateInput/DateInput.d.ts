import { FC } from 'react';
import { DateInputProps } from '../../types';
import 'react-datepicker/dist/react-datepicker.css';
interface CustomDatePickerProps {
    minDate?: Date;
    maxDate?: Date;
    inputClassName?: string;
    calendarClassName?: string;
    dateFormat?: string;
}
export declare const DateInput: FC<DateInputProps & CustomDatePickerProps>;
export {};
