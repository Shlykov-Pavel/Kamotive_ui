import React, { FC } from 'react';

import { FileAttachProps } from '../../types';
import styles from './FileAttach.module.css';
import classNames from 'classnames';
import { FileLoader } from '../FileLoader/FileLoader';
import { FileListAttaсhed } from '../FileListAttached/FileListAttaсhed';

export const FileAttach: FC<FileAttachProps> = ({
  filesList = [],
  maxFileSize = 2,
  maxFileCount = 10,
  acceptedFormats = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
    'model/gltf-binary': ['.glb'],
    'application/octet-stream': ['.prt', '.step', '.stp'],
    'text/plain': ['.syslog'],
  },
  addedFiles,
  setAddedFiles,
  onDownload,
  onDelete,
  canAdd = true,
  canDelete = true,
  canDownload = true,
  position = 'bottom',
  lng = 'ru',
  className,
  style,
  fileValidator,
}) => {
  const fileAttachClasses = classNames(styles['fileAttach'], className, {
    [styles[`fileAttach_position_${position}`]]: position,
  });

  return (
    <div className={fileAttachClasses} style={style}>
      <FileLoader
        maxFileSize={maxFileSize}
        maxFileCount={maxFileCount}
        acceptedFormats={acceptedFormats}
        addedFiles={addedFiles}
        setAddedFiles={setAddedFiles}
        filesList={filesList}
        canAdd={canAdd}
        lng={lng}
        fileValidator={fileValidator}

      />
      <FileListAttaсhed
        filesList={filesList}
        onDelete={onDelete}
        onDownload={onDownload}
        canDelete={canDelete}
        canDownload={canDownload}
        lng={lng}
      />
    </div>
  );
};
