import React from 'react';
export const IconError = ({ color = 'inherit', htmlColor, strokeWidth = '0.3', style }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, style: style },
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth }, d: "M12,3C16.75,3 21,7.25 21,12C21,16.75 16.75,21 12,21C7.25,21 3,16.75 3,12C3,7.25 7.25,3 12,3M12,4C7.81,4 4,7.81 4,12C4,16.19 7.81,20 12,20C16.19,20 20,16.19 20,12C20,7.81 16.19,4 12,4Z" }),
        React.createElement("path", { fill: htmlColor || 'currentColor', stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth }, d: "M15.5,8L12,11.5L8.5,8L7.8,8.7L11.3,12.2L7.8,15.7L8.5,16.4L12,12.9L15.5,16.4L16.2,15.7L12.7,12.2L16.2,8.7L15.5,8Z" })));
};
