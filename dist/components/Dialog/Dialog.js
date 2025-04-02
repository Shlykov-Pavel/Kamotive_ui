import React from 'react';
import styles from './Dialog.module.css';
import classNames from 'classnames';
export const Dialog = ({ open, maxWidth = 'md', children, style, className, overlay = true, fullWidth = false }) => {
    const isMaxWidthInPx = typeof maxWidth === 'string' && !isNaN(Number(maxWidth.replace('px', '')));
    return (React.createElement(React.Fragment, null,
        open && overlay && React.createElement("div", { className: styles.dialogOverlay }),
        React.createElement("dialog", { open: open, className: classNames(styles['dialog'], !isMaxWidthInPx && styles[`maxWidth--${maxWidth}`], className), style: Object.assign(Object.assign({}, style), { maxWidth: isMaxWidthInPx ? maxWidth : '', width: fullWidth ? '100%' : '' }) },
            React.createElement("div", { className: styles['content'] }, children))));
};
