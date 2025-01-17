import { TabPanelProps } from 'kamotive_ui';
import React, { FC } from 'react';

import styles from './Tabs.module.css';
import classNames from 'classnames';

export const TabPanel: FC<TabPanelProps> = ({ value, selected, children }) => {

  return (
    <div role="tabpanel" >
      {selected ? children : null}
    </div>
  );
};
