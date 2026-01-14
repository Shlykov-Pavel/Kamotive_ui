import React from 'react';
export const IconFileDefault = ({ color = 'inherit', htmlColor, strokeWidth = '0.3', style, text }) => {
    return (React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 22 22", fill: "none" },
        React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", fill: htmlColor || "#6b7280" }),
        React.createElement("polyline", { points: "14,2 14,8 20,8", fill: htmlColor || "#6b7280" }),
        text ? (React.createElement("text", { x: "12", y: "16", textAnchor: "middle", fill: "white", fontSize: "5", fontWeight: "bold" }, "ZIP")) : (React.createElement("path", { d: "M16 13H8M16 17H8M10 9H8", stroke: "white", strokeWidth: "1" }))));
};
