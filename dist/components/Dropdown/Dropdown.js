import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';
import { ChevronDown10 } from '../../Icons/ChevronDown/ChevronDown10';
import { ChevronUp10 } from '../../Icons/ChevronUp/ChevronUp10';
import { IconCheck10 } from '../../Icons/IconCheck/IconCheck10';
export const DropdownListItem = ({ item, size = 'md', selectedItem, style, onChange }) => {
    var _a;
    const handleItemClick = (item, disabled) => {
        if (!disabled) {
            onChange(item);
        }
    };
    const itemClassess = classNames(styles[`item-block`], styles[`button--${size}`], { 'item-block--selected': (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) === (item === null || item === void 0 ? void 0 : item.value) || (typeof selectedItem === 'string' || typeof selectedItem === 'number') && selectedItem === item }, { 'item-block--disabled': item === null || item === void 0 ? void 0 : item.disabled });
    const itemBlock = classNames(styles[`item-block`], styles[`item-block-${style}`], { [`item-block-${style}--selected`]: (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) === item.value }, { 'item-block--disabled': item.disabled });
    return (React.createElement("div", { className: styles[`item--container`] },
        React.createElement("div", { className: styles[itemClassess], onClick: () => handleItemClick(item, item.disabled) },
            React.createElement("div", { className: itemBlock },
                style === 'default' && item.icon && React.cloneElement(item.icon, { strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0' }),
                React.createElement("div", { className: styles["item"] },
                    React.createElement("span", null, (item === null || item === void 0 ? void 0 : item.value) || item)),
                (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) === item.value && React.createElement(IconCheck10, { strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0', htmlColor: '#0D99FF' })),
            item.isDivider && React.createElement("div", { className: styles["divider"] })),
        (item === null || item === void 0 ? void 0 : item.children) && (React.createElement("div", { className: styles["nestedMenu"] }, (_a = item.children) === null || _a === void 0 ? void 0 : _a.map((child, index) => (React.createElement(DropdownListItem, { key: index, item: child, size: size, selectedItem: selectedItem, onChange: onChange })))))));
};
export const Dropdown = ({ id, name, label, size = 'md', disabled, className, defaultValue, items, isOpened = false, style = 'default', readOnly = false, isLeftLabel = false }) => {
    const [isOpen, setIsOpen] = useState(isOpened);
    const [selectedItem, setSelectedItem] = useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : null);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(undefined);
    const icon = !isOpen ? React.createElement(ChevronDown10, null) : React.createElement(ChevronUp10, null);
    const handleToggle = () => {
        setIsOpen(prev => !prev);
    };
    const onChange = (item) => {
        if ((selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) !== item.value) {
            setSelectedItem(item);
            setIsOpen(false);
        }
        else {
            setSelectedItem(null);
        }
    };
    const wrapperClassess = classNames(styles[`dropdown--container`], {
        'wrapper--left': isLeftLabel,
    });
    const buttonClassess = classNames(styles['button'], className, styles[`button--${size}`], { 'button-item--selected': (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value) && !disabled }, { 'button--readOnly': readOnly }, { 'button--disabled': disabled });
    const dropdownClassess = classNames(styles['dropdown'], className, {
        'dropdown--disabled': disabled,
    });
    const labelClasses = classNames(styles['label'], { 'label--default': !isLeftLabel,
        'label--left': isLeftLabel,
    });
    const checkItem = (item) => {
        if (typeof item === 'object') {
            if (item.value) {
                return item;
            }
            else if (item.name && !item.value) {
                return Object.assign(Object.assign({}, item), { value: name });
            }
            else if (item.description && !item.value) {
                return Object.assign(Object.assign({}, item), { value: item.description });
            }
            else {
                const keys = Object.keys(item);
                if (keys.length) {
                    const firstValue = item[keys[0]];
                    return Object.assign(Object.assign({}, item), { value: firstValue });
                }
            }
        }
        else if (typeof item === 'string' || typeof item === 'number') {
            return { value: item };
        }
        else {
            return null;
        }
    };
    const getDropdownMenu = () => {
        // const menu = withPortal ? (
        //   ReactDOM.createPortal(<DropdownMenu withPortal >{children}</DropdownMenu>, portalContainer)
        // ) : <DropdownMenu>{children}</DropdownMenu>
        const menu = isOpen && React.createElement("div", { className: styles[dropdownClassess] }, items === null || items === void 0 ? void 0 : items.map((item, index) => {
            var _a;
            const modifiedItem = checkItem(item);
            return (React.createElement(DropdownListItem, { key: (_a = item === null || item === void 0 ? void 0 : item.key) !== null && _a !== void 0 ? _a : index, item: modifiedItem, size: size, selectedItem: selectedItem, style: style, onChange: onChange }));
        }));
        return isOpen ? menu : null;
    };
    useEffect(() => {
        if (containerRef.current) {
            const textWidth = Math.max(name === null || name === void 0 ? void 0 : name.length, (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.value.length) || 0);
            let newWidth;
            if (textWidth === (name === null || name === void 0 ? void 0 : name.length)) {
                const inPixel = size === 'sm' ? 11 : size === 'md' ? 12 : 14;
                newWidth = selectedItem ? textWidth * inPixel : textWidth * inPixel;
            }
            else {
                const inPixel = size === 'sm' ? 9 : size === 'md' ? 10 : 12;
                newWidth = textWidth * inPixel;
            }
            setContainerWidth(newWidth);
        }
    }, [selectedItem, name, isOpen, size]);
    return (React.createElement("div", { className: styles[wrapperClassess], ref: containerRef, style: { width: containerWidth ? `${containerWidth}px` : 'auto' } },
        selectedItem && label && (React.createElement("label", { className: labelClasses, htmlFor: id }, label)),
        React.createElement("button", { className: buttonClassess, onClick: readOnly ? undefined : handleToggle, disabled: disabled },
            React.createElement("div", { className: style === 'default' && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon) ? styles[`button--default--item-selected`] : '' },
                style === 'default' && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon) && React.cloneElement(selectedItem.icon, { strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0' }),
                selectedItem ? selectedItem.value : name),
            icon && React.cloneElement(icon, { strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0' })),
        getDropdownMenu()));
};
