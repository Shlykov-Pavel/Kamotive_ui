import React, { FC } from 'react';

import styles from './Dialog.module.css';
import { DialogProps } from '../../types';
import classNames from 'classnames';
import { Spinner } from '../Spinner/Spinner';
import { IconButton } from '../IconButton/IconButton';
import { IconClose } from '../../Icons/IconClose/IconClose';

export const Dialog: FC<DialogProps> = ({ open, onClose, maxWidth = 'md', children, style, className, overlay = true, fullWidth = false, isLoading = false, testId='default'}) => {
  const isMaxWidthInPx = typeof maxWidth === 'string' && !isNaN(Number(maxWidth.replace('px', '')));

  return (
    <>
      {open && overlay && <div className={styles.dialogOverlay} />}
      <dialog
        open={open}
        className={classNames(styles['dialog'], !isMaxWidthInPx && styles[`maxWidth--${maxWidth}`], isLoading && styles['dialogLoading'], className)}
        style={{ ...style, maxWidth: isMaxWidthInPx ? maxWidth : '', width: fullWidth ? '100%' : ''}}
        data-test-id={`${testId}-modal`}
      >
        {onClose && (
        <div className={styles.closeButtonWrapper}>
            <IconButton 
                onClick={onClose} 
                icon={<IconClose />} 
                color="var(--icons-grey)" 
                size="lg" 
                data-test-id={`${testId}-modal-close-button`}
            />
        </div>
    )}
        {isLoading && <div className={styles['loader']} data-test-id={`${testId}-modal-spinner`}><Spinner/></div>}
        <div className={styles['content']} data-test-id={`${testId}-modal-content`}>{children}</div>
      </dialog>
    </>
  );
};
