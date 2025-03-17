import React, { useEffect, useRef, useState } from 'react';
;
import styles from './Tag.module.css';
import classNames from 'classnames';
const hexToRgba = (hex, alpha) => {
    //преобразуем в rgba для заднего фона
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
// функция для расчёта относительной яркости
const getLuminance = (hexColor) => {
    var _a;
    const rgb = (_a = hexColor
        .replace('#', '')
        .match(/.{2}/g)) === null || _a === void 0 ? void 0 : _a.map((c) => parseInt(c, 16) / 255);
    if (!rgb)
        return 0;
    const [r, g, b] = rgb.map((c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
// функция для проверки контрастности
const getContrastRatio = (color1, color2) => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};
// проверка и смену цвета текста
const adjustTextColor = (backgroundColor) => {
    const white = '#ffffff';
    const black = hexToRgba('#000000', 0.4);
    const contrastWithWhite = getContrastRatio(backgroundColor, white);
    return contrastWithWhite < 1.5 ? black : "";
};
export const Tag = ({ label, color = 'red', closeButton = false, editable = 'false', onClick, onChange, }) => {
    const [newLabel, setNewLabel] = useState(label);
    const [width, setWidth] = useState(0);
    const measurementDivRef = useRef(null);
    const adjustedColor = adjustTextColor(color) || color;
    useEffect(() => {
        if (measurementDivRef.current) {
            const textWidth = measurementDivRef.current.clientWidth;
            setWidth(textWidth);
        }
    }, [newLabel]);
    const handleBlur = () => {
        if (onChange) {
            onChange(newLabel);
        }
    };
    return (React.createElement("span", { className: classNames(styles.tag, !color.startsWith('#') && styles[color]), style: color.startsWith('#')
            ? {
                color: adjustedColor,
                border: `1px solid ${adjustedColor}`,
                backgroundColor: hexToRgba(color, 0.2),
            }
            : {} },
        editable ? (React.createElement("div", { style: { position: "relative" } },
            React.createElement("input", { type: "text", placeholder: label, value: newLabel, onChange: (e) => {
                    setNewLabel(e.target.value);
                }, onBlur: handleBlur, style: {
                    color: (color === null || color === void 0 ? void 0 : color.startsWith('#')) ? adjustedColor : `var(--${color})`,
                    '--placeholder-color': (color === null || color === void 0 ? void 0 : color.startsWith('#')) ? adjustedColor : `var(--${color})`,
                    width: `${width}px`,
                    minWidth: '25px',
                } }),
            React.createElement("div", { ref: measurementDivRef, style: {
                    position: 'absolute',
                    visibility: 'hidden',
                    height: 0,
                    whiteSpace: 'pre',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    letterSpacing: 'inherit',
                } }, newLabel || 'Item'))) : (React.createElement(React.Fragment, null,
            " ",
            label,
            " ")),
        closeButton && (React.createElement("button", { type: "button", "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: color.startsWith('#')
                ? { '--close-color': adjustedColor }
                : { '--close-color': `var(--${color})` }, onClick: onClick }))));
};
