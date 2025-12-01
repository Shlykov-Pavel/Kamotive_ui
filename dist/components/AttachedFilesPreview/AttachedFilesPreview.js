import React from 'react';
import { IconFileDefault, IconFileVideo, IconFileAudio } from '../../Icons';
import styles from './AttachedFilesPreview.module.css';
export const getFileIcon = (file) => {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        return React.createElement(IconFileDefault, { htmlColor: "#dc2626", text: "PDF" });
    }
    if (fileType.includes('word') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        return React.createElement(IconFileDefault, { htmlColor: "#2563eb", text: "DOC" });
    }
    if (fileType.includes('sheet') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
        return React.createElement(IconFileDefault, { htmlColor: "#16a34a", text: "XLS" });
    }
    if (fileType.includes('presentation') || fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
        return React.createElement(IconFileDefault, { htmlColor: "#ea580c", text: "PPT" });
    }
    if (fileType.includes('text') || fileName.endsWith('.txt')) {
        return React.createElement(IconFileDefault, { htmlColor: "#6b7280", text: "TXT" });
    }
    if (fileType.includes('zip') || fileType.includes('rar') || fileName.endsWith('.zip') || fileName.endsWith('.rar')) {
        return React.createElement(IconFileDefault, { htmlColor: "#7c3aed", text: "ZIP" });
    }
    if (fileType.includes('video')) {
        return React.createElement(IconFileVideo, null);
    }
    if (fileType.includes('audio')) {
        return React.createElement(IconFileAudio, null);
    }
    return React.createElement(IconFileDefault, null);
};
// Функция для форматирования размера файла
export const formatFileSize = (bytes, lng) => {
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
export const AttachedFilesPreview = ({ files, onDelete, onDownload, style, className, isEdit, allowDownload = true, }) => {
    const handleDelete = (event, id) => {
        event.stopPropagation();
        if (onDelete) {
            onDelete(id);
        }
    };
    const handleDownload = (file) => {
        if (onDownload) {
            onDownload(file);
        }
        else {
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
    return (React.createElement("div", { className: className, style: style }, files.map((file) => (React.createElement("div", { key: file.id, className: styles.attachedFileItem },
        React.createElement("div", { onClick: allowDownload ? () => handleDownload(file.file) : undefined, className: styles.filePreview },
            file.preview ? (React.createElement("img", { src: file.preview, alt: file.file.name, className: styles.previewImage })) : (React.createElement("div", { className: styles.previewImage }, getFileIcon(file.file))),
            isEdit && (React.createElement("button", { className: styles.removeFileButton, onClick: (event) => handleDelete(event, file.id) }, "\u2715")),
            React.createElement("div", { className: styles.fileSize }, formatFileSize(file.file.size, lng.lng))))))));
};
