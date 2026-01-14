import React, { CSSProperties, FC } from 'react';
export declare const IconSubmit: FC<{
    width?: string | number;
    height?: string | number;
    color?: string;
    htmlColor?: string;
    strokeWidth?: string;
    onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
    style?: CSSProperties;
}>;
export declare const IconSubmitToString: (color?: string, htmlColor?: string, strokeWidth?: string, onClick?: (event: React.MouseEvent<SVGSVGElement>) => void, style?: CSSProperties) => string;
