import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './ListItem.module.css';
import { Typography } from '../Typography/Typography';
import { Checkbox } from '../Checkbox/Checkbox';
import { RadioButton } from '../RadioButton/RadioButton';
export const ListItem = ({ id, onClick, onCheck, onRadioSelect, checked = false, selected = false, disabled = false, label, style, className, withCheckbox = false, checkboxColor, checkboxFilled, withRadioButton = false, customBullet, bulletClassName, children, parentChecked, testId = 'default' }) => {
    const [isChecked, setIsChecked] = useState(checked || parentChecked);
    const itemClassNames = classNames(className, styles.listItem);
    const handleClick = (e) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    };
    const handleCheckboxClick = (e) => {
        e.stopPropagation();
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onCheck) {
            onCheck(id || "", newCheckedState);
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
    return (React.createElement("div", { className: itemClassNames, style: style, onClick: handleClick, "data-test-id": `${testId}-item-block` },
        withCheckbox && (React.createElement("span", { className: styles.icon, onClick: handleCheckboxClick, "data-test-id": `${testId}-item-checkbox-block` },
            React.createElement(Checkbox, { checked: isChecked, color: checkboxColor, filled: checkboxFilled, disabled: disabled, testId: `${testId}-item` }))),
        withRadioButton && (React.createElement("span", { className: styles.icon, onClick: handleRadioClick, "data-test-id": `${testId}-item-radio-block` },
            React.createElement(RadioButton, { checked: selected, value: id, disabled: disabled, testId: `${testId}-item` }))),
        customBullet && React.createElement("span", { className: bulletClassName, "data-test-id": `${testId}-item-bullet` }, customBullet),
        React.createElement(Typography, { variant: "Body1", testId: `${testId}-item` }, label),
        children));
};
