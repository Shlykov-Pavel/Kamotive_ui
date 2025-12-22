import React, { CSSProperties, FC, useEffect, useState } from 'react';
import styles from './Comment.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
import { TextEditor } from '../TextEditor/TextEditor';
import { FilePreview, AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';
import { IconAccount, IconDelete, IconPencil, IconPencilCancel } from '../../Icons';
import { IconButton } from '../IconButton/IconButton';
import { Tooltip } from '../Tooltip/Tooltip';
import { CommentProps } from '../../types';

export const Comment: FC<CommentProps> = ({
  id,
  value,
  style,
  className,
  username,
  avatar,
  creationDate,
  canAttachFiles = false,
  files = [],
  canEdit = false,
  isEdit = false,
  label,
  error = false,
  helperText,
  onChange,
  onSubmit,
  onDelete,
  onCancel,
  onEdit,
  lng = 'ru',
}) => {
  
  const [commentText, setCommentText] = useState(value || '');
  const [isEditMode, setIsEditMode] = useState(isEdit);
  const [attachedFiles, setAttachedFiles] = useState<FilePreview[]>(files);
  const [imageError, setImageError] = useState(false);

  const wrapperClassess = classNames(styles['wrapper--input'], className, {
    [styles['wrapper--input-label']]: label,
    [styles['wrapper--input-helperText']]: error,
  });

  const inputClassess = classNames(styles.input, styles['readOnly']);
  const labelClasses = classNames(styles.label, styles['label--bold']);

  const handleEditClick = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleDeleteClick = () => {
    onDelete?.(id);
  };

  const handleSubmit = (value: string, files: FilePreview[]) => {
    if (onSubmit) {
      onSubmit(value, files);
    }
    setCommentText(value);
    setAttachedFiles(files);
    setIsEditMode((prev) => !prev);
  };

  const handleChange = (value: string, files: FilePreview[]) => {
    if (onChange) {
      onChange(value, files);
    }
  };

  const handleCancel = () => {
        setIsEditMode((prev) => !prev);
        onCancel?.();
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
              {username}
            </Typography>
            <Typography variant="Caption" className={styles.label} style={{ color: '#8E8E93' }}>
              {creationDate}
            </Typography>
          </div>
        </div>
        {canEdit && (
          <div className={styles.iconsWrapper}>
            <Tooltip label={isEditMode ? (lng === 'ru' ? 'Закрыть редактирование' : 'Close edit') : (lng === 'ru' ? 'Редактировать' : 'Edit')}
            key={`edit-btn-${isEditMode}`}
            position={"top-center"}
            style= {{ width: 'max-content', whiteSpace: 'nowrap' }}
            hideDelay={ 0 }
            >
              <IconButton
              icon={isEditMode ? <IconPencilCancel width={'14'} height={'14'}/>: <IconPencil  width={'14'} height={'14'}/>} 
              onClick={handleEditClick}
              style={{ width: '30px', height: '30px', padding:'5px' }} 
              color= "var(--icons-grey)" 
              />
            </Tooltip>
            <Tooltip 
              label={lng === 'ru' ? 'Удалить' : 'Delete'}
              key={`delete-btn-${id}`}
              position={"top-center"}
              style= {{ width: 'max-content', whiteSpace: 'nowrap' }}
              hideDelay={ 0 }
            >
              <IconButton 
                icon={<IconDelete width={'14'} height={'14'} />} 
                onClick={handleDeleteClick} 
                size="sm" 
                style={{ width: '30px', height: '30px', padding:'5px'  }} 
                color= "var(--icons-grey)" 
            />
            </Tooltip>
            
          </div>
        )}
      </div>
      {isEditMode ? (
        <TextEditor
          defaultValue={commentText}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onCancel={handleCancel}
          error={error}
          helperText={helperText}
          isEditMode={isEditMode}
          files={attachedFiles}
          canAttachFiles={canAttachFiles}
          lng={lng}
        />
      ) : (
        <div className={styles.commentWrapper}>
          {attachedFiles.length > 0 && (
            <AttachedFilesPreview files={attachedFiles} className={styles.attachedFilesContainer} lng={lng} />
          )}
          <div id={id} className={inputClassess} dangerouslySetInnerHTML={{ __html: commentText || '' }} />
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
