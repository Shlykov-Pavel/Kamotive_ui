import React, { FC } from 'react';

import { TagProps } from 'kamotive_ui';
import styles from './Tag.module.css';
import classNames from 'classnames';

export const Tag: FC<TagProps> = ({ label, color = 'red', closeButton = 'false', onClick }) => {
  return (
    <span className={classNames(styles.tag, styles[color])}>
      {label}
      {closeButton && (
        <button
          type="button"
          aria-label="Закрыть"
          style={{ '--close-color': `var(--${color})` } as React.CSSProperties}
          onClick={onClick}
        />
      )}
    </span>
  );
};