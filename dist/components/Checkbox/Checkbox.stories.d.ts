import { ChangeEventHandler } from 'react';
import type { Meta } from '@storybook/react';
export interface CheckboxProps {
    /** Идентификатор */
    checked?: boolean;
    /** Обработчик изменения состояния */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /** Заблокированный чекбокс */
    disabled?: boolean;
    /** Размер чекбокса */
    size?: 'sm' | 'md';
    /** Текст лейбла */
    label?: string;
}
declare const meta: Meta<CheckboxProps>;
export default meta;
export declare const CheckboxOff: {
    (argTypes: CheckboxProps): JSX.Element;
    storyName: string;
};
export declare const CheckboxLabel: {
    (argTypes: CheckboxProps): JSX.Element;
    storyName: string;
    args: {
        label: string;
    };
};
export declare const CheckboxChecked: {
    (argTypes: CheckboxProps): JSX.Element;
    storyName: string;
    args: {
        checked: boolean;
        disabled: boolean;
    };
};
export declare const CheckboxDisabled: {
    (argTypes: CheckboxProps): JSX.Element;
    storyName: string;
    args: {
        checked: boolean;
        disabled: boolean;
    };
};
export declare const CheckboxCheckedDisabled: {
    (argTypes: CheckboxProps): JSX.Element;
    storyName: string;
    args: {
        checked: boolean;
        disabled: boolean;
    };
};
export declare const CheckboxCustomColor: {
    (argTypes: CheckboxProps): JSX.Element;
    storyName: string;
    args: {
        color: string;
    };
};
export declare const CheckboxCustomColorFilled: {
    (argTypes: CheckboxProps): JSX.Element;
    storyName: string;
    args: {
        color: string;
        filled: boolean;
    };
};
