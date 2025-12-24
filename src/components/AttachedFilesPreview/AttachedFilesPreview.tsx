import React, { CSSProperties, useRef } from 'react';
import { IconFileDefault, IconFileVideo, IconFileAudio, IconClose, IconFile } from '../../Icons';
import styles from './AttachedFilesPreview.module.css';
import { Typography } from '../Typography/Typography';
import { Tooltip } from '../Tooltip/Tooltip';
import { IconButton } from '../..';

export interface FilePreview {
  file: File;
  id: string;
  preview?: string;
  lng: string;
}

export const getFileIcon = (file: File) => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  // if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
  //   return < IconFile htmlColor="#dc2626" text="PDF" />;
  // }

  // if (fileType.includes('word') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
  //   return < IconFile htmlColor="#2563eb" text="DOC" />;
  // }

  // if (fileType.includes('sheet') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
  //   return <IconFile htmlColor="#16a34a" text="XLS" />;
  // }

  // if (fileType.includes('presentation') || fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
  //   return <IconFile htmlColor="#ea580c" text="PPT" />;
  // }

  // if (fileType.includes('text') || fileName.endsWith('.txt')) {
  //   return <IconFile htmlColor="#6b7280" text="TXT" />;
  // }

  // if (fileType.includes('zip') || fileType.includes('rar') || fileName.endsWith('.zip') || fileName.endsWith('.rar')) {
  //   return <IconFile htmlColor="#7c3aed" text="ZIP" />;
  // }

  if (fileType.includes('video')) {
    return <IconFileVideo htmlColor={'var(--text-btn-light)'} color={'var(--text-btn-light)'}/>;
  }

  if (fileType.includes('audio')) {
    return <IconFileAudio htmlColor={'var(--text-btn-light)'} color={'var(--text-btn-light)'}/>;
  }

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

   const deleteButtonRef = useRef<HTMLButtonElement>(null);
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
    <div className={className} style={style} title="">
      {files.map((file) => (
          <div  className={styles.attachedFileItem}>
            <div key={file.id} className={styles.nameContainer} title="">
              <div className={styles.previewImage} title="">
                  {getFileIcon(file.file)}</div>
              <div className={styles.name} onClick={allowDownload ? () => handleDownload(file.file) : undefined} style={{cursor:'pointer'}}>
                <Typography variant='Body2-Medium' color='var(--text-dark)'>{file.file.name}</Typography>
                {/* <div className={styles.fileSize}>{formatFileSize(file.file.size, lng)}</div> */}
              </div>
            </div>
            {isEdit && (
              // <button className={styles.removeFileButton} onClick={(event) => handleDelete(event, file.id)}>
              //   ✕
              // </button>
                <Tooltip key={`delete-btn-${isEdit}`} label={lng === 'ru' ? 'Удалить' : 'Delete'} position="bottom-center" hideDelay={ 0 }>
                  <IconButton
                    ref={deleteButtonRef}
                    icon={<IconClose/>} 
                    onClick={(event) => handleDelete(event, file.id)}
                      style={{ 
                      width: '30px', 
                      height: '30px', 
                      padding:'5px', 
                      background: 'none',
                      cursor: 'pointer'
                    }} 
                      color="var(--text-btn-light)"
                  />
              </Tooltip>
            )}
          </div>
      ))}
    </div>
  );

  // return (
  //   <div className={className} style={style}>
  //     {files.map((file) => (
  //       <div key={file.id} className={styles.attachedFileItem}>
  //         <div onClick={allowDownload ? () => handleDownload(file.file) : undefined} className={styles.filePreview}>
  //           {/* {file.preview ? (
  //             <img src={file.preview} alt={file.file.name} className={styles.previewImage} />
  //           ) : ( */}
  //              <div className={styles.previewImage}>{getFileIcon(file.file)}</div>
  //             <div>{file.file.name}</div>
  //           {/* )} */}

  //           {isEdit && (
  //             <button className={styles.removeFileButton} onClick={(event) => handleDelete(event, file.id)}>
  //               ✕
  //             </button>
  //           )}
  //           <div className={styles.fileSize}>{formatFileSize(file.file.size, lng)}</div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};
