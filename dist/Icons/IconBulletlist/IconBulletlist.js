import React from 'react';
export const IconBulletlist = ({ color = 'inherit', htmlColor, strokeWidth, onClick, style }) => {
    return (React.createElement("svg", { width: "16", height: "20", viewBox: "0 0 16 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, onClick: onClick, style: style },
        React.createElement("path", { d: "M1 3L2.5 1.5V5", fill: htmlColor || "#55534E" }),
        React.createElement("path", { d: "M6 3H15", stroke: htmlColor || "#55534E", strokeWidth: strokeWidth || "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
        React.createElement("path", { d: "M1 9.5C1 8.5 1.5 8 2.5 8C3.5 8 4 8.5 4 9.5C4 11 1 12 1 12H4", fill: htmlColor || "#55534E" }),
        React.createElement("path", { d: "M6 10H15", stroke: htmlColor || "#55534E", strokeWidth: strokeWidth || "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
        React.createElement("path", { d: "M1 15.5C1 15.5 1.5 14.5 2.5 14.5C3.5 14.5 4 15 4 15.5C4 16 3.5 16.5 2.5 16.5H1.5M1.5 16.5C2.5 16.5 4 16.5 4 18C4 19.5 3.5 19.5 2.5 19.5C1.5 19.5 1 19 1 19", fill: htmlColor || "#55534E" }),
        React.createElement("path", { d: "M6 17H15", stroke: htmlColor || "#55534E", strokeWidth: strokeWidth || "1.5", strokeLinecap: "round", strokeLinejoin: "round" })));
};
export const IconBulletlistToString = (color = 'inherit', htmlColor, strokeWidth, onClick, style) => {
    return `<svg
    width="16"
    height="14" 
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="${color}"
    style="${style}"
    onclick="${onClick}"
    style="${style}"
  >

    <path 
      d="M1 3L2.5 1.5V5" 
      stroke="${htmlColor || "#55534E"}" stroke-width="${strokeWidth || "1.25"}" stroke-linecap="round" stroke-linejoin="round"/>
    <path 
      d="M6 3H15" 
      stroke="${htmlColor || "#55534E"}" stroke-width="${strokeWidth || "1.25"}" stroke-linecap="round"/>
    
    <path 
      d="M1 9.5C1 8.5 1.5 8 2.5 8C3.5 8 4 8.5 4 9.5C4 11 1 12 1 12H4" 
      stroke="${htmlColor || "#55534E"}" strokeWidth="${strokeWidth || "1.25"}" stroke-linecap="round" stroke-linejoin="round"/>
    <path 
      d="M6 10H15" 
      stroke="${htmlColor || "#55534E"}" stroke-width="${strokeWidth || "1.25"}" stroke-linecap="round"/>
    
    <path 
      d="M1 15.5C1 15.5 1.5 14.5 2.5 14.5C3.5 14.5 4 15 4 15.5C4 16 3.5 16.5 2.5 16.5H1.5M1.5 16.5C2.5 16.5 4 16.5 4 18C4 19.5 3.5 19.5 2.5 19.5C1.5 19.5 1 19 1 19" 
      stroke="${htmlColor || "#55534E"}" stroke-width="${strokeWidth || "1.25"}" stroke-linecap="round" stroke-linejoin="round"/>
    <path 
      d="M6 17H15" 
      stroke="${htmlColor || "#55534E"}" stroke-width="${strokeWidth || "1.25"}" stroke-linecap="round"/>
  </svg>`;
};
