import React, { CSSProperties } from 'react';
import { IconFileDefault, IconFileVideo, IconFileAudio } from '../../Icons';
import styles from './AttachedFilesPreview.module.css';

export interface FilePreview {
  file: File;
  id: string;
  preview?: string;
  lng: string;
}

export const getFileIcon = (file: File) => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return <IconFileDefault htmlColor="#dc2626" text="PDF" />;
  }

  if (fileType.includes('word') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
    return <IconFileDefault htmlColor="#2563eb" text="DOC" />;
  }

  if (fileType.includes('sheet') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
    return <IconFileDefault htmlColor="#16a34a" text="XLS" />;
  }

  if (fileType.includes('presentation') || fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
    return <IconFileDefault htmlColor="#ea580c" text="PPT" />;
  }

  if (fileType.includes('text') || fileName.endsWith('.txt')) {
    return <IconFileDefault htmlColor="#6b7280" text="TXT" />;
  }

  if (fileType.includes('zip') || fileType.includes('rar') || fileName.endsWith('.zip') || fileName.endsWith('.rar')) {
    return <IconFileDefault htmlColor="#7c3aed" text="ZIP" />;
  }

  if (fileType.includes('video')) {
    return <IconFileVideo />;
  }

  if (fileType.includes('audio')) {
    return <IconFileAudio />;
  }

  return <IconFileDefault />;
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
  files: FilePreview[];
  onDelete?: (id: string) => void;
  onDownload?: (file: File) => void;
  style?: CSSProperties;
  className?: string;
  isEdit?: boolean;
  allowDownload?: boolean;
  lng: string;
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
}) => {
  const handleDelete = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleDownload = (file: File) => {
    if (onDownload) {
      onDownload(file);
    } else {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={className} style={style}>
      {files.map((file) => (
        <div key={file.id} className={styles.attachedFileItem}>
          <div onClick={allowDownload ? () => handleDownload(file.file) : undefined} className={styles.filePreview}>
            {file.preview ? (
              <img src={file.preview} alt={file.file.name} className={styles.previewImage} />
            ) : (
              <div className={styles.previewImage}>{getFileIcon(file.file)}</div>
            )}
            {isEdit && (
              <button className={styles.removeFileButton} onClick={(event) => handleDelete(event, file.id)}>
                ✕
              </button>
            )}
            <div className={styles.fileSize}>{formatFileSize(file.file.size, lng)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
