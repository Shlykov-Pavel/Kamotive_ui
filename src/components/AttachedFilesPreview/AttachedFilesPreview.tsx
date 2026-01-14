import React, { CSSProperties} from 'react';
import {  IconFile } from '../../Icons';
import styles from './AttachedFilesPreview.module.css';
import { FileItem, Typography } from '../..';
import { TAttachments } from '../../types';

export interface FilePreview {
  file: File;
  id: string;
  preview?: string;
  lng: string;
}

export const getFileIcon = (file: TAttachments) => {
  return <IconFile htmlColor={'var(--text-btn-light)'} color={'var(--text-btn-light)'}/>;
};

// Функция для форматирования размера файла
export const formatFileSize = (bytes?: number, lng?:string): string => {
  if (!bytes || bytes === 0) {
    return lng === 'ru' || lng?.includes('ru') ? '0 Байт' : '0 Bytes';
  }

  const k = 1024;
  const sizesEn = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const sizesRu = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizes = lng === 'ru' || lng?.includes('ru') ? sizesRu : sizesEn;

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface AttachedFilesProps {
  files: TAttachments[];
  onDownload?: (file: TAttachments) => void;
  allowDelete?: boolean;
  onDelete?: (id: string) => void;
  style?: CSSProperties;
  className?: string;
  maxFileCount?: number;
  lng: string;
}

export const AttachedFilesPreview: React.FC<AttachedFilesProps> = ({
  files,
  onDownload,
  allowDelete = false,
  onDelete,
  style,
  className,
  maxFileCount = 5,
  lng,
}) => {

  return (
    <div className={className} style={style} title="">
      {files.map((file, index) => (
        <FileItem
          key={`${index + (file.filename ?? '')}`}
          file={file}
          error={file.error} 
          canDelete={allowDelete}
          canDownload={Boolean(onDownload)}
          onDelete={(id:string)=> allowDelete && onDelete?.(id)}
          onDownload={(file: TAttachments)=> onDownload?.(file)}
          style={{
            border:!file.error ? 'none' : undefined,
            padding:!file.error ? '5px 5px' : '5px 5px',
            borderRadius:'5px'
          }}
          isRejectedFile={file.error}
          isComment={true}
          lng={lng}
        />
      ))}
       {files.length > maxFileCount && (
            <Typography variant="Caption" color="var(--error-main)">
          {(lng === 'ru' || lng.includes('ru')) ? `Максимальное количество файлов ${maxFileCount}` : `Maximum number of files ${maxFileCount}`}
        </Typography>
        )}
    </div>
  );

};
