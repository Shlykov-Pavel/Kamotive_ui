import React from 'react';
;
import styles from './Tag.module.css';
import classNames from 'classnames';
export const Tag = ({ label, color = 'red', closeButton = false, onClick }) => {
    const hexToRgba = (hex, alpha) => {
        //преобразуем в rgba для заднего фона
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    return (React.createElement("span", { className: classNames(styles.tag, !color.startsWith('#') && styles[color]), style: color.startsWith('#')
            ? {
                color: color,
                border: `1px solid ${color}`,
                backgroundColor: hexToRgba(color, 0.2),
            }
            : {} },
        label,
        closeButton && (React.createElement("button", { type: "button", "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: color.startsWith('#')
                ? { '--close-color': color }
                : { '--close-color': `var(--${color})` }, onClick: onClick }))));
};
