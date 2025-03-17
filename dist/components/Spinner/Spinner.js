import React from 'react';
import styles from './Spinner.module.css';
;
/**
 * Компонент Spinner отображает индикатор загрузки.
 */
const spinnerSizes = { lg: 54, md: 34, sm: 24, xs: 8 };
export const Spinner = ({ size = 'md', }) => {
    const spinnerSize = typeof size === 'string' ? spinnerSizes[size] : size;
    const viewBoxSize = 100;
    const strokeWidth = size === 'lg' || size === 'md' ? 12 : 10;
    const adjustedSize = spinnerSize + strokeWidth * 5;
    return (React.createElement("div", { className: styles['spinner-wrapper'], style: {
            width: adjustedSize,
            height: adjustedSize,
            padding: strokeWidth
        } },
        React.createElement("svg", { id: "spinner", viewBox: `0 0 ${viewBoxSize} ${viewBoxSize}`, className: styles["spinner"], fill: "none", color: 'var(--blue-main)' },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "spinner-secondHalf" },
                    React.createElement("stop", { offset: "0%", stopOpacity: "0", stopColor: "currentColor" }),
                    React.createElement("stop", { offset: "100%", stopOpacity: "0.9", stopColor: "currentColor" })),
                React.createElement("linearGradient", { id: "spinner-firstHalf" },
                    React.createElement("stop", { offset: "0%", stopOpacity: "1", stopColor: "currentColor" }),
                    React.createElement("stop", { offset: "100%", stopOpacity: "0.9", stopColor: "currentColor" }))),
            React.createElement("g", { strokeWidth: strokeWidth, className: styles.spinnerRotate },
                React.createElement("path", { stroke: "url(#spinner-secondHalf)", d: "M 15 50 A 35 35 0 0 1 85 50" }),
                React.createElement("path", { stroke: "url(#spinner-firstHalf)", d: "M 85 50 A 35 35 0 0 1 15 50" }),
                React.createElement("path", { stroke: "currentColor", strokeLinecap: "round", d: "M 15 50 A 35 35 0 0 1 15 48" })))));
};
