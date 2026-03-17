import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './FileLoader.module.css';
import { Typography } from '../Typography/Typography';
import { IconUpload } from '../../Icons';
import { FileItem } from '../FileItem/FileItem';
import classNames from 'classnames';
const getFileNameWithoutExtension = (filename) => {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0 || lastDotIndex === filename.length - 1) {
        return filename;
    }
    return filename.substring(0, lastDotIndex);
};
const getFileExtension = (filename) => {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
        return '';
    }
    return filename.substring(lastDotIndex).toLowerCase();
};
// Функция для получения всех доступных форматов в виде строки
const getAcceptedFormatsString = (acceptedFormats) => {
    const uniqueFormats = new Set();
    for (const key in acceptedFormats) {
        if (acceptedFormats.hasOwnProperty(key)) {
            acceptedFormats[key].forEach((format) => {
                uniqueFormats.add(format.replace('.', ''));
            });
        }
    }
    return Array.from(uniqueFormats).join(', ');
};
const fileValidatorInner = (file, maxFileSize, maxFileCount, maxFileName, addedFilesLength, lng, acceptedFormats, rejectedFormats, fileValidator) => {
    const fileExtension = getFileExtension(file.name);
    const fileNameWithoutExt = getFileNameWithoutExtension(file.name);
    const nameLength = Array.from(fileNameWithoutExt).length;
    const fileParts = file.name.split('.');
    const fileExt = fileParts.length > 1 ? `.${fileParts.pop().toLowerCase()}` : '';
    const checks = {
        isSizeTooLarge: file.size > maxFileSize * 1024 * 1024 * 1024,
        isTooManyFiles: addedFilesLength > maxFileCount - 1,
        isNameTooLarge: typeof maxFileName === 'number' && maxFileName > 0 && nameLength > maxFileName,
        isAcceptedFormatValid: true,
        isRejectedFormatValid: true
    };
    // Проверка форматов
    if (acceptedFormats && !rejectedFormats) {
        const acceptedExtensions = Object.values(acceptedFormats).reduce((acc, val) => acc.concat(val), []);
        checks.isAcceptedFormatValid = acceptedExtensions.includes(fileExtension);
    }
    if (rejectedFormats) {
        const rejectedExtensions = Object.values(rejectedFormats).reduce((acc, val) => acc.concat(val), []);
        checks.isRejectedFormatValid = !rejectedExtensions.includes(fileExt);
    }
    switch (true) {
        case checks.isSizeTooLarge:
            return {
                code: 'size-too-large',
                message: lng === 'ru' || lng.includes('ru')
                    ? `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`
                    : `Maximum file size ${maxFileSize.toFixed(0)} GB`,
            };
        case checks.isTooManyFiles:
            return {
                code: 'files-count-too-large',
                message: lng === 'ru' || lng.includes('ru')
                    ? `Максимальное количество файлов ${maxFileCount}`
                    : `Maximum number of files ${maxFileCount}`,
            };
        case checks.isNameTooLarge:
            return {
                code: 'name-too-large',
                message: lng === 'ru' || lng.includes('ru')
                    ? `Имя файла не может превышать ${maxFileName} символов.`
                    : `File name must be under ${maxFileName} symbols.`,
            };
        case !checks.isAcceptedFormatValid:
            return {
                code: 'file-invalid-type',
                message: lng === 'ru' || lng.includes('ru')
                    ? `Файл должен быть одного из следующих типов: ${Object.values(acceptedFormats).reduce((acc, val) => acc.concat(val), []).join(', ')}`
                    : `File must be one of: ${Object.values(acceptedFormats).reduce((acc, val) => acc.concat(val), []).join(', ')}`,
            };
        case !checks.isRejectedFormatValid:
            return {
                code: 'file-invalid-type',
                message: lng === 'ru' || lng.includes('ru')
                    ? `Файл не должен быть одного из следующих типов: ${getAcceptedFormatsString(rejectedFormats)}`
                    : `File must not be one of: ${getAcceptedFormatsString(rejectedFormats)}`,
            };
        default: {
            if (fileValidator) {
                const customValidationResult = fileValidator(file);
                if (customValidationResult)
                    return customValidationResult;
            }
            return null;
        }
    }
};
export const FileLoader = forwardRef(({ maxFileSize = 2, maxFileCount = 10, maxFileName = 0, acceptedFormats = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx', '.log', '.syslog', '.txt'],
}, rejectedFormats, addedFiles, setAddedFiles, canAdd = true, lng = 'ru', className, style, fileValidator }, ref) => {
    const [isLoadingFiles, setIsLoadingFiles] = useState(false);
    const [loadingFilesNames, setLoadingFilesNames] = useState([]);
    const [errorFiles, setErrorFiles] = useState([]);
    const [addedFilesFormated, setAddedFilesFormatted] = useState([]);
    useImperativeHandle(ref, () => ({
        clearErrorFiles: () => {
            setErrorFiles([]);
        },
        clearAllFiles: () => {
            setErrorFiles([]);
            setAddedFiles([]);
            setAddedFilesFormatted([]);
            setLoadingFilesNames([]);
        }
    }));
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles, fileRejections) => {
            setAddedFiles([...addedFiles, ...acceptedFiles]);
            const newFormatAttachments = acceptedFiles.map((file) => ({
                id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                filename: file.name,
                size: file.size,
                type: file.type,
            }));
            setLoadingFilesNames(newFormatAttachments.map((file) => { var _a; return (_a = file === null || file === void 0 ? void 0 : file.filename) !== null && _a !== void 0 ? _a : 'Без названия'; }));
            setIsLoadingFiles(true);
            setAddedFilesFormatted([...addedFilesFormated, ...newFormatAttachments]);
            let formattedRejections = [];
            // Проверяем, есть ли ошибка превышения количества файлов
            const hasTooManyFilesError = fileRejections.some((rejection) => rejection.errors.some((error) => error.code === 'too-many-files'));
            if (hasTooManyFilesError) {
                const remainingFiles = Math.max(0, maxFileCount - addedFiles.length);
                const filesToAdd = fileRejections.slice(0, remainingFiles).map((rejection) => rejection.file);
                setAddedFiles([...addedFiles, ...filesToAdd]);
                const newFormatFilesToAdd = filesToAdd.map((rejectionAdd) => ({
                    id: Math.random().toString(36).substring(2, 9),
                    filename: rejectionAdd.name,
                    size: rejectionAdd.size,
                    type: rejectionAdd.type,
                }));
                setAddedFilesFormatted([...addedFilesFormated, ...newFormatFilesToAdd]);
                const filesToReject = fileRejections.slice(remainingFiles);
                formattedRejections = filesToReject.map((rejection) => ({
                    errors: [
                        {
                            code: 'files-count-too-large',
                            message: lng === 'ru' || lng.includes('ru')
                                ? `Максимальное количество файлов ${maxFileCount}`
                                : `Maximum number of files ${maxFileCount}`,
                        },
                    ],
                    file: {
                        id: Math.random().toString(36).substring(2, 9),
                        filename: rejection.file.name,
                        size: rejection.file.size,
                        path: rejection.file.path,
                    },
                }));
                setErrorFiles([...errorFiles, ...formattedRejections]);
            }
            else {
                formattedRejections = fileRejections.map((rejection) => ({
                    errors: rejection.errors,
                    file: {
                        id: Math.random().toString(36).substring(2, 9),
                        filename: rejection.file.name,
                        size: rejection.file.size,
                        path: rejection.file.path,
                    },
                }));
                setErrorFiles([...errorFiles, ...formattedRejections]);
            }
        },
        validator: (file) => fileValidatorInner(file, maxFileSize, maxFileCount, maxFileName, addedFiles.length, lng, acceptedFormats, rejectedFormats, fileValidator),
        accept: undefined,
        maxFiles: maxFileCount,
        disabled: !canAdd,
    });
    const handleDeleteFiles = (id) => {
        const fileIndex = addedFilesFormated.findIndex((file) => file.id === id);
        if (fileIndex !== -1) {
            const newAddedFiles = [...addedFiles];
            newAddedFiles.splice(fileIndex, 1);
            setAddedFiles(newAddedFiles);
            const fileToDelete = addedFilesFormated[fileIndex];
            setAddedFilesFormatted(addedFilesFormated.filter((file) => file.id !== id));
            setLoadingFilesNames(loadingFilesNames.filter((name) => name !== fileToDelete.filename));
        }
    };
    const handleDeleteRejectedFile = (id) => {
        setErrorFiles(errorFiles.filter((rejection) => rejection.file.id !== id));
    };
    const acceptedFileItems = addedFilesFormated.map((file) => (React.createElement(FileItem, { key: file.id, file: file, onDelete: handleDeleteFiles, isAddedFile: true, lng: lng })));
    const fileRejectionItems = errorFiles.map(({ file, errors }) => (React.createElement(FileItem, { key: file.id, file: file, error: errors[0].message, onDelete: handleDeleteRejectedFile, isRejectedFile: true, lng: lng })));
    useEffect(() => {
        if (addedFiles.length === 0) {
            setAddedFilesFormatted([]);
        }
    }, [addedFiles]);
    useEffect(() => {
        if (loadingFilesNames.length === 0 && isLoadingFiles) {
            setIsLoadingFiles(false);
        }
    }, [loadingFilesNames, isLoadingFiles]);
    return (React.createElement("section", { className: classNames(styles['fileLoader'], className), style: style },
        React.createElement("div", Object.assign({}, getRootProps({ className: `${styles['dropzone']} ${!canAdd ? styles['disabled'] : ''}` })),
            React.createElement("input", Object.assign({}, getInputProps())),
            React.createElement(IconUpload, { htmlColor: !canAdd ? 'var(--grey-medium)' : 'var(--icons-grey)', width: '34', height: '34' }),
            React.createElement(Typography, { variant: "Body1", color: !canAdd ? 'var(--grey-medium)' : 'var(--icons-grey)', style: { textAlign: 'center' } }, lng === 'ru' || lng.includes('ru') ? (React.createElement(React.Fragment, null,
                React.createElement("span", { style: { textDecoration: 'underline' } }, "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u044C"),
                React.createElement("span", null, " \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B"))) : (React.createElement(React.Fragment, null,
                React.createElement("span", { style: { textDecoration: 'underline' } }, "Click on this area"),
                React.createElement("span", null, " or drag files here")))),
            React.createElement("div", null,
                maxFileSize &&
                    (lng === 'ru' || lng.includes('ru') ? (React.createElement(Typography, { variant: "Body2", color: "var(--grey-medium)" },
                        `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`,
                        " ",
                        React.createElement("br", null))) : (React.createElement(Typography, { variant: "Body2", color: "var(--grey-medium)" },
                        `Maximum file size ${maxFileSize.toFixed(0)} GB`,
                        " ",
                        React.createElement("br", null)))),
                maxFileCount &&
                    (lng === 'ru' || lng.includes('ru') ? (React.createElement(Typography, { variant: "Body2", color: "var(--grey-medium)" }, `За раз можно загрузить ${maxFileCount} ${maxFileCount > 1 ? `файлов` : `файл`}`)) : (React.createElement(Typography, { variant: "Body2", color: "var(--grey-medium)" }, `You can upload ${maxFileCount} ${maxFileCount > 1 ? `files` : `file`}`))))),
        acceptedFormats && !rejectedFormats && (React.createElement(Typography, { variant: "Body2", color: "var(--grey-medium)" }, `${lng === 'ru' || lng.includes('ru') ? 'Поддерживаемые форматы:' : 'Supported formats:'} ${getAcceptedFormatsString(acceptedFormats)}`)),
        rejectedFormats && (React.createElement(Typography, { variant: "Body2", color: "var(--grey-medium)" }, `${lng === 'ru' || lng.includes('ru') ? 'Неподдерживаемые форматы:' : 'Unsupported formats:'} ${getAcceptedFormatsString(rejectedFormats)}`)),
        (addedFiles === null || addedFiles === void 0 ? void 0 : addedFiles.length) > 0 || (errorFiles === null || errorFiles === void 0 ? void 0 : errorFiles.length) > 0 ? (React.createElement("div", { className: styles['addedFiles'] },
            acceptedFileItems,
            fileRejectionItems)) : (React.createElement(Typography, { variant: "Body2-SemiBold", color: "var(--grey-medium)", style: { marginTop: '5px' } }, lng === 'ru' || lng.includes('ru') ? 'Файлы не добавлены' : 'Files not added'))));
});
