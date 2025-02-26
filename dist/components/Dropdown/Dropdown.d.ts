import { FC } from 'react';
import { DropdownProps } from 'kamotive_ui';
/**
 * Компонент Dropdown позволяет пользователям выбирать однин вариант из выпадающего меню
*/
export interface DropdownListItemProps {
    item: DropdownProps['items'][number];
    size: 'sm' | 'md' | 'lg';
    selectedItem: DropdownProps['items'][number] | null | string | number;
    style?: 'default' | 'text';
    onChange: (value: DropdownProps['items'][number]) => void;
}
export declare const DropdownListItem: FC<DropdownListItemProps>;
export declare const Dropdown: FC<DropdownProps>;
