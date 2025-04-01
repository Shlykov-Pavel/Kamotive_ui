import React from 'react';
import classNames from 'classnames';
import styles from './Breadcrumbs.module.css';
export const Breadcrumbs = ({ className, separator = '/', children }) => {
    return (React.createElement("nav", { className: classNames(styles.breadcrumbs, className) }, React.Children.map(children, (child, index) => {
        return (React.createElement(React.Fragment, { key: index },
            child,
            index < children.length - 1 && (React.createElement("span", { className: styles.separator }, separator))));
    })));
};
