import React, { FC } from "react"

import classNames from "classnames"
import styles from './Link.module.css';
import { LinkProps } from "../../types"



export const Link: FC<LinkProps> = ({href, children, title, className, style, underline = 'underline'}) => {
    const stylesUnderline = (underline === 'hover') && styles.linkHover

    return(
        <a href={href} title={title} className={classNames(styles.link, stylesUnderline,  className)} style={style}>
            {children}
        </a>
    )
}