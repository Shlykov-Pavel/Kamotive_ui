import React, { FC } from 'react';
import { DropdownProps, TOptions } from '../../types';
/**
 * Компонент Dropdown позволяет пользователям выбирать однин вариант из выпадающего меню
 */
export interface DropdownListItemProps {
    item: TOptions | null;
    getOptionLabel?: (option: TOptions) => string;
    size: 'md' | 'lg';
    selectedItem: TOptions | null;
    variant?: 'icons' | 'text';
    onChange: (event: React.MouseEvent<HTMLElement>, item: TOptions | null) => void;
    isActive?: boolean;
    activeIndex?: number;
    index?: number;
    isChild?: boolean;
}
export declare const DropdownListItem: FC<DropdownListItemProps>;
export declare const Dropdown: FC<DropdownProps>;
