import React from 'react';
import styles from './Tab.module.css';
import classNames from 'classnames';
;
import { Typography } from '../Typography/Typography';
export const Tab = ({ value, onClick, label, selected, disabled = false }) => {
    const handleClick = (e) => {
        if (onClick && value && !disabled) {
            onClick(value);
        }
    };
    return (React.createElement("button", { role: "tab", "aria-selected": selected, "aria-disabled": disabled, value: value, className: classNames(styles.tab, {
            [styles['selected']]: selected,
            [styles['disabled']]: disabled,
        }), onClick: handleClick },
        React.createElement(Typography, { variant: selected ? 'Body2-Medium' : "Body2" }, label)));
};
