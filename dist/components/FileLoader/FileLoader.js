import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './FileLoader.module.css';
import { Typography } from '../Typography/Typography';
import { IconUpload } from '../../Icons';
import { FileItem } from '../FileItem/FileItem';
import classNames from 'classnames';
export const FileLoader = ({ maxFileSize = 2, maxFileCount = 10, acceptedFormats = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
}, addedFiles, setAddedFiles, canAdd = true, lng = 'ru', className, style, }) => {
    const [isLoadingFiles, setIsLoadingFiles] = useState(false);
    const [loadingFilesNames, setLoadingFilesNames] = useState([]);
    const [errorFiles, setErrorFiles] = useState([]);
    const [addedFilesFormated, setAddedFilesFormatted] = useState([]);
    const fileValidator = (file) => {
        if (file.size > maxFileSize * 1024 * 1024 * 1024) {
            return {
                code: 'name-too-large',
                message: lng === 'ru' || lng.includes('ru')
                    ? `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`
                    : `Maximum file size ${maxFileSize.toFixed(0)} GB`,
            };
        }
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
        validator: fileValidator,
        accept: acceptedFormats,
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
        return (React.createElement(FileItem, { key: file.id, file: file, loading: loadingFilesNames.includes(file.filename), onDelete: handleDeleteFiles, isAddedFile: true }));
    });
    const handleDeleteRejectedFile = (id) => {
        setErrorFiles(errorFiles.filter((rejection) => rejection.file.id !== id));
    };
    const fileRejectionItems = errorFiles.map(({ file, errors }) => (React.createElement(FileItem, { key: file.id, file: file, error: errors[0].message, onDelete: handleDeleteRejectedFile, isRejectedFile: true })));
    // Функция для получения всех доступных форматов в виде строки
    const getAcceptedFormatsString = (acceptedFormats) => {
        const formats = [];
        for (const key in acceptedFormats) {
            if (acceptedFormats.hasOwnProperty(key)) {
                formats.push(...acceptedFormats[key].map((format) => format.replace('.', '')));
            }
        }
        return formats.join(', ');
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
            React.createElement(IconUpload, { htmlColor: !canAdd ? 'var(--grey-medium)' : 'var(--icons-grey)' }),
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
        acceptedFormats &&
            (lng === 'ru' || lng.includes('ru') ? (React.createElement(Typography, { variant: "Body2", color: "var(--grey-medium)" }, `Поддерживаемые форматы: ${getAcceptedFormatsString(acceptedFormats)}`)) : (React.createElement(Typography, { variant: "Body2", color: "var(--grey-medium)" }, `Supported formats: ${getAcceptedFormatsString(acceptedFormats)}`))),
        (addedFiles === null || addedFiles === void 0 ? void 0 : addedFiles.length) > 0 || (errorFiles === null || errorFiles === void 0 ? void 0 : errorFiles.length) > 0 ? (React.createElement("div", { className: styles['addedFiles'] },
            acceptedFileItems,
            fileRejectionItems)) : lng === 'ru' || lng.includes('ru') ? (React.createElement(Typography, { variant: "Body2-SemiBold", color: "var(--grey-medium)", style: { marginTop: '5px' } }, "\u0424\u0430\u0439\u043B\u044B \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B")) : (React.createElement(Typography, { variant: "Body2-SemiBold", color: "var(--grey-medium)", style: { marginTop: '5px' } }, "Files not added"))));
};
