import React from 'react';
import styles from './Checkbox.module.css';
import classNames from 'classnames';
export const Checkbox = ({ checked, onChange, disabled = false, size = 'sm', label }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };
    return (React.createElement("label", { className: styles["checkbox"] },
        React.createElement("input", { type: "checkbox", checked: checked, onChange: handleChange, disabled: disabled, className: classNames('input', size) }),
        label));
};
