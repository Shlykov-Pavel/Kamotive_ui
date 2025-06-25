import React, { useState } from 'react';
import styles from './Comment.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
import { TextEditor } from '../TextEditor/TextEditor';
import { AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';
import { IconDeleteFilled, IconPencilFilled } from '../../Icons';
import { IconButton } from '../IconButton/IconButton';
export const Comment = ({ id, value, style, className, username, avatar, creationDate, isEdit = false, label, error = false, helperText, onChange, onSubmit, }) => {
    const [commentText, setCommentText] = useState(value || '');
    const [isEditMode, setIsEditMode] = useState(isEdit);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const wrapperClassess = classNames(styles['wrapper--input'], className, {
        [styles['wrapper--input-label']]: label,
        [styles['wrapper--input-helperText']]: error,
    });
    const inputClassess = classNames(styles.input, styles['readOnly']);
    const labelClasses = classNames(styles.label, styles['label--bold']);
    const handleEditClick = () => {
        setIsEditMode((prev) => !prev);
    };
    const handleDeleteClick = () => { };
    const handleSubmit = (value, files) => {
        if (onSubmit) {
            onSubmit();
        }
        setCommentText(value);
        setAttachedFiles(files);
        setIsEditMode((prev) => !prev);
    };
    const handleChange = (value, files) => {
        if (onChange) {
            onChange(value, files);
        }
    };
    return (React.createElement("div", { className: wrapperClassess, style: style },
        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement("div", { className: styles.labelWrapper },
                React.createElement("div", { className: "profile" },
                    React.createElement("img", { src: avatar, alt: "Avatar", className: styles.avatar })),
                React.createElement("div", { className: styles.infoWrapper },
                    React.createElement(Typography, { variant: "Body2-Medium", className: labelClasses }, username),
                    React.createElement(Typography, { variant: "Caption", className: styles.label, style: { color: '#8E8E93' } }, creationDate))),
            React.createElement("div", { className: styles.iconsWrapper },
                React.createElement(IconButton, { icon: React.createElement(IconPencilFilled, null), onClick: handleEditClick, size: "sm" }),
                React.createElement(IconButton, { icon: React.createElement(IconDeleteFilled, null), onClick: handleDeleteClick, size: "sm" }))),
        isEditMode ? (React.createElement(TextEditor, { defaultValue: commentText, onSubmit: handleSubmit, onChange: handleChange, error: error, helperText: helperText, files: attachedFiles })) : (React.createElement("div", { className: styles.commentWrapper },
            attachedFiles.length > 0 && (React.createElement(AttachedFilesPreview, { files: attachedFiles, className: styles.attachedFilesContainer })),
            React.createElement("div", { id: id, className: inputClassess, dangerouslySetInnerHTML: { __html: commentText || '' } }))),
        error && helperText && (React.createElement(Typography, { variant: "Caption", className: classNames(styles.helperText) }, helperText))));
};
