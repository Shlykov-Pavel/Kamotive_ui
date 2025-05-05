import React, { useEffect, useRef, useState } from 'react';
import styles from './FileItem.module.css';
import { Typography } from '../Typography/Typography';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { IconButton } from '../IconButton/IconButton';
import { IconClose10, IconDownload, IconFile } from '../../Icons';
import { Tooltip } from '../Tooltip/Tooltip';
import classNames from 'classnames';
export const FileItem = ({ file, loading = false, error = '', onDownload, onDelete, canDelete = true, canDownload = true, style, isAddedFile, isRejectedFile, }) => {
    const [isLoadingFinished, setIsLoadingFinished] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(0);
    const [maxLength, setMaxLength] = useState(30);
    const fileItemRef = useRef(null);
    const fileNameRef = useRef(null);
    const calculateMaxLength = () => {
        if (fileItemRef.current && fileNameRef.current) {
            const containerWidth = fileItemRef.current.clientWidth;
            const iconsWidth = 100; // Примерная ширина для иконок и отступов
            const availableWidth = containerWidth - iconsWidth; // Доступная ширина для текста
            const charWidth = 8;
            const calculatedMaxLength = Math.floor(availableWidth / charWidth);
            const newMaxLength = Math.max(calculatedMaxLength, 20);
            setMaxLength(newMaxLength);
        }
    };
    const croppedName = (filename) => {
        if (filename.length <= maxLength) {
            return filename;
        }
        const lastDotIndex = filename.lastIndexOf('.');
        let name, extension;
        if (lastDotIndex === -1) {
            name = filename;
            extension = '';
        }
        else {
            name = filename.slice(0, lastDotIndex);
            extension = filename.slice(lastDotIndex);
        }
        const availableLength = maxLength - extension.length;
        if (availableLength <= 3) {
            return filename.slice(0, maxLength - 3) + '...';
        }
        const charsFromStart = Math.ceil((availableLength - 3) / 2);
        const charsFromEnd = Math.floor((availableLength - 3) / 2);
        return name.slice(0, charsFromStart) + '...' + name.slice(name.length - charsFromEnd) + extension;
    };
    // Для расчета ширины контейнера и обновления maxLength при изменении размера окна
    useEffect(() => {
        calculateMaxLength();
        window.addEventListener('resize', calculateMaxLength);
        return () => {
            window.removeEventListener('resize', calculateMaxLength);
        };
    }, []);
    // Расчет длительности анимации в зависимости от размера файла
    useEffect(() => {
        if (!file.size)
            return;
        const baseDuration = 2000; // для маленьких файлов (до 100 КБ) 1 секунда
        const fileSizeKB = file.size / 1024; // Размер файла в КБ
        let calculatedDuration;
        if (fileSizeKB <= 100) {
            calculatedDuration = baseDuration;
        }
        else if (fileSizeKB <= 1024) {
            const ratio = (fileSizeKB - 100) / (1024 - 100);
            calculatedDuration = baseDuration + ratio * 2000; // от 2 до 4 секунд
        }
        else if (fileSizeKB <= 10240) {
            const ratio = (fileSizeKB - 1024) / (10240 - 1024);
            calculatedDuration = 4000 + ratio * 4000; // от 4 до 8 секунд
        }
        else {
            const ratio = Math.min((fileSizeKB - 10240) / (102400 - 10240), 1);
            calculatedDuration = 10000 + ratio * 3000; // от 8 до 13 секунд
        }
        setAnimationDuration(calculatedDuration);
    }, [file]);
    const fileItemClasses = classNames(styles['fileItem'], {
        [styles['loading']]: loading,
        [styles['error']]: error,
        [styles[`fileItem_attached`]]: !(isAddedFile || isRejectedFile),
    });
    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        if (onDelete && id) {
            onDelete(id);
        }
    };
    const handleDownloadClick = (e, file) => {
        e.stopPropagation();
        if (onDownload && file) {
            onDownload(file);
        }
    };
    return (React.createElement("div", { className: fileItemClasses, style: style, ref: fileItemRef, onClick: () => !(isAddedFile || isRejectedFile) && canDownload && file && onDownload && onDownload(file) },
        React.createElement("div", { className: styles['fileItemFile'] },
            React.createElement("div", { className: styles['fileItemInfo'] },
                React.createElement("div", { className: styles['fileItemIcon'] },
                    React.createElement(IconFile, { htmlColor: 'var(--icons-grey)' })),
                React.createElement("div", { className: styles['fileItemName'], ref: fileNameRef },
                    file.filename.length > maxLength ? (React.createElement(Tooltip, { label: file.filename, position: "bottom-center", displayDelay: 300 },
                        React.createElement(Typography, { variant: "Body1", color: "var(--text-dark)" }, croppedName(file.filename)))) : (React.createElement(Typography, { variant: "Body1", color: "var(--text-dark)" }, croppedName(file.filename))),
                    file.size !== 0 && (React.createElement(Typography, { variant: "Caption", color: "var(--grey-medium)" }, `${file.size ? (file.size / 1024).toFixed(1) : 0} кБ`)))),
            React.createElement("div", { className: styles['fileItemActions'] },
                !(isAddedFile || isRejectedFile) && canDownload && (React.createElement(IconButton, { icon: React.createElement(IconDownload, null), onClick: (e) => handleDownloadClick(e, file), color: "var(--icons-grey)" })),
                canDelete && (React.createElement(IconButton, { icon: React.createElement(IconClose10, null), onClick: (e) => handleDeleteClick(e, file.id || ''), color: "var(--icons-grey)" })))),
        loading && !isLoadingFinished && (React.createElement(ProgressBar, { animated: true, size: "sm", value: 100, setIsLoadingFinished: setIsLoadingFinished, animationDuration: animationDuration })),
        error && (React.createElement(Typography, { variant: "Caption", color: "var(--error-main)" }, error))));
};
