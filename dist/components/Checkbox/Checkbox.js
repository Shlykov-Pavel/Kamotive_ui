import React from 'react';
import styles from './Checkbox.module.css';
import classNames from 'classnames';
;
import { Typography } from '../Typography/Typography';
export const Checkbox = ({ checked, onChange, disabled = false, size = 'sm', label, color, filled }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };
    const checkboxStyles = {
        '--border-color': color || 'var(--icons-active)',
        '--border-color-hover': color ? 'color-mix(in srgb, var(--border-color) 60%, white)' : 'var(--blue-main)',
        '--border-color-checked': color || 'var(--icons-medium)',
        '--border-color-disabled': color ? 'color-mix(in srgb, var(--border-color) 30%, white)' : 'var(--icons-light)',
        '--background-color-hover': filled ? 'var(--border-color-hover)' : 'var(--white)',
        '--background-color-checked': filled ? 'var(--border-color-checked)' : 'var(--white)',
        '--background-color-disabled': filled ? 'var(--border-color-disabled)' : 'var(--white)',
        '--arrow-color': filled ? 'var(--white)' : 'var(--border-color-checked)',
        '--arrow-color-hover': filled ? 'var(--white)' : 'var(--border-color-hover)',
        '--arrow-color-disabled': filled ? 'var(--white)' : 'var(--border-color-disabled)',
    };
    return (React.createElement("label", { className: styles.checkbox, style: checkboxStyles },
        React.createElement("input", { type: "checkbox", checked: checked, onChange: handleChange, disabled: disabled, className: classNames(styles.input, styles[size]) }),
        React.createElement(Typography, { variant: 'Body2' }, label)));
};
