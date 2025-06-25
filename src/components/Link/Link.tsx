import React, { FC } from 'react';

import classNames from 'classnames';
import styles from './Link.module.css';
import { LinkProps } from '../../types';
import { Typography } from '../Typography/Typography';
import { ETypographyVariants } from '../Typography/enums';
import { Tooltip } from '../Tooltip/Tooltip';

export const Link: FC<LinkProps> = ({
  href,
  children,
  title,
  className,
  style,
  underline = 'hover',
  variant = ETypographyVariants.Body1,
  color = 'var(--text-dark)',
  maxWidth,
}) => {
  const stylesUnderline = underline === 'hover' && styles.linkHover;
  const stylesTooltipWidth = maxWidth ? { maxWidth: maxWidth } : {};

  const linkStyle = {
    ...style,
    color: color,
    textDecorationColor: color,
  };

  const link = (
    <a
      href={href}
      title={title}
      className={classNames(stylesUnderline, maxWidth && styles.tooltipStyle, className)}
      style={{ ...linkStyle, ...stylesTooltipWidth }}
    >
      <Typography variant={variant} color={color}>
        {children}
      </Typography>
    </a>
  );

  return maxWidth ? (
    <Tooltip label={children as string} opacity={0.4} displayDelay={0} style={{ maxWidth: '500px' }}>
      {link}
    </Tooltip>
  ) : (
    link
  );
};
