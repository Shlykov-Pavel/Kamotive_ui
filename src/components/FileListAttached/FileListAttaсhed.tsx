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
  className,
  style,
}) => {
  if (!filesList || filesList.length === 0) {
    return (
      <Typography variant="Body2-SemiBold" color="var(--grey-medium)" style={{ marginTop: '5px' }}>
        Нет прикрепленных файлов
      </Typography>
    );
  }
  return (
    <div className={classNames(styles['fileList'], className)} style={style}>
      {isInfoShown && (
        <Typography variant="Body2-SemiBold" color="var(--text-dark)" style={{ lineHeight: '20px' }}>
          {`Прикрепленные файлы (${filesList.length})`}
        </Typography>
      )}
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
  );
};
