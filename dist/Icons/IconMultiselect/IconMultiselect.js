import React from 'react';
export const IconMultiselect = ({ color = 'inherit', htmlColor, strokeWidth, checkedStrokeWidth, style, checked = false }) => {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, style: style },
        React.createElement("rect", { x: "5.5", y: "2.5", width: "12", height: "12", rx: "3", stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth || '1.5' } }),
        React.createElement("rect", { x: "2.5", y: "5.5", width: "12", height: "12", rx: "3", fill: "white", stroke: htmlColor || 'currentColor', style: { strokeWidth: strokeWidth || '1.5' } }),
        checked && React.createElement("path", { d: "M4.5 11.5L7.5 15.5C7.93 16.08 8.82 16.03 9.18 15.4L14 7.5", stroke: htmlColor || 'currentColor', style: { strokeWidth: checkedStrokeWidth || '2' }, strokeLinecap: "round" })));
};
