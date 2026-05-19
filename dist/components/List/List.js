import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './List.module.css';
import { Typography } from '../Typography/Typography';
import { Checkbox } from '../Checkbox/Checkbox';
import { RadioButton } from '../RadioButton/RadioButton';
import { ChevronDown } from '../../Icons';
import { ListItem } from '../ListItem/ListItem';
export const List = ({ onClick, onCheck, onRadioSelect, checked = false, selected = false, disabled = false, label, id, style, className, collapsible = false, open = false, withCheckbox = false, checkboxColor, checkboxFilled, withRadioButton = false, customBullet, customItemBullet, bulletClassName, titleContent, children, isHeader = false, parentChecked = false, testId = 'default' }) => {
    const [isOpen, setIsOpen] = useState(open);
    const [isChecked, setIsChecked] = useState(checked || parentChecked);
    const childIds = [];
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.props.id) {
            childIds.push(child.props.id);
        }
    });
    const handleClick = (e) => {
        if (collapsible) {
            setIsOpen(!isOpen);
        }
        if (onClick) {
            onClick();
        }
    };
    const handleChildCheck = (childId, isChecked) => {
        if (onCheck) {
            onCheck(childId, isChecked);
        }
    };
    const handleChildRadioSelect = (childId) => {
        if (onRadioSelect) {
            onRadioSelect(childId);
        }
    };
    const handleCheckboxClick = (e) => {
        e.stopPropagation();
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onCheck) {
            onCheck(id || '', newCheckedState);
        }
        if (childIds.length > 0 && onCheck) {
            childIds.forEach((childId) => {
                onCheck(childId, newCheckedState);
            });
        }
    };
    const handleRadioClick = (e) => {
        e.stopPropagation();
        if (id && onRadioSelect) {
            onRadioSelect(id);
        }
    };
    useEffect(() => {
        setIsChecked(parentChecked || checked);
    }, [parentChecked, checked]);
    const headerClassNames = classNames(styles.header, className);
    const contentClassNames = classNames(styles.content, isOpen ? styles['content--expanded'] : styles['content--collapsed']);
    return (React.createElement("div", { className: styles.collapsibleList, "data-test-id": `${testId}-list` },
        label || titleContent && (React.createElement("div", { className: headerClassNames, onClick: handleClick, style: style, "data-test-id": `${testId}-list-header` },
            !isHeader && (React.createElement("div", null,
                withCheckbox && (React.createElement("span", { onClick: handleCheckboxClick, "data-test-id": `${testId}-list-chechbox-block` },
                    React.createElement(Checkbox, { checked: isChecked, color: checkboxColor, filled: checkboxFilled, disabled: disabled, testId: `${testId}-list` }))),
                withRadioButton && (React.createElement("span", { onClick: handleRadioClick, "data-test-id": `${testId}-list-radio-block` },
                    React.createElement(RadioButton, { checked: selected, value: id, disabled: disabled, testId: `${testId}-list` }))),
                customBullet && React.createElement("span", { className: classNames(styles.bullet, bulletClassName), "data-test-id": `${testId}-list-bullet` }, customBullet))),
            label && React.createElement(Typography, { variant: "Body1", testId: `${testId}-list` }, label),
            titleContent,
            collapsible && (React.createElement("span", { className: styles.indicator, "data-test-id": `${testId}-list-action-icon` }, isOpen ? React.createElement(ChevronDown, null) : React.createElement(ChevronDown, { rotation: 270 }))))),
        React.createElement("div", { className: collapsible ? contentClassNames : styles.content, style: { paddingLeft: !label ? 0 : '16px' }, "data-test-id": `${testId}-list-content-block` }, React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
                const childTestId = child.props.testId || `${testId}-list-${index}`;
                const commonProps = {
                    style: child.props.style || style,
                    className: child.props.className,
                    testId: childTestId,
                };
                if (child.type === ListItem || child.type === List) {
                    return React.cloneElement(child, Object.assign(Object.assign({}, commonProps), { bulletClassName: classNames(styles.bullet, child.props.bulletClassName || bulletClassName), customBullet: child.props.customBullet !== undefined
                            ? child.props.customBullet
                            : customItemBullet !== undefined
                                ? customItemBullet
                                : customBullet, withCheckbox: child.props.withCheckbox !== undefined ? child.props.withCheckbox : withCheckbox, checkboxFilled: child.props.checkboxFilled !== undefined ? child.props.checkboxFilled : checkboxFilled, withRadioButton: child.props.withRadioButton !== undefined ? child.props.withRadioButton : withRadioButton, onCheck: handleChildCheck, onRadioSelect: handleChildRadioSelect, parentChecked: isChecked, selected: child.props.selected }));
                }
                return React.cloneElement(child, commonProps);
            }
            return child;
        }))));
};
