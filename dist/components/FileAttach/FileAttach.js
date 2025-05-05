import React from 'react';
import styles from './FileAttach.module.css';
import classNames from 'classnames';
import { FileLoader } from '../FileLoader/FileLoader';
import { FileListAttaсhed } from '../FileListAttached/FileListAttaсhed';
export const FileAttach = ({ filesList = [], maxFileSize = 2, maxFileCount = 10, acceptedFormats = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
}, addedFiles, setAddedFiles, onDownload, onDelete, canAdd = true, canDelete = true, canDownload = true, position = 'bottom', lng = 'ru', className, style, }) => {
    const fileAttachClasses = classNames(styles['fileAttach'], className, {
        [styles[`fileAttach_position_${position}`]]: position,
    });
    return (React.createElement("div", { className: fileAttachClasses, style: style },
        React.createElement(FileLoader, { maxFileSize: maxFileSize, maxFileCount: maxFileCount, acceptedFormats: acceptedFormats, addedFiles: addedFiles, setAddedFiles: setAddedFiles, canAdd: canAdd, lng: lng }),
        React.createElement(FileListAttaсhed, { filesList: filesList, onDelete: onDelete, onDownload: onDownload, canDelete: canDelete, canDownload: canDownload, lng: lng })));
};
