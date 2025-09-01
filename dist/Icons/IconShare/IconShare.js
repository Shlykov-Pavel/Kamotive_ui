import React from 'react';
export const IconShare = ({ color = 'inherit', htmlColor, strokeWidth = 1, style }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, style: style },
        React.createElement("path", { stroke: htmlColor || 'currentColor', strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", d: "M16 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2m8-3l-4-4l-4 4m4 9V3" })));
};
