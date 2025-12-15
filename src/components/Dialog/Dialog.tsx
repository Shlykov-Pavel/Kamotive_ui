import React, { FC } from 'react';

import styles from './Dialog.module.css';
import { DialogProps } from '../../types';
import classNames from 'classnames';
import { Spinner } from '../Spinner/Spinner';
import { IconButton } from '../IconButton/IconButton';
import { IconClose } from '../../Icons/IconClose/IconClose';

export const Dialog: FC<DialogProps> = ({ open, onClose, maxWidth = 'md', children, style, className, overlay = true, fullWidth = false, isLoading = false }) => {
  const isMaxWidthInPx = typeof maxWidth === 'string' && !isNaN(Number(maxWidth.replace('px', '')));

  return (
    <>
      {open && overlay && <div className={styles.dialogOverlay} />}
      <dialog
        open={open}
        className={classNames(styles['dialog'], !isMaxWidthInPx && styles[`maxWidth--${maxWidth}`], isLoading && styles['dialogLoading'], className)}
        style={{ ...style, maxWidth: isMaxWidthInPx ? maxWidth : '', width: fullWidth ? '100%' : ''}}
      >
        {onClose && (
        <div className={styles.closeButtonWrapper}>
            <IconButton 
                onClick={onClose} 
                icon={<IconClose />} 
                color="var(--icons-grey)" 
                size="lg" 
            />
        </div>
    )}
        {isLoading && <div className={styles['loader']}><Spinner/></div>}
        <div className={styles['content']}>{children}</div>
      </dialog>
    </>
  );
};
