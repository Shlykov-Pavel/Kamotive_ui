import React, { CSSProperties, FC, useEffect, useState } from 'react';
import styles from './Comment.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
import { TextEditor } from '../TextEditor/TextEditor';
import { FilePreview, AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';
import { IconAccount, IconDelete, IconPencil, IconPencilCancel } from '../../Icons';
import { IconButton } from '../IconButton/IconButton';
import { Tooltip } from '../Tooltip/Tooltip';
import { CommentProps, TAttachments } from '../../types';
import { FileItem } from '../FileItem/FileItem';

export const Comment: FC<CommentProps> = ({
  comment,
  avatar,
  creationDate,
  canAttachFiles = true,
  canEdit = false,
  isEdit = false,
  error = false,
  helperText,
  onSubmit,
  onDelete,
  onEdit,
  lng = 'ru',
  style,
  className,
}) => {
  
  // const [commentText, setCommentText] = useState(comment.text || '');
  const [isEditMode, setIsEditMode] = useState(isEdit);
  // const [attachedFiles, setAttachedFiles] = useState<TAttachments[]>(files);
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
    onDelete?.(comment.id);
  };

  const handleSubmit = (value: string, files: File[]) => {
    // console.log('Comment - handleSubmit', value, '--', files);
    
    if (onSubmit) {
      onSubmit(value, files);
    }
    // setCommentText(value);
    // setAttachedFiles(files);
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
              {comment.authorUser.fullName}
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
          defaultValue={comment.text}
          attachedFiles={comment.attachFiles}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          error={error}
          helperText={helperText}
          isEditMode={isEditMode}
          // files={attachedFiles}
          canAttachFiles={canAttachFiles}
          lng={lng}
        />
      ) : (
        <div className={styles.commentWrapper}>
          {comment.attachFiles && comment.attachFiles?.length > 0 && (
            <AttachedFilesPreview 
              files={comment.attachFiles} 
              className={styles.attachedFilesContainer} 
              lng={lng} />
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
