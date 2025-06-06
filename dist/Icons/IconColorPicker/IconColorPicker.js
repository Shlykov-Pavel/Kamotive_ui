import React from 'react';
export const IconColorPicker = ({ color = 'inherit', htmlColor, strokeWidth = '0.1', className, style }) => {
    return (React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: `${color} ${className}` },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth }, strokeLinejoin: "round", d: "M21.71 4.04l-1.75-1.75c-.39-.39-1.02-.39-1.41 0L16 4.84 19.16 8l2.55-2.55c.39-.39.39-1.02 0-1.41zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" })));
};
