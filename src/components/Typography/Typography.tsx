import React, { CSSProperties, FC } from "react";

import styles from './Typography.module.css';
import classNames from "classnames";
import { TypographyProps } from "kamotive_ui";
import { ETypographyVariants } from "./enums";


export const Typography:FC<TypographyProps> = ({
  variant = ETypographyVariants.Body1,
  children,
  className,
  color,
  style,
  ...props
})=>{

  const variantClass = classNames(
    styles[`typography--variant-${variant}`],
    className
  )

  const combinedStyle: CSSProperties = {
    color,
    ...style,
  };

  return (
    <span className={`${variantClass} ${className}`} style={combinedStyle} {...props}>
      {children}
    </span>
  )
}
