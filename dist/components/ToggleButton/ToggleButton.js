import React from 'react';
import styles from './ToggleButton.module.css';
import classNames from 'classnames';
;
import { Typography } from '../Typography/Typography';
export const ToggleButton = ({ value, onChange, disabled = false, size = 'md', label, testId = "default" }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };
    return (React.createElement("label", { className: styles.toggle, "data-test-id": `${testId}-toggle` },
        React.createElement("input", { type: "checkbox", name: "toggle", checked: value, onChange: handleChange, disabled: disabled, className: classNames(styles.toggleInput, styles[size]), "data-test-id": `${testId}-toggle-input` }),
        React.createElement(Typography, { variant: 'Body2', testId: `${testId}-toggle` }, label)));
};
