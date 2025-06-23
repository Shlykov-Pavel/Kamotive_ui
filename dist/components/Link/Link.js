import React from 'react';
import classNames from 'classnames';
import styles from './Link.module.css';
export const Link = ({ href, children, title, className, style, underline = 'hover' }) => {
    const stylesUnderline = underline === 'hover' && styles.linkHover;
    return (React.createElement("a", { href: href, title: title, className: classNames(styles.link, stylesUnderline, className), style: style }, children));
};
