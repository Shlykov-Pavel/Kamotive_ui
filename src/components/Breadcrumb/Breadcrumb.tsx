import React, { FC, MouseEvent } from 'react';

import styles from './Breadcrumb.module.css';
import classNames from 'classnames';
import { BreadcrumbProps } from '../../types';;
import { Typography } from '../Typography/Typography';

export const Breadcrumb: FC<BreadcrumbProps> = ({ onClick, active, label, icon, children }) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!active && onClick) {
      onClick();
    }
  };

  const childrenClassNames = classNames(active ? styles['children--active'] : styles['children--inactive'], styles.children);
  const iconClassNames = classNames(childrenClassNames, styles.icon)

  return (
    <button 
      className={classNames(styles.breadcrumb)} 
      onClick={handleClick}
    >
      {icon && <span className={iconClassNames}>{icon}</span>}
      <Typography variant="Body1-Medium" className={childrenClassNames} >
        {label || children}
      </Typography>
    </button>
  );
};