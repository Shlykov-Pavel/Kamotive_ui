import React from 'react';
import styles from './Checkbox.module.css';
import classNames from 'classnames';
;
import { Typography } from '../Typography/Typography';
export const Checkbox = ({ checked, onChange, disabled = false, size = 'sm', label }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };
    return (React.createElement("label", { className: styles.checkbox },
        React.createElement("input", { type: "checkbox", checked: checked, onChange: handleChange, disabled: disabled, className: classNames(styles.input, styles[size]) }),
        React.createElement(Typography, { variant: 'Body2' }, label)));
};
