import React from 'react';
export const IconDownload = ({ color = 'inherit', htmlColor, strokeWidth, onClick, }) => {
    return (React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, onClick: onClick },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', strokeWidth: strokeWidth || '0', d: "M12,4V16.25L17.25,11L18,11.66L11.5,18.16L5,11.66L5.75,11L11,16.25V4H12M3,19H4V21H19V19H20V22H3V19Z" })));
};
