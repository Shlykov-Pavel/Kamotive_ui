import React from 'react';
export const IconAdd = ({ color = 'inherit', htmlColor, strokeWidth, }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', strokeWidth: strokeWidth || '0', d: "M5,13V12H11V6H12V12H18V13H12V19H11V13H5Z" })));
};
