import React, { FC } from 'react';

import { FileItemProps } from '../../types';
import styles from './FileItem.module.css';

import { Typography } from '../Typography/Typography';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { IconButton } from '../IconButton/IconButton';
import { IconClose10, IconDownload, IconFile } from '../../Icons';

export const FileItem: FC<FileItemProps> = ({ name, size = 0, loading = false, error = '', onDownload , onDelete}) => {
  return (
    <div className={`${styles['fileItem']} ${error ? styles['error'] : ''}`}>
      <div className={styles['fileItemFile']}>
        <div className={styles['fileItemInfo']}>
          <div className={styles['fileItemIcon']}>
            <IconFile htmlColor={'var(--icons-grey)'} />
          </div>
          <div className={styles['fileItemName']}>
            <Typography variant="Body1-Medium" color="var(--text-dark)">
              {name}
            </Typography>
            {size !== 0 && (
              <Typography variant="Caption" color="var(--grey-medium)">
                {`${(size / 1024).toFixed(1)} кБ`}
              </Typography>
            )}
          </div>
        </div>
        {onDownload && (
          <IconButton icon={<IconDownload/>} onClick={onDownload} color='var(--icons-grey)' className={styles['fileIcon']}/>
        )}
        {onDelete && (
          <IconButton icon={<IconClose10 />} onClick={onDelete} color='var(--icons-grey)' />
        )}
      </div>

      {loading && <ProgressBar animated size="sm" value={100} />}
      {error && (
        <Typography variant="Caption" color="var(--error-main)">
          {error}
        </Typography>
      )}
    </div>
  );
};
