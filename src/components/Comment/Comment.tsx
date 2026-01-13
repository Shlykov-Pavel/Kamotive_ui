import React, { FC, useEffect, useState } from 'react';
import styles from './Comment.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
import { TextEditor } from '../TextEditor/TextEditor';
import { AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';
import { IconAccount, IconDelete, IconPencil, IconPencilCancel } from '../../Icons';
import { IconButton } from '../IconButton/IconButton';
import { CommentProps } from '../../types';


export const Comment: FC<CommentProps> = ({
  comment,
  avatar,
  creationDate,
  canAttachFiles = true,
  canEdit = false,
  isEdit = false,
  error = false,
  setError,
  helperText,
  onSubmit,
  onDelete,
  onEdit,
  onDownload,
  canDeleteFile,
  onFileDelete,
  maxFileCount,
  maxFileSize,
  lng = 'ru',
  style,
  className,
}) => {
  
  const [isEditMode, setIsEditMode] = useState(isEdit);
  const [imageError, setImageError] = useState(false);

  const wrapperClassess = classNames(styles['wrapper--input'], className, {
    [styles['wrapper--input-helperText']]: error,
  });

  const inputClassess = classNames(styles.input, styles['readOnly']);
  const labelClasses = classNames(styles.label, styles['label--bold']);

  const handleEditClick = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleDeleteClick = () => {
    // comment.id && onDelete?.(comment.id);
    onDelete?.(comment)
  };

  const handleSubmit = (value: string, files: File[]) => {    
    if (onSubmit) {
      onSubmit(value, files, comment?.id ?? '');
    }
    setIsEditMode((prev) => !prev);
  };

  const handleCancel = () => {
    setIsEditMode((prev) => !prev);
  };
  
  useEffect(() => {
    onEdit?.(isEditMode)
  }, [isEditMode]);


  return (
    <div className={wrapperClassess} style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.labelWrapper}>
          <div className={styles.flexBox}>
            {avatar && !imageError ? (
              <img src={avatar} alt="Avatar" className={styles.avatar} onError={() => setImageError(true)} />
            ) : (
              <div className={`${styles.avatar} ${styles.avatarIcon} ${styles.flexBox}`}>
                <IconAccount />
              </div>
            )}
          </div>
          <div className={styles.infoWrapper}>
            <Typography variant="Body2-Medium" className={labelClasses}>
              {comment?.authorUser?.fullName ?? ''}
            </Typography>
            <Typography variant="Caption" className={styles.label} style={{ color: '#8E8E93' }}>
              {creationDate}
            </Typography>
          </div>
        </div>
        {canEdit && (
          <div className={styles.iconsWrapper}>
              <IconButton
              icon={isEditMode ? <IconPencilCancel width={'14'} height={'14'}/>: <IconPencil  width={'14'} height={'14'}/>} 
              title={lng === 'ru' ? 'Закрыть редактирование' : 'Close edit'}
              onClick={handleEditClick}
              style={{ width: '30px', height: '30px', padding:'5px' }} 
              color= "var(--icons-grey)" 
              />
          
              <IconButton 
                icon={<IconDelete width={'14'} height={'14'} />} 
                title={lng === 'ru' ? 'Удалить' : 'Delete'}
                onClick={handleDeleteClick} 
                size="sm" 
                style={{ width: '30px', height: '30px', padding:'5px'  }} 
                color= "var(--icons-grey)" 
            />
          </div>
        )}
      </div>
      {isEditMode ? (
        <TextEditor
          defaultValue={comment?.text ?? ''}
          attachedFiles={comment.attachFiles}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={onFileDelete}
          error={error}
          setError={setError}
          helperText={helperText}
          isEditMode={isEditMode}
          canAttachFiles={canAttachFiles}
          maxFileCount={maxFileCount}
          maxFileSize={maxFileSize}
          lng={lng}
        />
      ) : (
        <div className={styles.commentWrapper}>
          {comment.attachFiles && comment.attachFiles?.length > 0 && (
            <AttachedFilesPreview 
              files={comment.attachFiles} 
              onDownload={onDownload}
              allowDelete={canDeleteFile}
              onDelete={onFileDelete}
              className={styles.attachedFilesContainer}
              maxFileCount={maxFileCount} 
              lng={lng}
            />
          )}
          <div 
            id={`comment-${comment.id}`}
            className={inputClassess} 
            dangerouslySetInnerHTML={{ __html: comment.text || '' }} />
        </div>
     
      )}
      {error && helperText && (
        <Typography variant="Caption" className={classNames(styles.helperText)}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};
