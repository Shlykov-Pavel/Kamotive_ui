import React, { CSSProperties, FC, useState } from 'react';
import styles from './Comment.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
import { TextEditor } from '../TextEditor/TextEditor';
import { FilePreview, AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';
import { IconDeleteFilled, IconPencilFilled } from '../../Icons';
import { IconButton } from '../IconButton/IconButton';
import { CommentProps } from '../../types';

export const Comment: FC<CommentProps> = ({
  id,
  value,
  style,
  className,
  username,
  avatar,
  creationDate,
  isEdit = false,
  label,
  error = false,
  helperText,
  onChange,
  onSubmit,
}) => {
  const [commentText, setCommentText] = useState(value || '');
  const [isEditMode, setIsEditMode] = useState(isEdit);
  const [attachedFiles, setAttachedFiles] = useState<FilePreview[]>([]);

  const wrapperClassess = classNames(styles['wrapper--input'], className, {
    [styles['wrapper--input-label']]: label,
    [styles['wrapper--input-helperText']]: error,
  });

  const inputClassess = classNames(styles.input, styles['readOnly']);
  const labelClasses = classNames(styles.label, styles['label--bold']);

  const handleEditClick = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleDeleteClick = () => {};

  const handleSubmit = (value: string, files: FilePreview[]) => {
    if (onSubmit) {
      onSubmit();
    }
    setCommentText(value);
    setAttachedFiles(files);
    setIsEditMode((prev) => !prev);
  };

  const handleChange = (value: string, files: FilePreview[]) => {
    if (onChange) {
      onChange(value, files);
    }
  }

  return (
    <div className={wrapperClassess} style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.labelWrapper}>
          <div className="profile">
            <img src={avatar} alt="Avatar" className={styles.avatar} />
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
        <div className={styles.iconsWrapper}>
          <IconButton icon={<IconPencilFilled />} onClick={handleEditClick} size="sm" />
          <IconButton icon={<IconDeleteFilled />} onClick={handleDeleteClick} size="sm" />
        </div>
      </div>
      {isEditMode ? (
        <TextEditor
          defaultValue={commentText}
          onSubmit={handleSubmit}
          onChange={handleChange}
          error={error}
          helperText={helperText}
          files={attachedFiles}
        />
      ) : (
        <div className={styles.commentWrapper}>
          {attachedFiles.length > 0 && (
            <AttachedFilesPreview files={attachedFiles} className={styles.attachedFilesContainer} />
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
