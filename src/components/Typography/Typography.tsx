import React, { CSSProperties, FC } from 'react';;
import classNames from 'classnames';
import { TypographyProps } from 'kamotive_ui';
import { ETypographyVariants } from './enums';
import './Typography.css';
/**
 * Компонент Typography для стилизованного отображения текста.
 */

export const Typography: FC<TypographyProps> = ({
  variant = ETypographyVariants.Body1,
  children,
  className,
  color,
  style,
  ...props
}: TypographyProps): JSX.Element => {
  const variantClass = classNames([`typography--variant-${variant}`], className);

  const combinedStyle: CSSProperties = {
    color,
    ...style,
  };

  return (
    <span className={`${variantClass} ${className}`} style={combinedStyle} {...props}>
      {children}
    </span>
  );
};
