import React, { FC } from 'react';
import classNames from 'classnames';
import { BreadcrumbsProps } from '../../types';
import styles from './Breadcrumbs.module.css';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className, separator = '/', children }) => {
  return (
    <nav className={classNames(styles.breadcrumbs, className)}>
      {React.Children.map(children, (child, index) => {
        return (
          <React.Fragment key={index}>
            {child}
            {index < children.length - 1 && (
              <span className={styles.separator}>{separator}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};