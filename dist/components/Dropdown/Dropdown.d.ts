import React from 'react';
import { DropdownProps, BaseOptions } from '../../types';
/**
 * Компонент Dropdown позволяет пользователям выбирать однин вариант из выпадающего меню
 */
export interface DropdownListItemProps<T extends BaseOptions> {
    item: T | null;
    getOptionLabel?: (option: T) => string;
    size: 'md' | 'lg';
    selectedItem: T | null | T[];
    variant?: 'icons' | 'text' | 'filter';
    onChange: (event: React.MouseEvent<HTMLElement>, item: T | null) => void;
    isActive?: boolean;
    activeIndex?: number;
    index?: number;
    isChild?: boolean;
}
export declare const DropdownListItem: <T extends BaseOptions>({ item, getOptionLabel, size, selectedItem, variant, onChange, isActive, activeIndex, index, isChild, }: DropdownListItemProps<T>) => React.JSX.Element;
export declare const Dropdown: <T extends BaseOptions>({ options, id, label, placeholder, required, value, defaultValue, onChange, showLoadMore, loadMore, getOptionLabel, variant, size, style, className, isLeftLabel, isDivider, disabled, readOnly, isOpened, error, helperText, onOpen, onClick, onBlur, onFocus, onClose, clearable, enableAutocomplete, onSearch, isLoadMoreLoading, isSearchLoading, noOptionsText, lng, multiple, limitTags, }: DropdownProps<T>) => React.JSX.Element;
