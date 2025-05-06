import React, { FC } from 'react';

import { FileListAttaсhedProps } from '../../types';
import styles from './FileListAttached.module.css';
import { Typography } from '../Typography/Typography';
import { FileItem } from '../FileItem/FileItem';
import classNames from 'classnames';

export const FileListAttaсhed: FC<FileListAttaсhedProps> = ({
  filesList,
  onDelete,
  onDownload,
  canDelete,
  canDownload,
  isInfoShown = true,
  lng = 'ru',
  className,
  style,
}) => {
  if (!filesList || filesList.length === 0) {
    return lng === 'ru' || lng.includes('ru') ? (
      <Typography variant="Body2-SemiBold" color="var(--grey-medium)" style={{ marginTop: '5px' }}>
        Нет прикрепленных файлов
      </Typography>
    ) : (
      <Typography variant="Body2-SemiBold" color="var(--grey-medium)" style={{ marginTop: '5px' }}>
        No attached files
      </Typography>
    );
  }
  return (
    <div className={classNames(styles['fileList'], className)} style={style}>
      {isInfoShown &&
        (lng === 'ru' || lng.includes('ru') ? (
          <Typography
            variant="Body2-SemiBold"
            color="var(--text-dark)"
            style={{ lineHeight: '20px' }}
            className={styles['fileListHeader']}
          >
            {`Прикрепленные файлы (${filesList.length})`}
          </Typography>
        ) : (
          <Typography
            variant="Body2-SemiBold"
            color="var(--text-dark)"
            style={{ lineHeight: '20px' }}
            className={styles['fileListHeader']}
          >
            {`Attached files (${filesList.length})`}
          </Typography>
        ))}
      <div className={styles['fileListFiles']}>
        {filesList.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onDownload={onDownload}
            onDelete={onDelete}
            canDelete={canDelete}
            canDownload={canDownload}
          />
        ))}
      </div>
    </div>
  );
};
