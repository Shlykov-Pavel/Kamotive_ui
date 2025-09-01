import React from 'react';
export const IconRedo = ({ color = 'inherit', htmlColor, strokeWidth, onClick, style }) => {
    return (React.createElement("svg", { width: "15", height: "9", viewBox: "0 0 15 9", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, onClick: onClick, style: style },
        React.createElement("path", { d: "M1.35059 8C1.35059 4.32927 4.38392 1.34146 8.11059 1.34146C10.3639 1.42683 12.6173 2.62195 13.9173 4.5M14.3506 1V4.41463C14.3506 4.67073 14.1773 4.84146 13.9173 4.84146H10.4506", stroke: htmlColor || "#55534E", strokeLinecap: "round", strokeWidth: strokeWidth || '1' })));
};
export const IconRedoToString = (color = 'inherit', htmlColor, strokeWidth, onClick, style) => {
    return `<svg
    width="15"
    height="9"
    viewBox="0 0 15 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="${color}"
    onclick="${onClick}"
    style="${style}"
  >
    <path
      d="M1.35059 8C1.35059 4.32927 4.38392 1.34146 8.11059 1.34146C10.3639 1.42683 12.6173 2.62195 13.9173 4.5M14.3506 1V4.41463C14.3506 4.67073 14.1773 4.84146 13.9173 4.84146H10.4506"
      stroke="${htmlColor || "#55534E"}"
      strokeLinecap="round"
      strokeWidth="${strokeWidth || '1'}"
    />
  </svg>`;
};
