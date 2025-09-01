import React from 'react';
export const IconBold = ({ color = 'inherit', htmlColor, strokeWidth, onClick, style }) => {
    return (React.createElement("svg", { width: "10", height: "13", viewBox: "0 0 10 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, onClick: onClick, style: style },
        React.createElement("path", { d: "M5.57143 6.5C6.27867 6.5 6.95695 6.21027 7.45705 5.69454C7.95714 5.17882 8.2381 4.47935 8.2381 3.75C8.2381 3.02065 7.95714 2.32118 7.45705 1.80546C6.95695 1.28973 6.27867 1 5.57143 1H1V6.5M5.57143 6.5H1M5.57143 6.5H6.33333C7.04058 6.5 7.71886 6.78973 8.21895 7.30546C8.71905 7.82118 9 8.52065 9 9.25C9 9.97935 8.71905 10.6788 8.21895 11.1945C7.71886 11.7103 7.04058 12 6.33333 12H1V6.5", stroke: htmlColor || "#55534E", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: strokeWidth || '1' })));
};
export const IconBoldToString = (color = 'inherit', htmlColor, strokeWidth, onClick, style) => {
    return `<svg
    width="10"
    height="13"
    viewBox="0 0 10 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="${color}"
    onclick="${onClick}"
    style="${style}"
  >
    <path
      d="M5.57143 6.5C6.27867 6.5 6.95695 6.21027 7.45705 5.69454C7.95714 5.17882 8.2381 4.47935 8.2381 3.75C8.2381 3.02065 7.95714 2.32118 7.45705 1.80546C6.95695 1.28973 6.27867 1 5.57143 1H1V6.5M5.57143 6.5H1M5.57143 6.5H6.33333C7.04058 6.5 7.71886 6.78973 8.21895 7.30546C8.71905 7.82118 9 8.52065 9 9.25C9 9.97935 8.71905 10.6788 8.21895 11.1945C7.71886 11.7103 7.04058 12 6.33333 12H1V6.5"
      stroke="${htmlColor || "#55534E"}"
      strokeLinecap="round"
      stroke-linejoin="round"
      strokeWidth="${strokeWidth || '1'}"
    />
  </svg>`;
};
