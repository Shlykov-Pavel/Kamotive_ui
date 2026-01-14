import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';
import { ChevronDown } from '../../Icons/ChevronDown/ChevronDown';
import { ChevronUp } from '../../Icons/ChevronUp/ChevronUp';
import { IconClose } from '../../Icons/IconClose/IconClose';
import { IconCheck } from '../../Icons/IconCheck/IconCheck';
import { Typography } from '../Typography/Typography';
import { Tooltip } from '../Tooltip/Tooltip';
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
    // Если есть value, используем его
    if (item.value !== undefined) {
        return item.value;
    }
    // Если есть id, используем его для сравнения
    if (item.id !== undefined) {
        return item.id;
    }
    // Иначе используем сам объект
    return item;
};
function checkItem(item, getOptionLabel, disabled, isDivider) {
    if (typeof item === 'object' && item !== null) {
        const itemCopy = Object.assign({}, item);
        // Проверяем только поле value на вложенные объекты
        if (getOptionLabel) {
            const labelResult = getOptionLabel(itemCopy);
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
                return Object.assign(Object.assign({}, itemCopy), { value: displayValue, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
            }
            else {
                // Обычная обработка, если getOptionLabel возвращает строку
                return Object.assign(Object.assign({}, itemCopy), { value: labelResult, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
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
            return Object.assign(Object.assign({}, itemCopy), { disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
        }
        else if ('name' in itemCopy && !('value' in itemCopy)) {
            return Object.assign(Object.assign({}, itemCopy), { value: itemCopy.name, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
        }
        else if ('description' in itemCopy && !('value' in itemCopy)) {
            return Object.assign(Object.assign({}, itemCopy), { value: itemCopy.description, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
        }
        else {
            const keys = Object.keys(itemCopy);
            if (keys.length) {
                const firstValue = itemCopy[keys[0]];
                return Object.assign(Object.assign({}, itemCopy), { value: firstValue, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
            }
        }
    }
    else if (typeof item === 'string' || typeof item === 'number') {
        return { value: item, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false };
    }
    else {
        return null;
    }
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
        if (!(item === null || item === void 0 ? void 0 : item.disabled)) {
            if (!(item === null || item === void 0 ? void 0 : item.children) || item.children.length === 0) {
                onChange(event, item); // Если у элемента есть дети, не выбираем родительский элемент
            }
        }
    }, [item, onChange]);
    const hasChildren = (item === null || item === void 0 ? void 0 : item.children) && item.children.length > 0;
    const itemContainerClasses = classNames(styles[`item--container`], {
        [styles['item--container--active']]: isActive,
        [styles['item--container--parent']]: hasChildren && !isChild,
        [styles['item--container--child']]: isChild,
    });
    const itemClassess = classNames(styles[`item-block`], styles[`button--${size}`], {
        [styles['item-block--disabled']]: item === null || item === void 0 ? void 0 : item.disabled,
        [styles['item-block--active']]: isActive,
        [styles['item-block--parent']]: hasChildren && !isChild, // Стиль для родительских элементов
        [styles['item-block--child']]: isChild, // Стиль для дочерних элементов
    });
    const itemBlock = classNames(styles[`item-block`], styles[`item-block-${variant}`], 
    // { [styles[`item-block-${variant}--selected`]]: selectedItem?.value === item?.value },
    {
        [styles[`item-block-${variant}--selected`]]: getComparisonValue(selectedItem, getOptionLabel) === getComparisonValue(item, getOptionLabel),
        [styles['item-block--disabled']]: item === null || item === void 0 ? void 0 : item.disabled,
        [styles['item-block--parent']]: hasChildren && !isChild,
        [styles['item-block--child']]: isChild,
    });
    const itemContent = (React.createElement("div", { className: itemContainerClasses, onClick: handleItemClick },
        React.createElement("div", { className: itemClassess },
            React.createElement("div", { className: itemBlock },
                variant === 'icons' &&
                    (item === null || item === void 0 ? void 0 : item.icon) &&
                    React.cloneElement(item.icon, {
                        strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
                    }),
                React.createElement("div", { className: styles.item, ref: itemRef },
                    React.createElement("span", null, getComparisonValue(item, getOptionLabel))),
                !hasChildren &&
                    getComparisonValue(selectedItem, getOptionLabel) === getComparisonValue(item, getOptionLabel) && (React.createElement(IconCheck, { strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0', htmlColor: "#0D99FF" }))),
            (item === null || item === void 0 ? void 0 : item.isDivider) && React.createElement("div", { className: styles.divider })),
        hasChildren && (React.createElement("div", { className: styles.nestedMenu }, (_a = item.children) === null || _a === void 0 ? void 0 : _a.map((child, childIndex) => {
            var _a;
            return (React.createElement(DropdownListItem, { key: (_a = child === null || child === void 0 ? void 0 : child.id) !== null && _a !== void 0 ? _a : `${index}-${childIndex}`, item: child, getOptionLabel: getOptionLabel, size: size, selectedItem: selectedItem, onChange: onChange, isActive: false, activeIndex: activeIndex, index: childIndex, isChild: true }));
        })))));
    return showTooltip ? (React.createElement(Tooltip, { label: ((_b = getComparisonValue(item, getOptionLabel)) === null || _b === void 0 ? void 0 : _b.toString()) || '', position: "bottom-left" }, itemContent)) : (itemContent);
};
export const Dropdown = ({ options, id, label, placeholder, required = false, value, defaultValue, onChange, showLoadMore = false, loadMore, getOptionLabel, variant = 'text', size = 'lg', style, className, isLeftLabel = false, isDivider = false, disabled = false, readOnly = false, isOpened = false, error = false, helperText, onClick, onBlur, onFocus, onClose, clearable = true, enableAutocomplete = false, noOptionsText = 'Нет вариантов для выбора', lng = 'ru', }) => {
    const [isOpen, setIsOpen] = useState(isOpened);
    const [modifiedOptions, setModifiedOptions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [errorInput, setErrorInput] = useState(false);
    const [errorInputHelperText, setErrorInputHelperText] = useState(helperText);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [searchValue, setSearchValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(undefined);
    const wrapperClassess = classNames(className, {
        [styles['dropdown--container']]: !isLeftLabel,
        [styles['dropdown--container-left']]: isLeftLabel,
        [styles['dropdown--container-label']]: label && !isLeftLabel && !required,
        [styles['dropdown--container-helperText']]: errorInput,
    });
    const buttonClassess = classNames(styles.button, styles[`button--${size}`], {
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
        [styles['item-selected']]: selectedItem,
        [styles['item-placeholder']]: !selectedItem && ((placeholder !== null && placeholder !== void 0 ? placeholder : label) || (!placeholder && !label)),
        [styles['button--icons--item-selected']]: variant === 'icons' && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon),
    });
    // обновляет значения searchValue и filteredOptions
    const setAutocompleteValues = (value) => {
        setSearchValue(value);
        // фильтрация по введенному значению
        if (modifiedOptions && modifiedOptions.length > 0) {
            const filtered = modifiedOptions.filter((option) => {
                if (!option || !option.value)
                    return false;
                const optionValue = String(option.value).toLowerCase();
                return optionValue.includes(value.toLowerCase());
            });
            setFilteredOptions(filtered);
            setActiveIndex(filtered && filtered.length > 0 ? 0 : -1);
        }
    };
    const handleToggle = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        if (newIsOpen && enableAutocomplete) {
            const value = getComparisonValue(selectedItem, getOptionLabel)
                ? getComparisonValue(selectedItem, getOptionLabel).toString()
                : searchValue;
            setSearchValue(value);
            setFilteredOptions(modifiedOptions);
            requestAnimationFrame(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            });
        }
        else if (!newIsOpen) {
            onClose === null || onClose === void 0 ? void 0 : onClose(event);
        }
    }, [isOpen, enableAutocomplete, searchValue, selectedItem, modifiedOptions, onClose]);
    const onChangeHandler = (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        const newEvent = Object.assign(Object.assign({}, event), { currentTarget: Object.assign(Object.assign({}, event.currentTarget), { value: item }) });
        if (getComparisonValue(selectedItem, getOptionLabel) !== getComparisonValue(item, getOptionLabel)) {
            setSelectedItem(item);
            setIsOpen(false);
            onChange === null || onChange === void 0 ? void 0 : onChange(newEvent, item);
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
        event.preventDefault();
        event.stopPropagation();
        const value = event.target.value;
        setAutocompleteValues(value);
    };
    //для выбора опции из списка с клавиатуры
    const handleKeyDown = (event) => {
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
                modifiedOptions && setActiveIndex((prev) => (prev < modifiedOptions.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                event.preventDefault();
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
                break;
            case 'Enter':
                event.preventDefault();
                if (activeIndex >= 0) {
                    const selectedOption = modifiedOptions && modifiedOptions[activeIndex];
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
    //для сброса выбранного значения
    const handleReset = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const startValue = defaultValue ? checkItem(defaultValue) : null;
        setSelectedItem(startValue !== null && startValue !== void 0 ? startValue : null);
        if (!enableAutocomplete) {
            setIsOpen(false);
        }
        setSearchValue('');
        setFilteredOptions(modifiedOptions);
        onChange === null || onChange === void 0 ? void 0 : onChange(event, startValue !== null && startValue !== void 0 ? startValue : null);
        onClose === null || onClose === void 0 ? void 0 : onClose(event);
        setActiveIndex(-1);
        if (required) {
            setErrorInput(true);
            setErrorInputHelperText((helperText !== null && helperText !== void 0 ? helperText : lng === 'ru') ? 'Поле обязательно для заполнения' : 'Field is required');
        }
    };
    const [showSelectedTooltip, setShowSelectedTooltip] = useState(false);
    const selectedItemRef = useRef(null);
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
    const getTextField = () => {
        var _a, _b;
        const textFieldContent = (React.createElement("div", { className: selectedItemClassess, ref: selectedItemRef },
            variant === 'icons' &&
                (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon) &&
                React.cloneElement(selectedItem.icon, {
                    strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
                }),
            isOpen && enableAutocomplete ? (React.createElement("input", { ref: inputRef, type: "text", value: searchValue, className: styles.inlineSearchInput, onChange: handleSearchChange, placeholder: getComparisonValue(selectedItem, getOptionLabel)
                    ? getComparisonValue(selectedItem, getOptionLabel).toString()
                    : lng === 'ru' ? 'Поиск...' : 'Search...', onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClick === null || onClick === void 0 ? void 0 : onClick(e);
                    e.currentTarget.focus();
                }, onMouseDown: (e) => {
                    e.stopPropagation();
                }, onFocus: (e) => {
                    e.stopPropagation();
                    onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
                }, onBlur: (e) => {
                    e.stopPropagation();
                    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
                }, onKeyDown: handleKeyDown, autoFocus: true })) : selectedItem ? (getComparisonValue(selectedItem, getOptionLabel)) : (searchValue || ((_a = placeholder !== null && placeholder !== void 0 ? placeholder : label) !== null && _a !== void 0 ? _a : (lng === 'ru' ? 'Выберите значение' : 'Select value')))));
        return showSelectedTooltip ? (React.createElement("div", { className: styles.textField },
            React.createElement(Tooltip, { label: ((_b = getComparisonValue(selectedItem, getOptionLabel)) === null || _b === void 0 ? void 0 : _b.toString()) || '', position: "bottom-left", style: { width: '100% !important' } }, textFieldContent))) : (textFieldContent);
    };
    const getDropdownMenu = () => {
        const optionsToRender = enableAutocomplete && searchValue ? filteredOptions : modifiedOptions;
        const menu = isOpen && (React.createElement("div", { className: dropdownClassess },
            optionsToRender && optionsToRender.length > 0 ? (optionsToRender.map((optionsToRender, index) => {
                var _a;
                return (React.createElement(DropdownListItem, { key: (_a = optionsToRender === null || optionsToRender === void 0 ? void 0 : optionsToRender.id) !== null && _a !== void 0 ? _a : index, item: optionsToRender, getOptionLabel: getOptionLabel, size: size, selectedItem: selectedItem, variant: variant, onChange: onChangeHandler, isActive: activeIndex === index, activeIndex: activeIndex, index: index }));
            })) : (React.createElement("div", { className: `${styles['item-container']} ${styles['item-block']}`, style: { paddingLeft: '15px' } }, lng === 'ru' || lng.includes('ru')
                ? noOptionsText || 'Нет вариантов для выбора'
                : noOptionsText || 'No options to select')),
            showLoadMore && loadMore && React.createElement("div", { className: styles[`loadMore`], onClick: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    loadMore();
                } }, lng === 'ru' ? 'Загрузить еще' : 'Load more')));
        return isOpen ? menu : null;
    };
    useEffect(() => {
        var _a, _b, _c;
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                onClose === null || onClose === void 0 ? void 0 : onClose(event);
            }
        };
        if (containerRef.current) {
            const text = (_a = label !== null && label !== void 0 ? label : placeholder) !== null && _a !== void 0 ? _a : '';
            let newWidth;
            if (!isLeftLabel) {
                const textWidth = Math.max((text || '').length, (((_b = getComparisonValue(selectedItem, getOptionLabel)) === null || _b === void 0 ? void 0 : _b.toString()) || '').length);
                const inPixel = size === 'lg' ? 11 : 9;
                newWidth = textWidth * inPixel;
            }
            else {
                const inPixel = size === 'lg' ? 11 : 9;
                const selectedValue = ((_c = getComparisonValue(selectedItem, getOptionLabel)) === null || _c === void 0 ? void 0 : _c.toString()) || '';
                newWidth = (text.length + selectedValue.length) * inPixel + 40;
            }
            setContainerWidth(newWidth);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedItem, label, isOpen, size, placeholder, onClose, isLeftLabel]);
    useEffect(() => {
        if (options) {
            const modifiedOptions = options.map((option, index) => {
                const modifiedOption = checkItem === null || checkItem === void 0 ? void 0 : checkItem(option, getOptionLabel, option === null || option === void 0 ? void 0 : option.disabled, isDivider);
                if (modifiedOption &&
                    getComparisonValue(modifiedOption, getOptionLabel) === getComparisonValue(selectedItem, getOptionLabel)) {
                    setActiveIndex(index);
                }
                return modifiedOption;
            });
            setModifiedOptions(modifiedOptions);
        }
    }, [options]);
    useEffect(() => {
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
    }, [value, defaultValue]);
    useEffect(() => {
        setErrorInput(error);
    }, [error]);
    useEffect(() => {
        setFilteredOptions(modifiedOptions);
    }, [modifiedOptions]);
    return (React.createElement("div", { id: id, className: wrapperClassess, ref: containerRef, onClick: onClick, style: style ? style : { width: isLeftLabel && containerWidth ? `${containerWidth}px` : '100%' } },
        label && (React.createElement(Typography, { variant: "Caption", className: labelClasses }, label)),
        React.createElement("button", { className: buttonClassess, onClick: readOnly ? undefined : handleToggle, disabled: disabled, tabIndex: 0, onKeyDown: handleKeyDown },
            getTextField(),
            React.createElement("div", { className: styles.actionButtons },
                clearable && !readOnly && !disabled && (selectedItem || (enableAutocomplete && searchValue)) && (React.createElement("div", { className: styles.resetButton },
                    React.createElement(IconClose, { strokeWidth: "0.2", htmlColor: "var(--text-light)", onClick: handleReset }))),
                React.createElement("div", { className: styles.dropdownIcon }, !isOpen ? (React.createElement(ChevronDown, { strokeWidth: size === 'lg' ? '0.5' : '0.3' })) : (React.createElement(ChevronUp, { strokeWidth: size === 'lg' ? '0.5' : '0.3' })))),
            getDropdownMenu()),
        errorInput && errorInputHelperText && (React.createElement(Typography, { variant: "Caption", className: classNames(styles.helperText, styles[size]) }, helperText !== null && helperText !== void 0 ? helperText : errorInputHelperText))));
};
