import React, { FC } from 'react';
import classNames from 'classnames';
import { BreadcrumbsProps } from '../../types';
import styles from './Breadcrumbs.module.css';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className, separator = '/', children, testId = 'default' }) => {
  return (
    <nav data-test-id={`${testId}-breadcrumbs-block`}  className={classNames(styles.breadcrumbs, className)}>
      {React.Children.map(children, (child, index) => {
        const isReactElement = React.isValidElement(child);
        return (
          <React.Fragment key={index}>
            {/* {child} */}
             {isReactElement 
              ? React.cloneElement(child, {
                  // Передаем testId родителя внутрь ребенка, если у ребенка нет своего
                  testId: child.props.testId || testId 
                } as any)
              : child
            }
            {index < children.length - 1 && (
              <span data-test-id={`${testId}-breadcrumbs-separator`} className={styles.separator}>{separator}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};