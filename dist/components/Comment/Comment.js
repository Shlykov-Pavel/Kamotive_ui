import React, { useEffect, useState } from 'react';
import styles from './Comment.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
import { TextEditor } from '../TextEditor/TextEditor';
import { AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';
import { IconAccount, IconDelete, IconPencil, IconPencilCancel } from '../../Icons';
import { IconButton } from '../IconButton/IconButton';
export const Comment = ({ comment, avatar, creationDate, canAttachFiles = true, canEdit = false, isEdit = false, error = false, setError, helperText, onSubmit, onDelete, onEdit, onDownload, canDeleteFile, onFileDelete, maxFileCount, maxFileSize, lng = 'ru', style, className, }) => {
    var _a, _b, _c, _d;
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
        onDelete === null || onDelete === void 0 ? void 0 : onDelete(comment);
    };
    const handleSubmit = (value, files) => {
        var _a;
        if (onSubmit) {
            onSubmit(value, files, (_a = comment === null || comment === void 0 ? void 0 : comment.id) !== null && _a !== void 0 ? _a : '');
        }
        setIsEditMode((prev) => !prev);
    };
    const handleCancel = () => {
        setIsEditMode((prev) => !prev);
    };
    useEffect(() => {
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(isEditMode);
    }, [isEditMode]);
    return (React.createElement("div", { className: wrapperClassess, style: style },
        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement("div", { className: styles.labelWrapper },
                React.createElement("div", { className: styles.flexBox }, avatar && !imageError ? (React.createElement("img", { src: avatar, alt: "Avatar", className: styles.avatar, onError: () => setImageError(true) })) : (React.createElement("div", { className: `${styles.avatar} ${styles.avatarIcon} ${styles.flexBox}` },
                    React.createElement(IconAccount, null)))),
                React.createElement("div", { className: styles.infoWrapper },
                    React.createElement(Typography, { variant: "Body2-Medium", className: labelClasses }, (_b = (_a = comment === null || comment === void 0 ? void 0 : comment.authorUser) === null || _a === void 0 ? void 0 : _a.fullName) !== null && _b !== void 0 ? _b : ''),
                    React.createElement(Typography, { variant: "Caption", className: styles.label, style: { color: '#8E8E93' } }, creationDate))),
            canEdit && (React.createElement("div", { className: styles.iconsWrapper },
                React.createElement(IconButton, { icon: isEditMode ? React.createElement(IconPencilCancel, { width: '14', height: '14' }) : React.createElement(IconPencil, { width: '14', height: '14' }), title: isEditMode ? lng === 'ru' ? 'Закрыть редактирование' : 'Close edit' : lng === 'ru' ? 'Редактировать' : 'Edit', onClick: handleEditClick, style: { width: '30px', height: '30px', padding: '5px' }, color: "var(--icons-grey)" }),
                React.createElement(IconButton, { icon: React.createElement(IconDelete, { width: '14', height: '14', strokeWidth: '0.5' }), title: lng === 'ru' ? 'Удалить' : 'Delete', onClick: handleDeleteClick, size: "sm", style: { width: '30px', height: '30px', padding: '5px' }, color: "var(--icons-grey)" })))),
        isEditMode ? (React.createElement(TextEditor, { defaultValue: (_c = comment === null || comment === void 0 ? void 0 : comment.text) !== null && _c !== void 0 ? _c : '', attachedFiles: comment.attachFiles, onSubmit: handleSubmit, onCancel: handleCancel, onDelete: onFileDelete, error: error, setError: setError, helperText: helperText, isEditMode: isEditMode, canAttachFiles: canAttachFiles, maxFileCount: maxFileCount, maxFileSize: maxFileSize, lng: lng })) : (React.createElement("div", { className: styles.commentWrapper },
            comment.attachFiles && ((_d = comment.attachFiles) === null || _d === void 0 ? void 0 : _d.length) > 0 && (React.createElement(AttachedFilesPreview, { files: comment.attachFiles, onDownload: onDownload, allowDelete: canDeleteFile, onDelete: onFileDelete, className: styles.attachedFilesContainer, maxFileCount: maxFileCount, lng: lng })),
            React.createElement("div", { id: `comment-${comment.id}`, className: inputClassess, dangerouslySetInnerHTML: { __html: comment.text || '' } }))),
        error && helperText && (React.createElement(Typography, { variant: "Caption", className: classNames(styles.helperText) }, helperText))));
};
