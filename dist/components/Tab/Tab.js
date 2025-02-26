import React from 'react';
import styles from './Tab.module.css';
import classNames from 'classnames';
export const Tab = ({ value, onClick, label, selected, disabled = false }) => {
    const handleClick = (e) => {
        if (onClick && value && !disabled) {
            onClick(value);
        }
    };
    return (React.createElement("button", { role: "tab", "aria-selected": selected, "aria-disabled": disabled, value: value, className: classNames(styles['tab'], {
            'selected': selected,
            'disabled': disabled,
        }), onClick: handleClick }, label));
};
