import React from 'react';
import { IconFile } from '../../Icons';
import { FileItem, Typography } from '../..';
export const getFileIcon = (file) => {
    return React.createElement(IconFile, { htmlColor: 'var(--text-btn-light)', color: 'var(--text-btn-light)' });
};
// Функция для форматирования размера файла
export const formatFileSize = (bytes, lng) => {
    if (!bytes || bytes === 0) {
        return lng === 'ru' || (lng === null || lng === void 0 ? void 0 : lng.includes('ru')) ? '0 Байт' : '0 Bytes';
    }
    const k = 1024;
    const sizesEn = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const sizesRu = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const sizes = lng === 'ru' || (lng === null || lng === void 0 ? void 0 : lng.includes('ru')) ? sizesRu : sizesEn;
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
export const AttachedFilesPreview = ({ files, onDownload, allowDelete = false, onDelete, style, className, maxFileCount = 5, lng, }) => {
    return (React.createElement("div", { className: className, style: style, title: "" },
        files.map((file, index) => {
            var _a;
            return (React.createElement(FileItem, { key: `${index + ((_a = file.filename) !== null && _a !== void 0 ? _a : '')}`, file: file, error: file.error, canDelete: allowDelete, canDownload: Boolean(onDownload), onDelete: (id) => allowDelete && (onDelete === null || onDelete === void 0 ? void 0 : onDelete(id)), onDownload: (file) => onDownload === null || onDownload === void 0 ? void 0 : onDownload(file), style: {
                    border: !file.error ? 'none' : undefined,
                    padding: !file.error ? '5px 5px' : '5px 5px',
                    borderRadius: '5px'
                }, isRejectedFile: file.error, isComment: true, lng: lng }));
        }),
        files.length > maxFileCount && (React.createElement(Typography, { variant: "Caption", color: "var(--error-main)" }, (lng === 'ru' || lng.includes('ru')) ? `Максимальное количество файлов ${maxFileCount}` : `Maximum number of files ${maxFileCount}`))));
};
