import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';
import { ChevronDown10 } from '../../Icons/ChevronDown/ChevronDown10';
import { ChevronUp10 } from '../../Icons/ChevronUp/ChevronUp10';
import { IconClose10 } from '../../Icons/IconClose/IconClose10';
import { IconCheck10 } from '../../Icons/IconCheck/IconCheck10';
;
import { Typography } from '../Typography/Typography';
function checkItem(item, getOptionLabel, disabled, isDivider) {
    if (typeof item === 'object' && item !== null) {
        //проверка на вложенные объекты с таким же типом
        Object.keys(item).forEach((key) => {
            const value = item[key];
            if (typeof value === 'object' && value !== null && !React.isValidElement(value)) {
                const nestedItem = checkItem(value, getOptionLabel, disabled, isDivider);
                if (nestedItem) {
                    if (!item.children) {
                        item.children = [];
                    }
                    item.children.push(nestedItem);
                    delete item[key];
                }
            }
        });
        // проверка на наличие пользовательского поля для вывода(передаваемой функции getOptionLabel)
        if (getOptionLabel) {
            return Object.assign(Object.assign({}, item), { value: getOptionLabel(item), disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
        }
        if ('value' in item) {
            return Object.assign(Object.assign({}, item), { disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
        }
        else if ('name' in item && !('value' in item)) {
            return Object.assign(Object.assign({}, item), { value: item.name, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
        }
        else if ('description' in item && !('value' in item)) {
            return Object.assign(Object.assign({}, item), { value: item.description, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
        }
        else {
            const keys = Object.keys(item);
            if (keys.length) {
                const firstValue = item[keys[0]];
                return Object.assign(Object.assign({}, item), { value: firstValue, disabled: disabled !== null && disabled !== void 0 ? disabled : false, isDivider: isDivider !== null && isDivider !== void 0 ? isDivider : false });
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
export const DropdownListItem = ({ item, getOptionLabel, size = 'md', selectedItem, variant, onChange, isActive, activeIndex, index, }) => {
    var _a;
    const handleItemClick = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!(item === null || item === void 0 ? void 0 : item.disabled)) {
            onChange(event, item);
        }
    }, [item, onChange]);
    const itemContainerClasses = classNames(styles[`item--container`], { [styles['item--container--active']]: isActive });
    const itemClassess = classNames(styles[`item-block`], styles[`button--${size}`], {
        [styles['item-block--disabled']]: item === null || item === void 0 ? void 0 : item.disabled,
        [styles['item-block--active']]: isActive,
    });
    const itemBlock = classNames(styles[`item-block`], styles[`item-block-${variant}`], { [styles[`item-block-${variant}--selected`]]: (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) === (item === null || item === void 0 ? void 0 : item.value) }, { [styles['item-block--disabled']]: item === null || item === void 0 ? void 0 : item.disabled });
    return (React.createElement("div", { className: itemContainerClasses, onClick: handleItemClick },
        React.createElement("div", { className: itemClassess },
            React.createElement("div", { className: itemBlock },
                variant === 'icons' &&
                    (item === null || item === void 0 ? void 0 : item.icon) &&
                    React.cloneElement(item.icon, {
                        strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
                    }),
                React.createElement("div", { className: styles.item },
                    React.createElement("span", null, item === null || item === void 0 ? void 0 : item.value)),
                (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) === (item === null || item === void 0 ? void 0 : item.value) && (React.createElement(IconCheck10, { strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0', htmlColor: "#0D99FF" }))),
            (item === null || item === void 0 ? void 0 : item.isDivider) && React.createElement("div", { className: styles.divider })),
        (item === null || item === void 0 ? void 0 : item.children) && (React.createElement("div", { className: styles.nestedMenu }, (_a = item.children) === null || _a === void 0 ? void 0 : _a.map((child, childIndex) => {
            var _a;
            return (React.createElement(DropdownListItem, { key: (_a = child === null || child === void 0 ? void 0 : child.key) !== null && _a !== void 0 ? _a : childIndex, item: child, getOptionLabel: getOptionLabel, size: size, selectedItem: selectedItem, onChange: onChange, isActive: activeIndex === index, activeIndex: activeIndex, index: childIndex }));
        })))));
};
export const Dropdown = ({ id, label, placeholder, size = 'lg', options, getOptionLabel, value, defaultValue, variant = 'text', style, className, disabled = false, readOnly = false, isOpened = false, noOptionsText = 'Нет вариатов для выбора', isLeftLabel = false, error = false, helperText, onChange, onClose, clearable = true, required = false, isDivider = false, }) => {
    var _a;
    const [isOpen, setIsOpen] = useState(isOpened);
    const [modifiedOptions, setModifiedOptions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [errorInput, setErrorInput] = useState(false);
    const [errorInputHelperText, setErrorInputHelperText] = useState(helperText);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(undefined);
    const handleToggle = (event) => {
        setIsOpen((prev) => !prev);
        if (isOpen) {
            onClose === null || onClose === void 0 ? void 0 : onClose(event);
        }
    };
    const onChangeHandler = (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        const newEvent = Object.assign(Object.assign({}, event), { currentTarget: Object.assign(Object.assign({}, event.currentTarget), { value: item }) });
        if ((selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) !== (item === null || item === void 0 ? void 0 : item.value)) {
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
        const startValue = defaultValue
            ? checkItem(defaultValue)
            : null;
        setSelectedItem(startValue !== null && startValue !== void 0 ? startValue : null);
        setIsOpen(false);
        onChange === null || onChange === void 0 ? void 0 : onChange(event, startValue !== null && startValue !== void 0 ? startValue : null);
        onClose === null || onClose === void 0 ? void 0 : onClose(event);
        setActiveIndex(-1);
        if (required) {
            setErrorInput(true);
            setErrorInputHelperText(helperText !== null && helperText !== void 0 ? helperText : 'Поле обязательно для заполнения');
        }
    };
    const wrapperClassess = classNames(className, {
        [styles['dropdown--container']]: !isLeftLabel,
        [styles['dropdown--container-left']]: isLeftLabel,
        [styles['dropdown--container-label']]: label && !isLeftLabel && !required,
        [styles['dropdown--container-helperText']]: errorInput,
    });
    const buttonClassess = classNames(styles.button, styles[`button--${size}`], {
        [styles['button-item--selected']]: (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) && !disabled,
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
    const getDropdownMenu = () => {
        const menu = isOpen && (React.createElement("div", { className: dropdownClassess }, modifiedOptions && modifiedOptions.length > 0 ? (modifiedOptions.map((modifiedOption, index) => {
            var _a;
            return (React.createElement(DropdownListItem, { key: (_a = modifiedOption === null || modifiedOption === void 0 ? void 0 : modifiedOption.key) !== null && _a !== void 0 ? _a : index, item: modifiedOption, getOptionLabel: getOptionLabel, size: size, selectedItem: selectedItem, variant: variant, onChange: onChangeHandler, isActive: activeIndex === index, activeIndex: activeIndex, index: index }));
        })) : (React.createElement("div", { className: styles['no-options'] }, noOptionsText))));
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
                const textWidth = Math.max((text || '').length, (((_b = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) === null || _b === void 0 ? void 0 : _b.toString()) || '').length);
                const inPixel = size === 'lg' ? 11 : 9;
                newWidth = textWidth * inPixel;
            }
            else {
                const inPixel = size === 'lg' ? 11 : 9;
                const selectedValue = ((_c = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) === null || _c === void 0 ? void 0 : _c.toString()) || '';
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
                const modifiedOption = checkItem === null || checkItem === void 0 ? void 0 : checkItem(option, getOptionLabel, disabled, isDivider);
                if (modifiedOption && modifiedOption.value === (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value)) {
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
    }, [value, defaultValue, checkItem]);
    useEffect(() => {
        setErrorInput(error);
    }, [error]);
    return (React.createElement("div", { id: id, className: wrapperClassess, ref: containerRef, style: style ? style : { width: isLeftLabel && containerWidth ? `${containerWidth}px` : '100%' } },
        label && (React.createElement(Typography, { variant: "Caption", className: labelClasses }, label)),
        React.createElement("button", { className: buttonClassess, onClick: readOnly ? undefined : handleToggle, disabled: disabled, tabIndex: 0, onKeyDown: handleKeyDown },
            React.createElement("div", { className: selectedItemClassess },
                variant === 'icons' &&
                    (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon) &&
                    React.cloneElement(selectedItem.icon, {
                        strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
                    }),
                selectedItem ? selectedItem.value : ((_a = placeholder !== null && placeholder !== void 0 ? placeholder : label) !== null && _a !== void 0 ? _a : 'Выберите значение')),
            clearable && !readOnly && !disabled && selectedItem && (React.createElement("div", { className: styles.resetButton },
                React.createElement(IconClose10, { strokeWidth: "0.2", htmlColor: "var(--text-light)", onClick: handleReset }))),
            React.createElement("div", { className: styles.dropdownIcon }, !isOpen ? (React.createElement(ChevronDown10, { strokeWidth: size === 'lg' ? '0.5' : '0.3' })) : (React.createElement(ChevronUp10, { strokeWidth: size === 'lg' ? '0.5' : '0.3' }))),
            getDropdownMenu()),
        errorInput && errorInputHelperText && (React.createElement(Typography, { variant: "Caption", className: classNames(styles.helperText, styles[size]) }, helperText !== null && helperText !== void 0 ? helperText : errorInputHelperText))));
};
