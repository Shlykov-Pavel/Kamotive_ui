import React from 'react';
import styles from './FileListAttached.module.css';
import { Typography } from '../Typography/Typography';
import { FileItem } from '../FileItem/FileItem';
import classNames from 'classnames';
export const FileListAttaсhed = ({ filesList, onDelete, onDownload, canDelete, canDownload, isInfoShown = true, lng = 'ru', className, style, }) => {
    if (!filesList || filesList.length === 0) {
        return lng === 'ru' || lng.includes('ru') ? (React.createElement(Typography, { variant: "Body2-SemiBold", color: "var(--grey-medium)", style: { marginTop: '5px' } }, "\u041D\u0435\u0442 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043D\u044B\u0445 \u0444\u0430\u0439\u043B\u043E\u0432")) : (React.createElement(Typography, { variant: "Body2-SemiBold", color: "var(--grey-medium)", style: { marginTop: '5px' } }, "No attached files"));
    }
    return (React.createElement("div", { className: classNames(styles['fileList'], className), style: style },
        isInfoShown &&
            (lng === 'ru' || lng.includes('ru') ? (React.createElement(Typography, { variant: "Body2-SemiBold", color: "var(--text-dark)", style: { lineHeight: '20px' }, className: styles['fileListHeader'] }, `Прикрепленные файлы (${filesList.length})`)) : (React.createElement(Typography, { variant: "Body2-SemiBold", color: "var(--text-dark)", style: { lineHeight: '20px' }, className: styles['fileListHeader'] }, `Attached files (${filesList.length})`))),
        React.createElement("div", { className: styles['fileListFiles'] }, filesList.map((file) => (React.createElement(FileItem, { key: file.id, file: file, onDownload: onDownload, onDelete: onDelete, canDelete: canDelete, canDownload: canDownload }))))));
};
