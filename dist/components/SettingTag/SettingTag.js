import React, { useState } from 'react';
import { Tag } from '../Tag/Tag';
import ColorPicker from '../ColorPicker/ColorPicker';
import styles from './SettingTag.module.css';
export const SettingTag = ({ label, color, onChange, testId = 'default' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentColor, setCurrentColor] = useState(color);
    const colorsOptions = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'];
    return (React.createElement("div", { style: { display: 'flex', gap: `${isHovered ? '5px' : '10px'}`, flexDirection: 'row', alignItems: 'center' }, "data-test-id": `${testId}-settingtag` },
        React.createElement(Tag, { label: label, color: currentColor, editable: true, onChange: onChange, testId: `${testId}-settingtag` }),
        !isHovered ? (React.createElement("div", { className: styles.circle, onMouseEnter: () => setIsHovered(true), style: {
                width: 10,
                height: 10,
                backgroundColor: (currentColor === null || currentColor === void 0 ? void 0 : currentColor.startsWith('#')) ? currentColor : `var(--${currentColor})`,
            }, "data-test-id": `${testId}-settingtag-color` })) : (React.createElement(ColorPicker, { mainColor: currentColor, recentColors: isHovered ? colorsOptions : [], setIsHovered: setIsHovered, onChange: onChange, onColorChange: setCurrentColor, testId: `${testId}-settingtag` }))));
};
