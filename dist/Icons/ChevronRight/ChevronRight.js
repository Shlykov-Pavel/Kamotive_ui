import React from 'react';
export const ChevronRight = ({ color = 'inherit', htmlColor, strokeWidth = '0.3', style }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, style: style },
        React.createElement("g", { transform: "translate(6, 6) scale(0.75)" },
            React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', strokeWidth: `${strokeWidth} !important`, d: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" }))));
};
