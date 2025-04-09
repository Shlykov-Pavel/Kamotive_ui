import React from 'react';
import classNames from 'classnames';
import styles from './IconButton.module.css';
export const IconButton = ({ icon, size = 'md', color, style, disabled = false, onClick, children, className }) => {
    return (React.createElement("button", { className: classNames(styles['iconButton'], styles[`iconButton--${size}`], className), disabled: disabled, "aria-disabled": disabled, type: "button", onClick: onClick, style: style }, (icon || (typeof children === 'object' && children)) &&
        React.cloneElement(icon, {
            htmlColor: color,
            strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
        })));
};
