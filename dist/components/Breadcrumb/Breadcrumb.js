import React from 'react';
import styles from './Breadcrumb.module.css';
import classNames from 'classnames';
;
import { Typography } from '../Typography/Typography';
export const Breadcrumb = ({ onClick, active, label, icon, children, testId = 'default' }) => {
    const handleClick = (e) => {
        if (!active && onClick) {
            onClick();
        }
    };
    const childrenClassNames = classNames(active ? styles['children--active'] : styles['children--inactive'], styles.children);
    const iconClassNames = classNames(childrenClassNames, styles.icon);
    return (React.createElement("button", { "data-test-id": `${testId}-breadcrumb-button`, className: classNames(styles.breadcrumb), onClick: handleClick },
        icon && React.createElement("span", { "data-test-id": `${testId}-breadcrumb-icon`, className: iconClassNames }, icon),
        React.createElement(Typography, { testId: `${testId}-breadcrumb`, variant: "Body1-Medium", className: childrenClassNames }, label || children)));
};
