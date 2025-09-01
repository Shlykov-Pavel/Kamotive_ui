import React from 'react';
import classNames from 'classnames';
import styles from './IconButton.module.css';
export const IconButton = ({ icon, size = 'md', color, style, disabled = false, onClick, children, className, }) => {
    const validChildren = React.Children.toArray(children).filter((child) => React.isValidElement(child));
    const renderIcon = icon || validChildren[0];
    const combinedStyle = Object.assign(Object.assign(Object.assign({}, style), ((style === null || style === void 0 ? void 0 : style.backgroundColor) && {
        '--hover-background': `color-mix(in ${style.backgroundColor} 85%, black)`,
    })), ((style === null || style === void 0 ? void 0 : style.borderRadius) && {
        '--hover-border-radius': style.borderRadius,
    }));
    return (React.createElement("button", { className: classNames(styles['iconButton'], styles[`iconButton--${size}`], className), disabled: disabled, "aria-disabled": disabled, type: "button", onClick: (e) => onClick(e), style: combinedStyle }, renderIcon &&
        (() => {
            var _a;
            const iconElement = renderIcon;
            const defaultStrokeWidth = size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0';
            return React.cloneElement(iconElement, {
                htmlColor: color,
                strokeWidth: (_a = iconElement.props.strokeWidth) !== null && _a !== void 0 ? _a : defaultStrokeWidth,
            });
        })()));
};
