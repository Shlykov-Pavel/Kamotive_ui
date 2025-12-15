import React from 'react';
import styles from './Dialog.module.css';
import classNames from 'classnames';
import { Spinner } from '../Spinner/Spinner';
import { IconButton } from '../IconButton/IconButton';
import { IconClose } from '../../Icons/IconClose/IconClose';
export const Dialog = ({ open, onClose, maxWidth = 'md', children, style, className, overlay = true, fullWidth = false, isLoading = false }) => {
    const isMaxWidthInPx = typeof maxWidth === 'string' && !isNaN(Number(maxWidth.replace('px', '')));
    return (React.createElement(React.Fragment, null,
        open && overlay && React.createElement("div", { className: styles.dialogOverlay }),
        React.createElement("dialog", { open: open, className: classNames(styles['dialog'], !isMaxWidthInPx && styles[`maxWidth--${maxWidth}`], isLoading && styles['dialogLoading'], className), style: Object.assign(Object.assign({}, style), { maxWidth: isMaxWidthInPx ? maxWidth : '', width: fullWidth ? '100%' : '' }) },
            onClose && (React.createElement("div", { className: styles.closeButtonWrapper },
                React.createElement(IconButton, { onClick: onClose, icon: React.createElement(IconClose, null), color: "var(--icons-grey)", size: "lg" }))),
            isLoading && React.createElement("div", { className: styles['loader'] },
                React.createElement(Spinner, null)),
            React.createElement("div", { className: styles['content'] }, children))));
};
