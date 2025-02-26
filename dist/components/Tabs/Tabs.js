import React from 'react';
import styles from './Tabs.module.css';
export const Tabs = ({ value, onChange, children }) => {
    var _a;
    const selectedTabContent = (_a = children === null || children === void 0 ? void 0 : children.find((child) => child.props.value === value)) === null || _a === void 0 ? void 0 : _a.props.children;
    const handleTabChange = (newValue) => {
        if (onChange && newValue) {
            onChange(newValue);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { role: "tablist", className: styles['tabs'] }, children === null || children === void 0 ? void 0 : children.map((child, index) => React.cloneElement(child, {
            key: index,
            selected: child.props.value === value,
            disabled: child.props.disabled,
            onClick: () => handleTabChange(child.props.value),
        }))),
        React.createElement("div", { role: "tabpanel", "aria-labelledby": value }, selectedTabContent)));
};
