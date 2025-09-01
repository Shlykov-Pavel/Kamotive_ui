import React from 'react';
export const IconHeader2 = ({ color = 'inherit', htmlColor, strokeWidth, onClick, style }) => {
    return (React.createElement("svg", { width: "12", height: "13", viewBox: "0 0 12 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, onClick: onClick, style: style },
        React.createElement("path", { d: "M1 1H11M6 1V12", stroke: htmlColor || "#55534E", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: strokeWidth || '1' })));
};
export const IconHeader2ToString = (color = 'inherit', htmlColor, strokeWidth, onClick, style) => {
    return `<svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="${color}"
    onclick="${onClick}"
    style="${style}"
  >
    <path
      d="M1 1H11M6 1V12"
      stroke="${htmlColor || "#55534E"}"
      strokeLinecap="round"
      stroke-linejoin="round"
      strokeWidth="${strokeWidth || '1'}"
    />
  </svg>`;
};
