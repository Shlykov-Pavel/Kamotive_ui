import React from 'react';
export const ChevronUp = ({ color = 'inherit', htmlColor, strokeWidth = '0.3', style }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, style: style },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth }, d: "M5.84,15.41L11.5,9.75L17.16,15.41L16.45,16.11L11.5,11.16L6.55,16.11L5.84,15.41Z" })));
};
