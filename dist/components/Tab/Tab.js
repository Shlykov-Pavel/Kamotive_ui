import React from 'react';
import styles from './Tab.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
export const Tab = ({ value, onClick, onMouseEnter, label, selected, disabled = false, style, className }) => {
    const handleClick = (e) => {
        if (onClick && value && !disabled) {
            onClick(value);
        }
    };
    return (React.createElement("button", { role: "tab", "aria-selected": selected, "aria-disabled": disabled, value: value, className: classNames(styles.tab, {
            [styles.selected]: selected,
            [styles.disabled]: disabled,
            [className || '']: className,
        }), onClick: handleClick, onMouseEnter: onMouseEnter, style: style },
        React.createElement(Typography, { variant: selected ? 'Body1-SemiBold' : 'Body1' }, label)));
};
