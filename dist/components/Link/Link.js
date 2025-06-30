import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Link.module.css';
import { Typography } from '../Typography/Typography';
import { ETypographyVariants } from '../Typography/enums';
import { Tooltip } from '../Tooltip/Tooltip';
export const Link = ({ href, onClick, children, title, className, style, underline = 'hover', variant = ETypographyVariants.Body1, color = 'var(--text-dark)', maxWidth, size, widthInPixels, }) => {
    const stylesUnderline = underline === 'hover' ? styles.linkHover : underline === 'none' ? styles.linkNone : '';
    const stylesTooltipWidth = maxWidth ? { maxWidth: maxWidth } : {};
    const textRef = useRef(null);
    const [measuredSize, setMeasuredSize] = useState(0);
    const linkStyle = Object.assign(Object.assign({}, style), { color: color, textDecorationColor: color });
    useLayoutEffect(() => {
        if (!size && textRef.current) {
            const textWidth = textRef.current.scrollWidth;
            setMeasuredSize(textWidth);
        }
    }, [children, size, variant]);
    const actualSize = size || measuredSize;
    const isTooltipVisible = useMemo(() => {
        if (!actualSize || !widthInPixels) {
            return false;
        }
        const shouldShow = actualSize > widthInPixels;
        return shouldShow;
    }, [actualSize, widthInPixels, size]);
    const linkContent = (React.createElement(Typography, { variant: variant, color: color }, children));
    const link = onClick ? (React.createElement("div", { onClick: onClick, className: classNames(styles.link, stylesUnderline, isTooltipVisible && styles.tooltipStyle, className), style: Object.assign(Object.assign({}, linkStyle), stylesTooltipWidth) },
        !size && (React.createElement("div", { ref: textRef, style: {
                position: 'absolute',
                visibility: 'hidden',
                height: 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
            } }, linkContent)),
        linkContent)) : (React.createElement("a", { href: href, title: title, className: classNames(styles.link, stylesUnderline, isTooltipVisible && styles.tooltipStyle, className), style: Object.assign(Object.assign({}, linkStyle), stylesTooltipWidth) },
        !size && (React.createElement("div", { ref: textRef, style: {
                position: 'absolute',
                visibility: 'hidden',
                height: 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
            } }, linkContent)),
        linkContent));
    return isTooltipVisible ? (React.createElement(Tooltip, { key: `${size}-${widthInPixels}`, label: children, opacity: 0.4, displayDelay: 0, style: { maxWidth: '500px' } }, link)) : (link);
};
