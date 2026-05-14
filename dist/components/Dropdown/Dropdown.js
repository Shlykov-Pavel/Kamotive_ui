import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';
import { ChevronDown } from '../../Icons/ChevronDown/ChevronDown';
import { ChevronUp } from '../../Icons/ChevronUp/ChevronUp';
import { IconClose } from '../../Icons/IconClose/IconClose';
import { IconCheck } from '../../Icons/IconCheck/IconCheck';
import { Typography } from '../Typography/Typography';
import { Tooltip } from '../Tooltip/Tooltip';
import { Spinner } from '../Spinner/Spinner';
import { Button } from '../Button/Button';
const isTextOverflowing = (element) => {
    if (!element)
        return false;
    return element.scrollWidth > element.clientWidth;
};
const getComparisonValue = (item, getOptionLabel) => {
    if (!item)
        return null;
    if (getOptionLabel && typeof getOptionLabel === 'function') {
        return getOptionLabel(item);
    }
    if (item && typeof item === 'object') {
        if ('value' in item)
            return item.value;
        if ('id' in item)
            return item.id;
    }
    return item;
};
const getItemId = (item) => {
    if (!item || typeof item !== 'object')
        return null;
    if ('id' in item)
        return item.id;
    return null;
};
function checkItem(item, getOptionLabel, disabled, isDivider) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    if (typeof item === 'string' || typeof item === 'number') {
        return { value: item, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false };
    }
    if (typeof item === 'object' && item !== null) {
        const itemCopy = Object.assign({}, item);
        // Проверяем только поле value на вложенные объекты
        if (getOptionLabel) {
            const labelResult = getOptionLabel(item);
            // Если getOptionLabel возвращает массив
            if (Array.isArray(labelResult)) {
                if (!itemCopy.children) {
                    itemCopy.children = [];
                }
                labelResult.forEach((labelItem) => {
                    const processedLabelItem = checkItem(labelItem, getOptionLabel, disabled, isDivider);
                    if (processedLabelItem) {
                        itemCopy.children.push(processedLabelItem);
                    }
                });
                // Для родительского элемента используем первый элемент массива или name
                const displayValue = labelResult.length > 0
                    ? typeof labelResult[0] === 'object'
                        ? labelResult[0].name || labelResult[0].value || 'Группа'
                        : labelResult[0]
                    : itemCopy.name || 'Группа опций';
                return Object.assign(Object.assign({}, itemCopy), { value: displayValue, disabled: (_b = (_a = itemCopy.disabled) !== null && _a !== void 0 ? _a : disabled) !== null && _b !== void 0 ? _b : false, isDivider: (_d = (_c = itemCopy.isDivider) !== null && _c !== void 0 ? _c : isDivider) !== null && _d !== void 0 ? _d : false });
            }
            else {
                // Обычная обработка, если getOptionLabel возвращает строку
                return Object.assign(Object.assign({}, itemCopy), { value: labelResult, disabled: (_f = (_e = itemCopy.disabled) !== null && _e !== void 0 ? _e : disabled) !== null && _f !== void 0 ? _f : false, isDivider: (_h = (_g = itemCopy.isDivider) !== null && _g !== void 0 ? _g : isDivider) !== null && _h !== void 0 ? _h : false });
            }
        }
        if (!getOptionLabel && 'value' in itemCopy && itemCopy.value !== null && !React.isValidElement(itemCopy.value)) {
            if (Array.isArray(itemCopy.value)) {
                if (!itemCopy.children) {
                    itemCopy.children = [];
                }
                // Обрабатываем каждый элемент массива
                itemCopy.value.forEach((nestedItem) => {
                    const processedNestedItem = checkItem(nestedItem, getOptionLabel, disabled, isDivider);
                    if (processedNestedItem) {
                        itemCopy.children.push(processedNestedItem);
                    }
                });
                // Для родительского элемента используем name или первое значение
                itemCopy.value = itemCopy.name || 'Группа опций';
            }
            else if (typeof itemCopy.value === 'object') {
                const nestedItem = checkItem(itemCopy.value, getOptionLabel, disabled, isDivider);
                if (nestedItem) {
                    if (!itemCopy.children) {
                        itemCopy.children = [];
                    }
                    itemCopy.children.push(nestedItem);
                    // Заменяем value на обработанное значение
                    itemCopy.value = nestedItem.value;
                }
            }
        }
        if ('value' in itemCopy) {
            return Object.assign(Object.assign({}, itemCopy), { disabled: (_k = (_j = itemCopy.disabled) !== null && _j !== void 0 ? _j : disabled) !== null && _k !== void 0 ? _k : false, isDivider: (_m = (_l = itemCopy.isDivider) !== null && _l !== void 0 ? _l : isDivider) !== null && _m !== void 0 ? _m : false });
        }
        else if ('name' in itemCopy && !('value' in itemCopy)) {
            return Object.assign(Object.assign({}, itemCopy), { value: itemCopy.name, disabled: (_p = (_o = itemCopy.disabled) !== null && _o !== void 0 ? _o : disabled) !== null && _p !== void 0 ? _p : false, isDivider: (_r = (_q = itemCopy.isDivider) !== null && _q !== void 0 ? _q : isDivider) !== null && _r !== void 0 ? _r : false });
        }
        else if ('description' in itemCopy && !('value' in itemCopy)) {
            return Object.assign(Object.assign({}, itemCopy), { value: itemCopy.description, disabled: (_t = (_s = itemCopy.disabled) !== null && _s !== void 0 ? _s : disabled) !== null && _t !== void 0 ? _t : false, isDivider: (_v = (_u = itemCopy.isDivider) !== null && _u !== void 0 ? _u : isDivider) !== null && _v !== void 0 ? _v : false });
        }
        else {
            const keys = Object.keys(itemCopy);
            if (keys.length) {
                const firstValue = itemCopy[keys[0]];
                return Object.assign(Object.assign({}, itemCopy), { value: firstValue, disabled: (_x = (_w = itemCopy.disabled) !== null && _w !== void 0 ? _w : disabled) !== null && _x !== void 0 ? _x : false, isDivider: (_z = (_y = itemCopy.isDivider) !== null && _y !== void 0 ? _y : isDivider) !== null && _z !== void 0 ? _z : false });
            }
        }
    }
    return null;
}
export const DropdownListItem = ({ item, getOptionLabel, size = 'md', selectedItem, variant, onChange, isActive, activeIndex, index, isChild = false, }) => {
    var _a, _b;
    const itemRef = useRef(null);
    const [showTooltip, setShowTooltip] = useState(false);
    useEffect(() => {
        const checkOverflow = () => {
            setShowTooltip(isTextOverflowing(itemRef.current));
        };
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, [getComparisonValue(item, getOptionLabel)]);
    const handleItemClick = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!item)
            return;
        if (typeof item === 'string') {
            onChange(event, item);
            return;
        }
        if (!(item === null || item === void 0 ? void 0 : item.disabled)) {
            if (!(item === null || item === void 0 ? void 0 : item.children) || item.children.length === 0) {
                onChange(event, item); // Если у элемента есть дети, не выбираем родительский элемент
            }
        }
    }, [item, onChange]);
    const hasChildren = item !== null && typeof item === 'object' && 'children' in item && Array.isArray(item.children) && item.children.length > 0;
    const isDisabled = item !== null && typeof item === 'object' && 'disabled' in item && item.disabled;
    const itemId = getItemId(item);
    const isSelectedItem = Array.isArray(selectedItem)
        ? selectedItem.some((i) => itemId !== null ? getItemId(i) === itemId : getComparisonValue(i, getOptionLabel) === getComparisonValue(item, getOptionLabel))
        : itemId !== null
            ? getItemId(selectedItem) === itemId
            : getComparisonValue(selectedItem, getOptionLabel) === getComparisonValue(item, getOptionLabel);
    const itemContainerClasses = classNames(styles[`item--container`], {
        [styles['item--container--active']]: isActive,
        [styles['item--container--parent']]: hasChildren && !isChild,
        [styles['item--container--child']]: isChild,
    });
    const itemClassess = classNames(styles[`item-block`], styles[`button--${size}`], {
        [styles['item-block--disabled']]: isDisabled,
        [styles['item-block--active']]: isActive,
        [styles['item-block--parent']]: hasChildren && !isChild, // Стиль для родительских элементов
        [styles['item-block--child']]: isChild, // Стиль для дочерних элементов
    });
    const itemBlock = classNames(styles[`item-block`], styles[`item-block-${variant}`], 
    // { [styles[`item-block-${variant}--selected`]]: selectedItem?.value === item?.value },
    {
        [styles['item-block--disabled']]: isDisabled,
        [styles[`item-block-${variant}--selected`]]: isSelectedItem,
        [styles['item-block--parent']]: hasChildren && !isChild,
        [styles['item-block--child']]: isChild,
    });
    const itemData = item !== null && typeof item === 'object' ? item : null;
    const itemContent = (React.createElement("div", { className: itemContainerClasses, onClick: handleItemClick },
        React.createElement("div", { className: itemClassess },
            React.createElement("div", { className: itemBlock },
                variant === 'icons' && (itemData === null || itemData === void 0 ? void 0 : itemData.icon) &&
                    React.cloneElement(itemData.icon, {
                        strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
                    }),
                React.createElement("div", { className: styles.item, ref: itemRef },
                    React.createElement("span", null, getComparisonValue(item, getOptionLabel))),
                !hasChildren && isSelectedItem && (React.createElement(IconCheck, { strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0', htmlColor: "#0D99FF" }))),
            (itemData === null || itemData === void 0 ? void 0 : itemData.isDivider) && React.createElement("div", { className: styles.divider })),
        hasChildren && (React.createElement("div", { className: styles.nestedMenu }, (_a = item.children) === null || _a === void 0 ? void 0 : _a.map((child, childIndex) => {
            var _a;
            return (React.createElement(DropdownListItem, { key: (_a = child === null || child === void 0 ? void 0 : child.id) !== null && _a !== void 0 ? _a : `${index}-${childIndex}`, item: child, getOptionLabel: getOptionLabel, size: size, selectedItem: selectedItem, onChange: onChange, isActive: false, activeIndex: activeIndex, index: childIndex, isChild: true }));
        })))));
    return showTooltip ? (React.createElement(Tooltip, { label: ((_b = getComparisonValue(item, getOptionLabel)) === null || _b === void 0 ? void 0 : _b.toString()) || '', position: "bottom-left" }, itemContent)) : (itemContent);
};
export const Dropdown = ({ options, id, label, placeholder, required = false, value, defaultValue, onChange, showLoadMore = false, loadMore, getOptionLabel, variant = 'text', size = 'lg', style, className, isLeftLabel = false, isDivider = false, disabled = false, readOnly = false, isOpened = false, error = false, helperText, onOpen, onClick, onBlur, onFocus, onClose, clearable = true, enableAutocomplete = false, onSearch, isOptionsLoading, isSearchLoading, noOptionsText, lng = 'ru', multiple = false, limitTags = 1, }) => {
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);
    const hoveredIndexRef = useRef(-1);
    const onCloseRef = useRef(onClose);
    const labelChipRef = useRef(new Map());
    const selectedItemRef = useRef(null);
    const [isOpen, setIsOpen] = useState(isOpened);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]); //при множественном выборе
    const [errorInput, setErrorInput] = useState(false);
    const [errorInputHelperText, setErrorInputHelperText] = useState(helperText);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [searchValue, setSearchValue] = useState('');
    const [isInitialOpen, setIsInitialOpen] = useState(false);
    const [containerWidth, setContainerWidth] = useState(undefined);
    const [showSelectedTooltip, setShowSelectedTooltip] = useState(false);
    const [showChipTooltip, setShowChipTooltip] = useState({});
    const actualOptions = useMemo(() => {
        return ((options === null || options === void 0 ? void 0 : options.map(opt => {
            const transformed = checkItem(opt, getOptionLabel, disabled, isDivider);
            return transformed;
        })) || []);
    }, [options, getOptionLabel]);
    const displayOptions = useMemo(() => {
        if (!enableAutocomplete || !searchValue)
            return actualOptions;
        // Для выбранного значения
        if (isInitialOpen) {
            return actualOptions;
        }
        // Серверный поиск
        if (onSearch && searchValue.trim().length >= 3) {
            return actualOptions;
        }
        // Локальная фильтрация
        return actualOptions.filter(opt => {
            const val = getComparisonValue(opt, getOptionLabel) || '';
            return String(val).toLowerCase().includes(searchValue.toLowerCase());
        });
    }, [actualOptions, enableAutocomplete, searchValue, isInitialOpen, onSearch]);
    const calculatedWidth = useMemo(() => {
        var _a, _b;
        const text = (_a = label !== null && label !== void 0 ? label : placeholder) !== null && _a !== void 0 ? _a : '';
        const selectedValue = ((_b = getComparisonValue(selectedItem, getOptionLabel)) === null || _b === void 0 ? void 0 : _b.toString()) || '';
        const inPixel = size === 'lg' ? 11 : 9;
        if (!isLeftLabel) {
            return Math.max(text.length, selectedValue.length) * inPixel;
        }
        return (text.length + selectedValue.length) * inPixel + 40;
    }, [selectedItem, label, size, placeholder, isLeftLabel]);
    const wrapperClassess = classNames(className, {
        [styles['dropdown--container']]: !isLeftLabel,
        [styles['dropdown--container-left']]: isLeftLabel,
        [styles['dropdown--container-label']]: label && !isLeftLabel && !required,
        [styles['dropdown--container-helperText']]: errorInput,
    });
    const buttonClassess = classNames(styles.button, styles[`button--${size}`], {
        [styles['button--filter']]: variant === 'filter',
        [styles['button-item--selected']]: getComparisonValue(selectedItem, getOptionLabel) && !disabled,
        [styles['button--readOnly']]: readOnly,
        [styles['button--disabled']]: disabled,
        [styles['button--error']]: errorInput,
    });
    const dropdownClassess = classNames(styles.dropdown, className, {
        [styles['dropdown--disabled']]: disabled,
    });
    const labelClasses = classNames(styles.label, styles[size], {
        [styles['label--default']]: !isLeftLabel,
        [styles['label--left']]: isLeftLabel,
        [styles['label--required']]: required,
    });
    const selectedItemClassess = classNames({
        [styles['item-selected']]: !!selectedItem || !!selectedItems.length || !!searchValue,
        [styles['item-placeholder']]: !(selectedItem || selectedItems.length || searchValue) &&
            ((placeholder !== null && placeholder !== void 0 ? placeholder : label) || (!placeholder && !label)),
        // [styles['item-placeholder']]: !(selectedItem || selectedItems.length) && ((placeholder ?? label) || (!placeholder && !label)),
        [styles['button--icons--item-selected']]: variant === 'icons' && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon) && !multiple,
    });
    const handleToggle = (event) => {
        var _a;
        event.preventDefault();
        event.stopPropagation();
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        if (newIsOpen) {
            onOpen === null || onOpen === void 0 ? void 0 : onOpen(event);
            const currentItem = multiple ? null : selectedItem;
            const initialIndex = currentItem
                ? displayOptions.findIndex((opt) => {
                    const id = getItemId(opt);
                    return id !== null ? id === getItemId(currentItem) : getComparisonValue(opt, getOptionLabel) === getComparisonValue(currentItem, getOptionLabel);
                })
                : -1;
            setActiveIndex(initialIndex);
            if (enableAutocomplete && onChange) {
                const selectedValue = ((_a = getComparisonValue(selectedItem, getOptionLabel)) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                setIsInitialOpen(true);
                setSearchValue(selectedValue);
                requestAnimationFrame(() => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                });
            }
        }
        else if (!newIsOpen) {
            onClose === null || onClose === void 0 ? void 0 : onClose(event);
            setSearchValue('');
            hoveredIndexRef.current = -1;
        }
    };
    const onChangeHandler = (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        if (multiple && item) {
            setErrorInput(false);
            setSearchValue('');
            setSelectedItems((selectedItems) => {
                const itemId = getItemId(item);
                const isSame = (i) => itemId !== null
                    ? getItemId(i) === itemId
                    : getComparisonValue(i, getOptionLabel) === getComparisonValue(item, getOptionLabel);
                const isSelected = selectedItems.some(isSame);
                const newSelectedItems = isSelected
                    ? selectedItems.filter((i) => !isSame(i))
                    : [...selectedItems, item];
                const newEvent = Object.assign(Object.assign({}, event), { currentTarget: Object.assign(Object.assign({}, event.currentTarget), { value: newSelectedItems }) });
                onChange === null || onChange === void 0 ? void 0 : onChange(event, newSelectedItems);
                return newSelectedItems;
            });
            return;
        }
        const newEvent = Object.assign(Object.assign({}, event), { currentTarget: Object.assign(Object.assign({}, event.currentTarget), { value: item }) });
        const selectedId = getItemId(selectedItem);
        const itemId = getItemId(item);
        const isDifferent = selectedId !== null && itemId !== null
            ? selectedId !== itemId
            : getComparisonValue(selectedItem, getOptionLabel) !== getComparisonValue(item, getOptionLabel);
        if (isDifferent) {
            setSelectedItem(item);
            setIsOpen(false);
            setSearchValue('');
            onSearch === null || onSearch === void 0 ? void 0 : onSearch('');
            onChange === null || onChange === void 0 ? void 0 : onChange(event, item);
            onClose === null || onClose === void 0 ? void 0 : onClose(event);
        }
        if (item) {
            setErrorInput(false);
        }
        else {
            setErrorInput(true);
        }
    };
    const handleSearchChange = (event) => {
        let value = event.target.value;
        const regex = /(\S+)\.\s+$/; //проверка автоматического подставления точки после двойных пробелов
        if (regex.test(value)) {
            value = value.replace(regex, '$1  ');
        }
        event.preventDefault();
        event.stopPropagation();
        if (value === '') {
            // onChange?.(event as any, null); 
            // setSelectedItem(null);
            handleReset(event, false);
            return;
        }
        setSearchValue(value);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(value);
        setIsInitialOpen(false);
        setActiveIndex(0);
    };
    //для выбора опции из списка с клавиатуры
    const handleKeyDown = (event) => {
        if (event.target instanceof HTMLInputElement) {
            const inputTarget = event.target;
            if (event.key === ' ' && !inputTarget.value.trim()) {
                event.preventDefault();
                return;
            }
        }
        if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (!isOpen) {
            if (event.key === 'Enter' || event.key === 'ArrowDown') {
                event.preventDefault();
                event.stopPropagation();
                setIsOpen(true);
                setActiveIndex(0);
            }
            return;
        }
        if (enableAutocomplete &&
            event.target instanceof HTMLInputElement &&
            event.key !== 'ArrowDown' &&
            event.key !== 'ArrowUp' &&
            event.key !== 'Enter' &&
            event.key !== 'Escape') {
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                displayOptions && setActiveIndex((prev) => {
                    const start = prev < 0 ? hoveredIndexRef.current : prev;
                    const hasLoadMore = showLoadMore && !!loadMore && !isSearchingNow && !showSpinner;
                    const max = displayOptions.length - 1 + (hasLoadMore ? 1 : 0);
                    return start <= max ? start + 1 : start;
                });
                break;
            case 'ArrowUp':
                event.preventDefault();
                displayOptions && setActiveIndex((prev) => {
                    const start = prev < 0 ? hoveredIndexRef.current : prev;
                    return start > 0 ? start - 1 : start;
                });
                break;
            case 'Enter':
                event.preventDefault();
                if (activeIndex === displayOptions.length && showLoadMore && loadMore) {
                    loadMore();
                }
                else if (activeIndex >= 0 && activeIndex < displayOptions.length) {
                    const selectedOption = displayOptions[activeIndex];
                    onChangeHandler(event, selectedOption);
                    setIsOpen(false);
                    onClose === null || onClose === void 0 ? void 0 : onClose(event);
                    setActiveIndex(-1);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                onClose === null || onClose === void 0 ? void 0 : onClose(event);
                setActiveIndex(-1);
                break;
        }
    };
    //для сброса выбранного значения или всех (если multiple)
    const handleReset = (event, close = true) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const startValue = defaultValue ? checkItem(defaultValue) : null;
        if (multiple) {
            setSelectedItems([]);
        }
        else {
            setSelectedItem(startValue !== null && startValue !== void 0 ? startValue : null);
        }
        // if (!enableAutocomplete) {
        //   setIsOpen(false);
        // }
        if (!multiple && close) {
            ;
            setIsOpen(false);
        }
        setSearchValue('');
        onSearch === null || onSearch === void 0 ? void 0 : onSearch('');
        onChange === null || onChange === void 0 ? void 0 : onChange(event, []);
        close && (onClose === null || onClose === void 0 ? void 0 : onClose(event));
        setActiveIndex(-1);
        if (required) {
            setErrorInput(true);
            setErrorInputHelperText((helperText !== null && helperText !== void 0 ? helperText : lng === 'ru') ? 'Поле обязательно для заполнения' : 'Field is required');
        }
    };
    const handleResetMultipleItem = (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        item && setSelectedItems((selectedItems) => {
            const itemId = getItemId(item);
            const newSelectedItems = selectedItems.filter((i) => itemId !== null ? getItemId(i) !== itemId : getComparisonValue(i, getOptionLabel) !== getComparisonValue(item, getOptionLabel));
            onChange === null || onChange === void 0 ? void 0 : onChange(event, newSelectedItems);
            if (required && newSelectedItems.length === 0) {
                setErrorInput(true);
                setErrorInputHelperText((helperText !== null && helperText !== void 0 ? helperText : lng === 'ru') ? 'Поле обязательно для заполнения' : 'Field is required');
            }
            return newSelectedItems;
        });
    };
    //ОТРИСОВКИ
    const getSelectedItemsText = () => {
        if (multiple) {
            if (selectedItems.length === 0) {
                return '';
            }
            return selectedItems.map((item) => {
                getComparisonValue(item, getOptionLabel);
            });
        }
        return getComparisonValue(selectedItem, getOptionLabel);
    };
    const getChips = () => {
        const visible = selectedItems.slice(0, limitTags);
        const hidden = selectedItems.length - visible.length;
        return (React.createElement("div", { className: styles.chipsWrap },
            visible.map((opt) => {
                var _a, _b, _c;
                const key = String((_b = (_a = getItemId(opt)) !== null && _a !== void 0 ? _a : getComparisonValue(opt, getOptionLabel)) !== null && _b !== void 0 ? _b : getSelectedItemsText());
                const label = String((_c = getComparisonValue(opt, getOptionLabel)) !== null && _c !== void 0 ? _c : '');
                const chip = (React.createElement("span", { className: styles.chip, onMouseEnter: () => requestAnimationFrame(() => recalcChipTooltips()), onMouseDown: (e) => e.stopPropagation(), onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    } },
                    React.createElement("span", { className: styles.chipLabel, ref: (el) => {
                            labelChipRef.current.set(key, el);
                        } }, label),
                    React.createElement("span", { className: styles.chipRemove, role: "button", tabIndex: 0, onMouseDown: (e) => e.stopPropagation(), onClick: (e) => handleResetMultipleItem(e, opt), onKeyDown: (e) => {
                            if (e.key === 'Enter' || e.key === ' ')
                                handleResetMultipleItem(e, opt);
                        }, "aria-label": lng === 'ru' ? 'Удалить' : 'Remove' }, "\u00D7")));
                return showChipTooltip[key] ? (React.createElement(Tooltip, { label: label, position: "bottom-left", style: { width: '100% !important' }, key: key }, chip)) : (chip);
            }),
            hidden > 0 && (React.createElement("span", { className: styles.chipMore, onMouseDown: (e) => e.stopPropagation(), onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                } },
                "+",
                hidden))));
    };
    const getTextField = () => {
        var _a, _b, _c;
        const selectedText = getSelectedItemsText();
        const textFieldContent = (React.createElement("div", { className: selectedItemClassess, ref: selectedItemRef, onClick: () => {
                var _a;
                if (isOpen && enableAutocomplete) {
                    (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                }
            } },
            variant === 'icons' && !multiple &&
                (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon) &&
                React.cloneElement(selectedItem.icon, {
                    strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
                }),
            multiple && selectedItems.length > 0 && getChips(),
            !multiple && selectedItem && (React.createElement("span", { style: { display: (isOpen && enableAutocomplete && searchValue) ? 'none' : 'block' } }, getComparisonValue(selectedItem, getOptionLabel))),
            isOpen && enableAutocomplete && (React.createElement("input", { ref: inputRef, type: "text", value: searchValue, className: styles.inlineSearchInput, onChange: handleSearchChange, placeholder: !searchValue && !selectedItem
                    ? (lng === 'ru' ? 'Поиск...' : 'Search...')
                    : '', onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClick === null || onClick === void 0 ? void 0 : onClick(e);
                    e.currentTarget.focus();
                }, onMouseDown: (e) => e.stopPropagation(), onFocus: (e) => {
                    e.stopPropagation();
                    onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
                }, onBlur: (e) => {
                    e.stopPropagation();
                    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
                }, onKeyDown: handleKeyDown, autoFocus: true })),
            !multiple && !selectedItem && !searchValue && !(isOpen && enableAutocomplete) && (React.createElement("span", null, (_a = placeholder !== null && placeholder !== void 0 ? placeholder : label) !== null && _a !== void 0 ? _a : (lng === 'ru' ? 'Выберите значение' : 'Select value'))),
            multiple && selectedItems.length === 0 && !searchValue && !(isOpen && enableAutocomplete) && (React.createElement("span", null, (_b = placeholder !== null && placeholder !== void 0 ? placeholder : label) !== null && _b !== void 0 ? _b : (lng === 'ru' ? 'Выберите значения' : 'Select values')))));
        return showSelectedTooltip ? (React.createElement("div", { className: styles.textField },
            React.createElement(Tooltip, { label: ((_c = getComparisonValue(selectedItem, getOptionLabel)) === null || _c === void 0 ? void 0 : _c.toString()) || '', position: "bottom-left", style: { width: '100% !important' } }, textFieldContent))) : (textFieldContent);
    };
    const isSearchingNow = !isInitialOpen && !!searchValue.trim();
    const showSpinner = isSearchLoading || (isOptionsLoading && displayOptions.length === 0);
    const getDropdownMenu = () => {
        const optionsToRender = displayOptions;
        const menu = isOpen && (React.createElement("div", { className: dropdownClassess, ref: dropdownRef, onMouseMove: (e) => {
                var _a;
                const items = (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[class*="item--container"]');
                if (!items)
                    return;
                const target = e.target.closest('[class*="item--container"]');
                if (!target)
                    return;
                const idx = Array.from(items).indexOf(target);
                if (idx !== -1)
                    hoveredIndexRef.current = idx;
                setActiveIndex(-1);
            } },
            showSpinner ? (React.createElement("div", { className: `${styles['item-block']}`, style: { padding: '10px', display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', margin: '0 auto' } },
                React.createElement(Spinner, null))) : (React.createElement(React.Fragment, null, optionsToRender && optionsToRender.length > 0 ? (optionsToRender.map((option, index) => {
                var _a;
                return (React.createElement(DropdownListItem, { key: (_a = option === null || option === void 0 ? void 0 : option.id) !== null && _a !== void 0 ? _a : index, item: option, getOptionLabel: getOptionLabel, size: size, selectedItem: multiple ? selectedItems : selectedItem, variant: variant, onChange: onChangeHandler, isActive: activeIndex === index, activeIndex: activeIndex, index: index }));
            })) : (React.createElement("div", { className: `${styles['item-block']}`, style: { margin: '15px auto', textAlign: 'center', color: 'var(--text-grey)' } }, lng === 'ru' || lng.includes('ru')
                ? noOptionsText || 'Нет вариантов для выбора'
                : noOptionsText || 'No options to select')))),
            !showSpinner && !isSearchingNow && showLoadMore && loadMore && (React.createElement(Button, { ref: loadMoreRef, style: { width: '97%', margin: '10px auto', display: 'block', boxSizing: 'border-box' }, disabled: isOptionsLoading, variant: 'outline', active: activeIndex === displayOptions.length, onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    loadMore();
                } }, isOptionsLoading
                ? (lng === 'ru' ? 'Загрузка...' : 'Loading...')
                : (lng === 'ru' ? 'Загрузить еще' : 'Load more')))));
        return isOpen ? menu : null;
    };
    const loadMoreRef = useRef(null);
    useEffect(() => {
        var _a, _b;
        if (activeIndex < 0 || !dropdownRef.current)
            return;
        if (activeIndex === displayOptions.length) {
            (_a = loadMoreRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ block: 'nearest' });
            return;
        }
        const items = dropdownRef.current.querySelectorAll('[class*="item--container"]');
        (_b = items[activeIndex]) === null || _b === void 0 ? void 0 : _b.scrollIntoView({ block: 'nearest' });
    }, [activeIndex, displayOptions.length]);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            var _a;
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                (_a = onCloseRef.current) === null || _a === void 0 ? void 0 : _a.call(onCloseRef, event);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useLayoutEffect(() => {
        if (containerRef.current) {
            setContainerWidth(calculatedWidth);
        }
    }, [calculatedWidth]);
    useEffect(() => {
        if (multiple) {
            if (Array.isArray(value)) {
                const transformed = value.map(item => checkItem(item, getOptionLabel));
                setSelectedItems(transformed);
                //setSelectedItems(value => value.map(item => checkItem(item) as T))
            }
            else {
                setSelectedItems([]);
            }
            return;
        }
        if (value || defaultValue) {
            const startValue = value
                ? checkItem(value)
                : defaultValue
                    ? checkItem(defaultValue)
                    : null;
            setSelectedItem(startValue !== null && startValue !== void 0 ? startValue : null);
        }
        else {
            setSelectedItem(null);
        }
    }, [value, defaultValue, multiple]);
    useEffect(() => {
        setErrorInput(error);
    }, [error]);
    useEffect(() => {
        const checkOverflow = () => {
            setShowSelectedTooltip(isTextOverflowing(selectedItemRef.current));
        };
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, [getComparisonValue(selectedItem, getOptionLabel)]);
    const recalcChipTooltips = useCallback(() => {
        const next = {};
        labelChipRef.current.forEach((el, key) => {
            next[key] = !!el && isTextOverflowing(el);
        });
        setShowChipTooltip(next);
    }, []);
    useEffect(() => {
        if (!multiple)
            return;
        requestAnimationFrame(() => recalcChipTooltips());
        window.addEventListener('resize', recalcChipTooltips);
        return () => window.removeEventListener('resize', recalcChipTooltips);
    }, [multiple, selectedItems, limitTags, recalcChipTooltips]);
    return (React.createElement("div", { id: id, className: wrapperClassess, ref: containerRef, onClick: onClick, style: style ? style : { width: isLeftLabel && containerWidth ? `${containerWidth}px` : '100%' } },
        label && (React.createElement(Typography, { variant: "Caption", className: labelClasses }, label)),
        React.createElement("div", { className: buttonClassess, onClick: disabled || readOnly ? undefined : handleToggle, role: "button", 
            // disabled={disabled}
            tabIndex: disabled ? -1 : 0, "aria-disabled": disabled, onKeyDown: (e) => {
                if (disabled)
                    return;
                if (enableAutocomplete && e.target instanceof HTMLInputElement)
                    return;
                handleKeyDown(e);
            } },
            getTextField(),
            React.createElement("div", { className: styles.actionButtons },
                clearable &&
                    !readOnly &&
                    !disabled &&
                    (selectedItem || (multiple && selectedItems.length !== 0) || (enableAutocomplete && searchValue)) && (React.createElement("div", { className: styles.resetButton },
                    React.createElement(IconClose, { strokeWidth: "0.2", htmlColor: "var(--text-light)", onClick: handleReset }))),
                React.createElement("div", { className: styles.dropdownIcon }, !isOpen ? (React.createElement(ChevronDown, { strokeWidth: size === 'lg' ? '0.5' : '0.3', htmlColor: 'var(--icons-medium)' })) : (React.createElement(ChevronUp, { strokeWidth: size === 'lg' ? '0.5' : '0.3', htmlColor: 'var(--icons-medium)' })))),
            getDropdownMenu()),
        errorInput && errorInputHelperText && (React.createElement(Typography, { variant: "Caption", className: classNames(styles.helperText, styles[size]) }, helperText !== null && helperText !== void 0 ? helperText : errorInputHelperText))));
};
