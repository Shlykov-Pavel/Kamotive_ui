import React from 'react';
export const IconStrikethrough = ({ color = 'inherit', htmlColor, strokeWidth, onClick, style }) => {
    return (React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 13 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: color, onClick: onClick, style: style },
        React.createElement("path", { d: "M6.5 6.49991C6.42902 6.48382 6.35834 6.46646 6.288 6.44782C5.23133 6.16825 4.352 5.62558 3.78133 4.97346C3.19933 4.30815 2.938 3.52942 3.136 2.79686C3.52933 1.34623 5.578 0.627508 7.71133 1.19325C8.35354 1.36002 8.95966 1.64111 9.5 2.02275M2.78 10.3322C3.35133 10.9843 4.23067 11.5263 5.28733 11.8066C7.42067 12.3723 9.47 11.6549 9.86267 10.2036C10.018 9.63129 9.892 9.0306 9.55267 8.47804M1 6.49991H12", stroke: htmlColor || "#55534E", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: strokeWidth || '1' })));
};
export const IconStrikethroughToString = (color = 'inherit', htmlColor, strokeWidth, onClick, style) => {
    return `<svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="${color}"
    onclick="${onClick}"
    style="${style}"
  >
    <path
      d="M6.5 6.49991C6.42902 6.48382 6.35834 6.46646 6.288 6.44782C5.23133 6.16825 4.352 5.62558 3.78133 4.97346C3.19933 4.30815 2.938 3.52942 3.136 2.79686C3.52933 1.34623 5.578 0.627508 7.71133 1.19325C8.35354 1.36002 8.95966 1.64111 9.5 2.02275M2.78 10.3322C3.35133 10.9843 4.23067 11.5263 5.28733 11.8066C7.42067 12.3723 9.47 11.6549 9.86267 10.2036C10.018 9.63129 9.892 9.0306 9.55267 8.47804M1 6.49991H12"
      stroke="${htmlColor || "#55534E"}"
      strokeLinecap="round"
      stroke-linejoin="round"
      strokeWidth="${strokeWidth || '1'}"
    />
  </svg>`;
};
