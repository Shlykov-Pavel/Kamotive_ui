import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './FileLoader.module.css';
import { Typography } from '../Typography/Typography';
import { IconUpload } from '../../Icons';
import { FileItem } from '../FileItem/FileItem';
import classNames from 'classnames';
export const FileLoader = forwardRef(({ maxFileSize = 2, maxFileCount = 10, maxFileName = 0, acceptedFormats = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx', '.log', '.syslog', '.txt'],
}, rejectedFormats, addedFiles, setAddedFiles, filesList = [], canAdd = true, lng = 'ru', className, style, fileValidator, progressBarWidth }, ref) => {
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
    const fileValidatorInner = (file) => {
        if (file.size > maxFileSize * 1024 * 1024 * 1024) {
            return {
                code: 'size-too-large',
                message: lng === 'ru' || lng.includes('ru')
                    ? `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`
                    : `Maximum file size ${maxFileSize.toFixed(0)} GB`,
            };
        }
        // Проверка на дубликаты в filesList
        if (filesList.find((existingFile) => existingFile.filename === file.name)) {
            return {
                code: 'repeating-file-name',
                message: lng === 'ru' || lng.includes('ru') ? `Файл уже существует в списке прикрепленных файлов` : `File already exists in the list of attached files`,
            };
        }
        // Проверка на дубликаты в addedFiles
        if (addedFiles.find((addedFile) => addedFile.name === file.name)) {
            return {
                code: 'repeating-file-name',
                message: lng === 'ru' || lng.includes('ru') ? `Файл уже добавлен` : `File already added`,
            };
        }
        if (addedFiles.length > maxFileCount - 1) {
            return {
                code: 'files-count-too-large',
                message: lng === 'ru' || lng.includes('ru') ? `Максимальное количество файлов ${maxFileCount}` : `Maximum number of files ${maxFileCount}`,
            };
        }
        if (maxFileName && file.name.length > maxFileName) {
            return {
                code: 'name-too-large',
                message: lng === 'ru' || lng.includes('ru') ? `Имя файла не может превышать ${maxFileName} символов` : `File name must be under ${maxFileName} symbols`,
            };
        }
        if (acceptedFormats && !rejectedFormats) {
            const acceptedExtensions = Object.values(acceptedFormats)
                .reduce((acc, val) => acc.concat(val), []);
            const fileParts = file.name.split('.');
            const fileExtension = fileParts.length > 1
                ? `.${fileParts.pop().toLowerCase()}`
                : '';
            if (!acceptedExtensions.includes(fileExtension)) {
                return {
                    code: 'file-invalid-type',
                    message: lng === 'ru' || lng.includes('ru')
                        ? `Файл должен быть одного из следующих типов: ${acceptedExtensions.join(', ')}`
                        : `File must be one of: ${acceptedExtensions.join(', ')}`,
                };
            }
        }
        if (rejectedFormats) {
            const rejectedExtensions = Object.values(rejectedFormats)
                .reduce((acc, val) => acc.concat(val), []);
            const fileParts = file.name.split('.');
            const fileExtension = fileParts.length > 1
                ? `.${fileParts.pop().toLowerCase()}`
                : '';
            if (rejectedExtensions.includes(fileExtension)) {
                return {
                    code: 'file-invalid-type',
                    message: lng === 'ru' || lng.includes('ru')
                        ? `Файл не должен быть одного из следующих типов: ${getAcceptedFormatsString(rejectedFormats)}`
                        : `File must not be one of: ${getAcceptedFormatsString(rejectedFormats)}`,
                };
            }
        }
        if (fileValidator) {
            const customValidationResult = fileValidator(file);
            if (customValidationResult) {
                return customValidationResult;
            }
        }
        return null;
    };
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles, fileRejections) => {
            setAddedFiles([...addedFiles, ...acceptedFiles]);
            //преобразование типа файлов для отрисовки в списке
            const newFormatAttachments = acceptedFiles.map((file) => {
                return {
                    id: `file-${file.name}`,
                    filename: file.name,
                    size: file.size,
                    type: file.type,
                };
            });
            setLoadingFilesNames(newFormatAttachments.map((file) => file.filename));
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
        validator: fileValidatorInner,
        accept: undefined,
        maxFiles: maxFileCount,
        disabled: !canAdd,
    });
    const handleDeleteFiles = (id) => {
        var _a;
        const filename = (_a = addedFilesFormated.find((file) => file.id === id)) === null || _a === void 0 ? void 0 : _a.filename;
        setAddedFiles(addedFiles.filter((file) => file.name !== filename));
        setAddedFilesFormatted(addedFilesFormated.filter((file) => file.filename !== filename));
        setLoadingFilesNames(loadingFilesNames.filter((id) => id !== id));
    };
    const acceptedFileItems = addedFilesFormated.map((file) => {
        return (React.createElement(FileItem, { key: file.id, file: file, loading: loadingFilesNames.includes(file.filename), onDelete: handleDeleteFiles, isAddedFile: true, progressBarWidth: progressBarWidth, lng: lng }));
    });
    const handleDeleteRejectedFile = (id) => {
        setErrorFiles(errorFiles.filter((rejection) => rejection.file.id !== id));
    };
    const fileRejectionItems = errorFiles.map(({ file, errors }) => (React.createElement(FileItem, { key: file.id, file: file, error: errors[0].message, onDelete: handleDeleteRejectedFile, isRejectedFile: true, lng: lng })));
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
                " ",
                React.createElement("span", null, " \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B"))) : (React.createElement(React.Fragment, null,
                React.createElement("span", { style: { textDecoration: 'underline' } }, "\u0421lick on this area"),
                " ",
                React.createElement("span", null, "or drag files here")))),
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
            fileRejectionItems)) : lng === 'ru' || lng.includes('ru') ? (React.createElement(Typography, { variant: "Body2-SemiBold", color: "var(--grey-medium)", style: { marginTop: '5px' } }, "\u0424\u0430\u0439\u043B\u044B \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B")) : (React.createElement(Typography, { variant: "Body2-SemiBold", color: "var(--grey-medium)", style: { marginTop: '5px' } }, "Files not added"))));
});
