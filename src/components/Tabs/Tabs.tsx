import { TabsProps } from 'kamotive_ui';
import React, { FC } from 'react';

import styles from './Tabs.module.css';

export const Tabs: FC<TabsProps> = ({ value, onChange, children }) => {
  const selectedTabContent = children?.find((child) => child.props.value === value)?.props.children;

  const handleTabChange = (newValue?: string) => {
    if (onChange && newValue) {
      onChange(newValue);
    }
  };

  return (
    <>
      <div role="tablist" className={styles['tabs']}>
        {children?.map((child, index) =>
          React.cloneElement(child, {
            key: index,
            selected: child.props.value === value,
            disabled: child.props.disabled,
            onClick: () => handleTabChange(child.props.value),
          })
        )}
      </div>
      <div role="tabpanel" aria-labelledby={value}>
        {selectedTabContent}
      </div>
    </>
  );
};
