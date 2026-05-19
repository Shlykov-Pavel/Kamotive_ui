;
import React from 'react';
import styles from './Tabs.module.css';
export const Tabs = ({ value, onChange, children, style, className, testId = 'default' }) => {
    var _a;
    const selectedTabContent = (_a = children === null || children === void 0 ? void 0 : children.find((child) => child.props.value === value)) === null || _a === void 0 ? void 0 : _a.props.children;
    const handleTabChange = (newValue) => {
        if (onChange && newValue) {
            onChange(newValue);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { role: "tablist", className: styles.tabs + ' ' + (className || ''), style: style, "data-test-id": `${testId}-tablist` }, children === null || children === void 0 ? void 0 : children.map((child, index) => {
            const tabSlug = child.props.value
                ? String(child.props.value).toLowerCase().trim().replace(/\s+/g, '-')
                : `item-${index}`;
            return React.cloneElement(child, {
                key: index,
                selected: child.props.value === value,
                disabled: child.props.disabled,
                onClick: () => handleTabChange(child.props.value),
                testId: child.props.testId || `${testId}-tabs-${tabSlug}`
            });
        })),
        React.createElement("div", { role: "tabpanel", "aria-labelledby": value, "data-test-id": `${testId}-tabpanel` }, selectedTabContent)));
};
