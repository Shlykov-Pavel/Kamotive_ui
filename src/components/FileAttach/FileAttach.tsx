import React, { FC, useState } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';

import { FileAttachProps, TAttachments } from '../../types';
import styles from './FileAttach.module.css';
import { Typography } from '../Typography/Typography';
import { IconUpload } from '../../Icons';
import { FileItem } from '../FileItem/FileItem';
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
  },
  addedFiles,
  setAddedFiles,
  onDownload,
  onDelete,
  canAdd = true,
  canDelete = true,
  canDownload = true,
  position = 'bottom',
  className,
  style,
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
        canAdd={canAdd}
      />
      <FileListAttaсhed
        filesList={filesList}
        onDelete={onDelete}
        onDownload={onDownload}
        canDelete={canDelete}
        canDownload={canDownload}
      />
    </div>
  );
};
