import React, { FC, MouseEvent } from 'react';

import styles from './Breadcrumb.module.css';
import classNames from 'classnames';
import { BreadcrumbProps } from '../../types';;
import { Typography } from '../Typography/Typography';

export const Breadcrumb: FC<BreadcrumbProps> = ({ onClick, active, label, icon, children, testId = 'default'}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!active && onClick) {
      onClick();
    }
  };

  const childrenClassNames = classNames(active ? styles['children--active'] : styles['children--inactive'], styles.children);
  const iconClassNames = classNames(childrenClassNames, styles.icon)

  return (
    <button 
      data-test-id={`${testId}-breadcrumb-button`}
      className={classNames(styles.breadcrumb)} 
      onClick={handleClick}
    >
      {icon && <span data-test-id={`${testId}-breadcrumb-icon`} className={iconClassNames}>{icon}</span>}
      <Typography testId={`${testId}-breadcrumb`} variant="Body1-Medium" className={childrenClassNames} >
        {label || children}
      </Typography>
    </button>
  );
};