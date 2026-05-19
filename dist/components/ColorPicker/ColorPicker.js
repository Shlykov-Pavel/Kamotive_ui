import React, { useEffect, useRef, useState } from 'react';
import styles from './ColorPicker.module.css';
import classNames from 'classnames';
import { Chrome } from '@uiw/react-color';
import EditableInput from '@uiw/react-color-editable-input';
import { GithubPlacement } from '@uiw/react-color-github';
import { IconColorPicker } from '../../Icons';
;
// Функция для преобразования HEXA в HEX
const hexaToHex = (hexa = 'fff') => {
    const cleanHex = hexa.replace('#', '');
    if (cleanHex.length >= 8) {
        return `#${cleanHex.slice(0, 6)}`;
    }
    if (cleanHex.length === 6) {
        return `#${cleanHex}`;
    }
    if (cleanHex.length === 3) {
        return `#${cleanHex[0]}${cleanHex[0]}${cleanHex[1]}${cleanHex[1]}${cleanHex[2]}${cleanHex[2]}`;
    }
    if (cleanHex.length < 6) {
        return `#${cleanHex + '0'.repeat(6 - cleanHex.length)}`;
    }
    return '#ffffff';
};
/**
 * Функция-обертка. Вызывает функцию-колбэк через заданный промежуток времени после того, как мышь покинет область
 * @param callback функция-колбэк
 * @param delay время в мс, через которое будет вызвана функция
 */
const mouseLeaveTimer = (callback, delay) => {
    let timer = null;
    function wrapper(element) {
        const handleMouseLeave = () => {
            timer = setTimeout(() => {
                callback();
                timer = null;
            }, delay);
        };
        const handleMouseEnter = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        };
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mouseenter', handleMouseEnter);
        // функция очистки
        return function cleanup() {
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mouseenter', handleMouseEnter);
            if (timer) {
                clearTimeout(timer);
            }
        };
    }
    return wrapper;
};
/**
 * Компонент ColorPicker представляет собой элемент управления для выбора цвета.
 */
export const ColorPicker = ({ color = '#ffffff', mainColor, recentColors, setIsHovered, width = 10, height = 10, autoOpen = false, onChange, onColorChange, testId = 'default' }) => {
    const [colorValue, setColorValue] = useState(mainColor);
    const [selectedColor, setSelectedColor] = useState(color);
    const [isColorChanged, setIsColorChanged] = useState(false);
    const [isOpen, setIsOpen] = useState(autoOpen);
    const [popoverPosition, setPopoverPosition] = useState('bottom');
    const circleRef = useRef(null);
    const popoverRef = useRef(null);
    const divRef = useRef(null);
    const mainColorClasses = classNames(styles.circle, {
        [styles['mainColor']]: mainColor,
    });
    const colorCircleDefaultClasses = classNames(styles.circle, styles.colorCircleDefault);
    const popoverClassess = classNames(styles['popover'], {
        [styles[`popover--${popoverPosition}`]]: true,
    });
    useEffect(() => {
        if (!divRef.current)
            return;
        const setTimer = mouseLeaveTimer(() => {
            setIsHovered(false);
            if (onChange) {
                onChange(colorValue || color);
            }
        }, 800);
        const cleanup = setTimer(divRef.current);
        return cleanup;
    }, []);
    useEffect(() => {
        // Обработчик клика вне компонента развертывания выбора цвета
        const handleClickOutside = (event) => {
            if (isOpen &&
                popoverRef.current &&
                circleRef.current &&
                !popoverRef.current.contains(event.target) &&
                !circleRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen && circleRef.current && popoverRef.current) {
            const circle = circleRef.current.getBoundingClientRect();
            const popover = popoverRef.current.getBoundingClientRect();
            const viewport = {
                top: 0,
                bottom: window.innerHeight
            };
            // Проверяем, достаточно ли места снизу
            const bottomSpace = viewport.bottom - circle.bottom;
            const topSpace = circle.top - viewport.top;
            // Если снизу недостаточно места и сверху места больше, размещаем сверху
            if (bottomSpace < popover.height && topSpace > bottomSpace) {
                setPopoverPosition('top');
            }
            else {
                setPopoverPosition('bottom');
            }
        }
        !autoOpen && document.addEventListener('mousedown', handleClickOutside);
        return () => {
            !autoOpen && document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    useEffect(() => {
        setSelectedColor(colorValue || color);
    }, [colorValue]);
    const colorChangeHandler = (color) => {
        const newColor = typeof color === 'string' ? color : color.hexa;
        setIsColorChanged(true);
        setColorValue(newColor);
        setSelectedColor(newColor);
        onColorChange === null || onColorChange === void 0 ? void 0 : onColorChange(newColor);
    };
    return (React.createElement("div", { className: (mainColor || recentColors) && styles.colorPickerWrapper, ref: divRef, "data-test-id": `${testId}-color-block` },
        mainColor && (React.createElement("div", { className: mainColorClasses, style: {
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: (colorValue === null || colorValue === void 0 ? void 0 : colorValue.startsWith('#')) ? colorValue : `var(--${colorValue})`,
            }, "data-test-id": `${testId}-color-current` })),
        recentColors &&
            recentColors.map((color, index) => (React.createElement("div", { key: index, className: styles.circle, style: {
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: color.startsWith('#') ? color : `var(--${color})`,
                }, onClick: () => colorChangeHandler(color), "data-test-id": `${testId}-color-${index}-circle` }))),
        React.createElement("div", { className: styles.colorPicker },
            React.createElement("div", { ref: circleRef, className: colorCircleDefaultClasses, onClick: () => setIsOpen(!isOpen), style: {
                    width: `${width}px`,
                    height: `${height}px`,
                }, "data-test-id": `${testId}-color-button` }),
            isOpen && (React.createElement("div", { "data-test-id": `${testId}-color-popover`, ref: popoverRef, className: popoverClassess },
                isOpen && React.createElement(IconColorPicker, { className: styles.colorPickerIcon, htmlColor: 'var(--white)' }),
                React.createElement("div", { "data-test-id": `${testId}-color-chrome` },
                    React.createElement(Chrome, { color: selectedColor, placement: GithubPlacement.Right, onChange: colorChangeHandler, className: styles.customChrome, showEyeDropper: false })),
                React.createElement("div", { className: styles.hex, style: { padding: '0 10px 0 20px' } },
                    React.createElement(EditableInput, { value: hexaToHex(selectedColor), style: { width: 68, alignItems: 'flex-start' }, onChange: (e, color) => {
                            const formattedColor = hexaToHex(color.toString());
                            colorChangeHandler(formattedColor);
                        }, "data-test-id": `${testId}-color-input` })))))));
};
export default ColorPicker;
