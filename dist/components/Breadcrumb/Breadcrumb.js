import React from 'react';
import styles from './Breadcrumb.module.css';
import classNames from 'classnames';
;
import { Typography } from '../Typography/Typography';
export const Breadcrumb = ({ onClick, active, label, icon, children }) => {
    const handleClick = (e) => {
        if (!active && onClick) {
            onClick();
        }
    };
    const childrenClassNames = classNames(active ? styles['children--active'] : styles['children--inactive'], styles.children);
    const iconClassNames = classNames(childrenClassNames, styles.icon);
    return (React.createElement("button", { className: classNames(styles.breadcrumb), onClick: handleClick },
        icon && React.createElement("span", { className: iconClassNames }, icon),
        React.createElement(Typography, { variant: "Body2-Medium", style: { fontWeight: '500' }, className: childrenClassNames }, label || children)));
};
