import React from 'react';
export const IconWarning10 = ({ color = 'inherit', htmlColor, strokeWidth, }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', strokeWidth: strokeWidth || '0', strokeLinejoin: "round", d: "M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" })));
};
