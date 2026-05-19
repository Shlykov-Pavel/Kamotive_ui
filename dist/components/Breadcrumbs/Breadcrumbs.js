import React from 'react';
import classNames from 'classnames';
import styles from './Breadcrumbs.module.css';
export const Breadcrumbs = ({ className, separator = '/', children, testId = 'default' }) => {
    return (React.createElement("nav", { "data-test-id": `${testId}-breadcrumbs-block`, className: classNames(styles.breadcrumbs, className) }, React.Children.map(children, (child, index) => {
        const isReactElement = React.isValidElement(child);
        return (React.createElement(React.Fragment, { key: index },
            isReactElement
                ? React.cloneElement(child, {
                    // Передаем testId родителя внутрь ребенка, если у ребенка нет своего
                    testId: child.props.testId || testId
                })
                : child,
            index < children.length - 1 && (React.createElement("span", { "data-test-id": `${testId}-breadcrumbs-separator`, className: styles.separator }, separator))));
    })));
};
