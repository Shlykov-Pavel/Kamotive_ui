import React from 'react';
import styles from './TableFilterSidebar.module.css';
import classNames from 'classnames';
import { Spinner } from '../Spinner/Spinner';
import { IconButton } from '../IconButton/IconButton';
import { IconClose } from '../../Icons/IconClose/IconClose';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
export const TableFilterSidebar = ({ open, onClose, children, lng = 'ru', onReset, onApply, isResetDisabled, isApplyDisabled, style, className, isLoading, width = '340px', zIndex = 10000, top = 0, right = 0, }) => {
    if (!open)
        return null;
    const childrenArray = React.Children.toArray(children);
    const baseWidthNumber = parseInt(String(width), 10) || 340;
    const gap = 5;
    const columnsCount = Math.ceil(childrenArray.length / 4);
    // const sidebarWidth = `${baseWidthNumber * columnsCount + (columnsCount - 1) * gap}px`;
    const sidebarWidth = `${(baseWidthNumber * columnsCount) + (gap * (columnsCount - 1)) + 80}px`;
    const isGrid = columnsCount > 1;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.overlay, onClick: onClose, style: { zIndex } }),
        React.createElement("aside", { className: classNames(styles.sidebar, open && styles.open, className), style: Object.assign({ width: sidebarWidth, gap: `${gap + 5}px`, zIndex: zIndex + 1, top: `${top}px`, right: `${right}px` }, style) },
            React.createElement("div", { className: styles.header },
                React.createElement(Typography, { variant: 'Body1-SemiBold', style: { color: 'var(--text-dark)' } },
                    lng === 'ru' ? 'Фильтры' : 'Filters',
                    " "),
                React.createElement(IconButton, { title: lng === 'ru' ? 'Закрыть' : 'Close', onClick: onClose, icon: React.createElement(IconClose, null), color: "var(--icons-grey)", className: styles.closeBtn })),
            React.createElement("div", { className: styles.content }, isLoading ? (React.createElement("div", { className: styles.loaderWrapper },
                React.createElement(Spinner, null))) : (React.createElement("div", { style: {
                    display: 'grid',
                    gap: `${gap}px ${gap + 10}px`,
                    gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`
                } }, childrenArray.map((child, index) => (React.createElement("div", { key: index, style: {
                    minWidth: 0,
                    width: '100%',
                } }, child)))))),
            React.createElement("div", { className: styles.buttons },
                onReset && React.createElement(Button, { label: lng === 'ru' ? 'Сбросить' : 'Reset', variant: 'outline', onClick: onReset, disabled: isResetDisabled || isLoading }),
                onApply && React.createElement(Button, { label: lng === 'ru' ? 'Применить' : 'Apply', onClick: onApply, disabled: isApplyDisabled || isLoading })))));
};
