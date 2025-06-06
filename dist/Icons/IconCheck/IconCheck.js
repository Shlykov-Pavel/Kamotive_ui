import React from 'react';
export const IconCheck = ({ color = 'inherit', htmlColor, strokeWidth, style }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, style: style },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth }, d: "M18.9,8.1L9,18L4.05,13.05L4.76,12.34L9,16.59L18.19,7.39L18.9,8.1Z" })));
};
