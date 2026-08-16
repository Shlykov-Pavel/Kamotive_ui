import React, { ReactNode } from 'react';
import { DropdownProps, BaseOptions, DropdownHandle } from '../../types';
/**
 * Компонент Dropdown позволяет пользователям выбирать однин вариант из выпадающего меню
 */
export interface DropdownListItemProps<T extends BaseOptions> {
    item: T | null;
    getOptionLabel?: (option: T) => string;
    renderOption?: (item: T) => ReactNode;
    size: 'md' | 'lg';
    selectedItem: T | null | T[];
    variant?: 'icons' | 'text' | 'filter';
    onChange: (event: React.MouseEvent<HTMLElement>, item: T | null) => void;
    isActive?: boolean;
    activeIndex?: number;
    index?: number;
    isChild?: boolean;
    testId?: string;
}
export declare const DropdownListItem: <T extends BaseOptions>({ item, getOptionLabel, renderOption, size, selectedItem, variant, onChange, isActive, activeIndex, index, isChild, testId }: DropdownListItemProps<T>) => React.JSX.Element;
export declare const Dropdown: <T extends BaseOptions>(props: DropdownProps<T> & {
    ref?: React.ForwardedRef<DropdownHandle>;
}) => React.ReactElement;
