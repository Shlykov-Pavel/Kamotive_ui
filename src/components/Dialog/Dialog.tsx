import React, { FC } from 'react';

import styles from './Dialog.module.css';
import { DialogProps } from '../../types';
import classNames from 'classnames';

export const Dialog: FC<DialogProps> = ({ open, maxWidth = 'md', children, style, className, overlay = true, fullWidth = false }) => {
  const isMaxWidthInPx = typeof maxWidth === 'string' && !isNaN(Number(maxWidth.replace('px', '')));

  return (
    <>
      {open && overlay && <div className={styles.dialogOverlay} />}
      <dialog
        open={open}
        className={classNames(styles['dialog'], !isMaxWidthInPx && styles[`maxWidth--${maxWidth}`], className)}
        style={{ ...style, maxWidth: isMaxWidthInPx ? maxWidth : '', width: fullWidth ? '100%' : ''}}
      >
        <div className={styles['content']}>{children}</div>
      </dialog>
    </>
  );
};
