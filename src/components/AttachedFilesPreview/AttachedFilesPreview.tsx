import React, { CSSProperties} from 'react';
import {  IconFile } from '../../Icons';
import styles from './AttachedFilesPreview.module.css';
import { FileItem } from '../..';
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
  lng: string;
  onDelete?: (id: string) => void;
  onDownload?: (file: TAttachments) => void;
  style?: CSSProperties;
  className?: string;
  isEdit?: boolean;
  allowDownload?: boolean;
  error?: string;
}

export const AttachedFilesPreview: React.FC<AttachedFilesProps> = ({
  files,
  onDelete,
  onDownload,
  style,
  className,
  isEdit,
  allowDownload = true,
  lng,
  error = '',
}) => {

  return (
    <div className={className} style={style} title="">
      {files.map((file, index) => (
        <FileItem
          key={`${index + (file.filename ?? '')}`}
          file={file}
          error={file.hasError ? error : ''} 
          canDelete={isEdit ?? false}
          canDownload={!isEdit}
          onDelete={(id:string)=>isEdit && onDelete?.(id)}
          onDownload={(file: TAttachments)=> allowDownload && onDownload?.(file)}
          style={{
            border:'none',
            padding:'5px 0px',
            borderRadius:'5px'
          }}
          lng={lng}
        />
      ))}
    </div>
  );

};
