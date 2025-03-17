import React, { useEffect, useState } from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
/**
 * Компонент Button представляет собой кнопку, которую можно настроить с помощью различных параметров (размер, иконки, стили, состояние).
 */
export const Button = ({ label, variant = 'fill', size = 'md', style, condition, icon, disabled = false, onClick, children, error, color, name, type = 'button', form }) => {
    const [buttonStyle, setButtonStyle] = useState('');
    const [buttonCondition, setButtonCondition] = useState(condition);
    const buttonClasses = classNames(styles['button'], styles[`button--${size}`], styles[`button--${buttonStyle}`], {
        [styles[`button--${variant}-${buttonCondition}`]]: buttonCondition && !color,
        [styles[`button--${variant}-custom`]]: color && !error
    });
    const iconColorFn = () => {
        if (buttonCondition && !color) {
            switch (buttonCondition) {
                case 'default':
                    if (variant === 'outline') {
                        return disabled ? '#8dc6ef' : '#0d99ff';
                    }
                    return '#FFFFFF';
                case 'error':
                    if (variant === 'outline') {
                        return disabled ? '#ff8d87' : '#ff3b30';
                    }
                    return '#FFFFFF';
                case 'success':
                    if (variant === 'outline') {
                        return disabled ? '#8ac99a' : '#34c759';
                    }
                    return '#FFFFFF';
                case 'warning':
                    if (variant === 'outline') {
                        return disabled ? '#ffb44a' : '#ff9500';
                    }
                    return '#FFFFFF';
                case 'info':
                    return disabled ? 'var(--gray-disabled)' : '#6F6F6F';
                default:
                    return '#FFFFFF';
            }
        }
        else if (color && !error) {
            if (variant === 'outline') {
                return disabled ? `color-mix(in srgb, ${color} 50%, white)` : color;
            }
            return '#FFFFFF';
        }
    };
    const btnIcon = icon || typeof children === 'object' && children;
    useEffect(() => {
        if (!buttonStyle && style) {
            setButtonStyle(style);
        }
        else {
            if (btnIcon && variant !== 'link') {
                if (!label && !(typeof children === 'string' && children)) {
                    setButtonStyle('icon');
                }
                else {
                    setButtonStyle('default');
                }
            }
            else {
                setButtonStyle('text');
            }
        }
    }, [style, btnIcon, label, children]);
    useEffect(() => {
        if (!condition) {
            if (error) {
                setButtonCondition('error');
            }
            else {
                setButtonCondition('default');
            }
        }
        else {
            error ? setButtonCondition('error') : setButtonCondition(condition);
        }
    }, [condition, error]);
    const iconColorStyle = iconColorFn();
    if (!buttonStyle) {
        return React.createElement("button", { className: buttonClasses },
            React.createElement(Typography, { variant: 'Body2' }, "\u041A\u043D\u043E\u043F\u043A\u0430"));
    }
    return (React.createElement("button", { className: buttonClasses, style: color && !error ? {
            '--button-color': color,
            '--button-hover-color': variant === 'fill' || variant === 'link' ? `color-mix(in srgb, ${color} 90%, black)` : `color-mix(in srgb, ${color} 10%, transparent)`,
            '--button-active-color': variant === 'fill' || variant === 'link' ? `color-mix(in srgb, ${color} 80%, black)` : `color-mix(in srgb, ${color} 20%, transparent)`,
            '--button-disabled-color': variant === 'fill' || variant === 'link' ? `color-mix(in srgb, ${color} 80%, white)` : `color-mix(in srgb, ${color} 10%, transparent)`,
            '--button-disabled-textColor': variant === 'fill' ? `color-mix(in srgb, ${color} 80%, white)` : `color-mix(in srgb, ${color} 50%, transparent)`,
        } : {}, onClick: onClick, disabled: disabled, "aria-disabled": disabled, type: type, name: name ? name : label ? `button-${label}` : 'button', form: form },
        btnIcon && (buttonStyle === 'icon' || buttonStyle === 'default') &&
            React.cloneElement(btnIcon, {
                htmlColor: iconColorStyle,
                strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
            }),
        (buttonStyle === 'text' || buttonStyle === 'default') && React.createElement(Typography, { variant: 'Body2' }, label ? label : (typeof children === 'string' && children))));
};
