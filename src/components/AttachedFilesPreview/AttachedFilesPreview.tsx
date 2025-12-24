import React, { CSSProperties, useRef } from 'react';
import { IconFileDefault, IconFileVideo, IconFileAudio, IconClose, IconFile } from '../../Icons';
import styles from './AttachedFilesPreview.module.css';
import { Typography } from '../Typography/Typography';
import { Tooltip } from '../Tooltip/Tooltip';
import { FileItem, IconButton } from '../..';
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

  console.log('files',files);
  

  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const handleDownload = (file: TAttachments) => {
    if (onDownload) {
      onDownload(file);
    } else {
      // const url = URL.createObjectURL(file);
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = file.filename;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // URL.revokeObjectURL(url);
    }
  };

  console.log('canDownload',!isEdit);
  

  
  
  return (
    <div className={className} style={style} title="">
      {files.map((file, index) => (
        <FileItem
          key={`${index + file.filename}`}
          file={file}
          error={error}
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

  //  return (
  //   <div className={className} style={style} title="">
  //     {files.map((file, index) => (
  //         <div  className={styles.attachedFileItem}>
  //           <div key={`${index + file.filename}` } className={styles.nameContainer} title="">
  //             <div className={styles.previewImage} title="">
  //                 {getFileIcon(file)}</div>
  //             <div className={styles.name} onClick={allowDownload ? () => handleDownload(file) : undefined} style={{cursor:'pointer'}}>
  //               <Typography variant='Body2-Medium' color='var(--text-dark)'>{file.filename}</Typography>
  //               {/* <div className={styles.fileSize}>{formatFileSize(file.file.size, lng)}</div> */}
  //             </div>
  //           </div>
  //           {isEdit && (
  //             // <button className={styles.removeFileButton} onClick={(event) => handleDelete(event, file.id)}>
  //             //   ✕
  //             // </button>
  //                 <IconButton
  //                   ref={deleteButtonRef}
  //                   title={lng === 'ru' ? 'Удалить' : 'Delete'}
  //                   icon={<IconClose/>} 
  //                   onClick={(event) => handleDelete(event, file.id)}
  //                     style={{ 
  //                     width: '30px', 
  //                     height: '30px', 
  //                     padding:'5px', 
  //                     background: 'transparent',
  //                     cursor: 'pointer'
  //                   }} 
  //                     color="var(--text-btn-light)"
  //                 />
  //           )}
  //         </div>
  //     ))}
  //   </div>
  // );

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
