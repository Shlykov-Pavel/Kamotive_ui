import React from 'react';
export const IconSpaceChange = ({ color = 'inherit', htmlColor, strokeWidth = '0.3', onClick, style }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, onClick: onClick, style: style },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth }, d: "M2.7,11L11.37,4.25L20.3,11.23L11.63,18L2.7,11M18.7,11.21L11.39,5.5L4.32,11L11.63,16.73L18.7,11.21M11.63,21L2.7,14L3.5,13.4L11.61,19.75L19.5,13.59L20.3,14.23L11.63,21Z" })));
};
