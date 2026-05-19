import React, { FC, forwardRef } from 'react';

import { FileAttachProps, FileLoaderHandle } from '../../types';
import styles from './FileAttach.module.css';
import classNames from 'classnames';
import { FileLoader } from '../FileLoader/FileLoader';
import { FileListAttaсhed } from '../FileListAttached/FileListAttaсhed';

export const FileAttach = forwardRef<FileLoaderHandle, FileAttachProps> (({
  filesList = [],
  maxFileSize = 2,
  maxFileCount = 10,
  maxFileName = 0,
  acceptedFormats = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
    'model/gltf-binary': ['.glb'],
    'application/octet-stream': ['.prt', '.step', '.stp'],
    'text/plain': ['.syslog'],
  },
  rejectedFormats,
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
  testId = 'default'
}, ref) => {
  const fileAttachClasses = classNames(styles['fileAttach'], className, {
    [styles[`fileAttach_position_${position}`]]: position,
  });

  return (
    <div className={fileAttachClasses} style={style} data-test-id={`${testId}-fileAttach-block`}>
      <FileLoader
        ref={ref}
        maxFileSize={maxFileSize}
        maxFileCount={maxFileCount}
        maxFileName={maxFileName}
        acceptedFormats={acceptedFormats}
        rejectedFormats={rejectedFormats}
        addedFiles={addedFiles}
        setAddedFiles={setAddedFiles}
        canAdd={canAdd}
        lng={lng}
        fileValidator={fileValidator}
        testId={`${testId}-fileAttach`}
       
      />
      <FileListAttaсhed
        filesList={filesList}
        onDelete={onDelete}
        onDownload={onDownload}
        canDelete={canDelete}
        canDownload={canDownload}
        lng={lng}
        testId={`${testId}-fileAttach`}
      />
    </div>
  );
});
