import { TabsProps } from '../../types';;
import React, { FC } from 'react';

import styles from './Tabs.module.css';

export const Tabs: FC<TabsProps> = ({ value, onChange, children, style, className, testId = 'default' }) => {
  const selectedTabContent = children?.find((child) => child.props.value === value)?.props.children;

  const handleTabChange = (newValue?: string) => {
    if (onChange && newValue) {
      onChange(newValue);
    }
  };

  return (
    <>
      <div role="tablist" className={styles.tabs + ' ' + (className || '')} style={style} data-test-id={`${testId}-tablist`}>
        {children?.map((child, index) => {
          const tabSlug = child.props.value 
            ? String(child.props.value).toLowerCase().trim().replace(/\s+/g, '-') 
            : `item-${index}`;
          return React.cloneElement(child, {
            key: index,
            selected: child.props.value === value,
            disabled: child.props.disabled,
            onClick: () => handleTabChange(child.props.value),
            testId: child.props.testId || `${testId}-tabs-${tabSlug}`
          })
        }
          
        )}
      </div>
      <div role="tabpanel" aria-labelledby={value} data-test-id={`${testId}-tabpanel`}>
        {selectedTabContent}
      </div>
    </>
  );
};
