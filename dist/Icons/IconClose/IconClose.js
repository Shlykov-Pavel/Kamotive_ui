import React from 'react';
export const IconClose = ({ color = 'inherit', htmlColor, strokeWidth = '0.3', onClick, style }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, onClick: onClick, style: style },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth !== null && strokeWidth !== void 0 ? strokeWidth : '0.3 !important' }, d: "M17,7L12,12L7,7L6.3,7.7L11.3,12.7L6.3,17.7L7,18.4L12,13.4L17,18.4L17.7,17.7L12.7,12.7L17.7,7.7L17,7Z" })));
};
