import React from 'react';
export const IconInfo = ({ color = 'inherit', htmlColor, strokeWidth = '0.3', style }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, style: style },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth }, d: "M11.5,3C16.75,3 21,7.25 21,12.5C21,17.75 16.75,22 11.5,22C6.25,22 2,17.75 2,12.5C2,7.25 6.25,3 11.5,3M11.5,4C6.81,4 3,7.81 3,12.5C3,17.19 6.81,21 11.5,21C16.19,21 20,17.19 20,12.5C20,7.81 16.19,4 11.5,4M11,17V15H12V17H11M11,13V8H12V13H11Z" })));
};
