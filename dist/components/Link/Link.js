import React from 'react';
import classNames from 'classnames';
import styles from './Link.module.css';
import { Typography } from '../Typography/Typography';
import { ETypographyVariants } from '../Typography/enums';
import { Tooltip } from '../Tooltip/Tooltip';
export const Link = ({ href, children, title, className, style, underline = 'hover', variant = ETypographyVariants.Body1, color = 'var(--text-dark)', maxWidth, }) => {
    const stylesUnderline = underline === 'hover' && styles.linkHover;
    const stylesTooltipWidth = maxWidth ? { maxWidth: maxWidth } : {};
    const linkStyle = Object.assign(Object.assign({}, style), { color: color, textDecorationColor: color });
    const link = (React.createElement("a", { href: href, title: title, className: classNames(stylesUnderline, maxWidth && styles.tooltipStyle, className), style: Object.assign(Object.assign({}, linkStyle), stylesTooltipWidth) },
        React.createElement(Typography, { variant: variant, color: color }, children)));
    return maxWidth ? (React.createElement(Tooltip, { label: children, opacity: 0.4, displayDelay: 0, style: { maxWidth: '500px' } }, link)) : (link);
};
