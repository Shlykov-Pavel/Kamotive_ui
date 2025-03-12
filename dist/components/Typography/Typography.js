var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
;
import classNames from 'classnames';
;
import { ETypographyVariants } from './enums';
import styles from './Typography.module.css';
/**
 * Компонент Typography для стилизованного отображения текста.
 */
export const Typography = (_a) => {
    var { variant = ETypographyVariants.Body1, children, className, color, style } = _a, props = __rest(_a, ["variant", "children", "className", "color", "style"]);
    const variantClass = classNames(styles[`typography--variant-${variant}`], className);
    const combinedStyle = Object.assign({ color }, style);
    return (React.createElement("span", Object.assign({ className: variantClass, style: combinedStyle }, props), children));
};
