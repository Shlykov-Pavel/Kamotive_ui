import React, { useState } from 'react';
import { Tag } from '../Tag/Tag';
import ColorPicker from '../ColorPicker/ColorPicker';
import styles from './SettingTag.module.css';
export const SettingTag = ({ label, color, onChange }) => {
    const [isHovered, setIsHovered] = useState(false);
    const colorsOptions = ['red', 'orange', 'yellow', 'green', 'purple', 'indigo', 'blue', 'teal', 'pink'];
    return (React.createElement("div", { style: { display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center' } },
        React.createElement(Tag, { label: label, color: color }),
        !isHovered ? (React.createElement("div", { className: styles['circle'], onMouseEnter: () => setIsHovered(true), style: {
                width: 10,
                height: 10,
                backgroundColor: (color === null || color === void 0 ? void 0 : color.startsWith('#')) ? color : `var(--${color})`,
            } })) : (React.createElement(ColorPicker, { mainColor: color, onChange: onChange, recentColors: isHovered ? colorsOptions : [], setIsHovered: setIsHovered }))));
};
