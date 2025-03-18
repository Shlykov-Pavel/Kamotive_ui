import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './FileAttach.module.css';
import { Typography } from '../Typography/Typography';
import { IconUpload } from '../../Icons';
import { Loader } from '../Loader/Loader';
import classNames from 'classnames';
export const FileAttach = ({ maxFileSize = 2, maxFileCount = 10, acceptedFormats = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
}, addedFiles, setAddedFiles, disabled = false, className, style, }) => {
    const [errorFiles, setErrorFiles] = useState([]);
    const fileValidator = (file) => {
        if (file.size > maxFileSize * 1024 * 1024 * 1024) {
            return {
                code: 'name-too-large',
                message: `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`,
            };
        }
        if (addedFiles.find((addedFile) => addedFile.name === file.name)) {
            return {
                code: 'repeating-file-name',
                message: `Файл уже добавлен`,
            };
        }
        if (addedFiles.length > maxFileCount - 1) {
            return {
                code: 'files-count-too-large',
                message: `Максимальное количество файлов ${maxFileCount}`,
            };
        }
        return null;
    };
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles, fileRejections) => {
            setAddedFiles([...addedFiles, ...acceptedFiles]);
            setErrorFiles([...errorFiles, ...fileRejections]);
        },
        validator: fileValidator,
        accept: acceptedFormats,
        maxFiles: maxFileCount,
        disabled: disabled,
    });
    const acceptedFileItems = addedFiles.map((file, index) => (React.createElement(Loader, { name: file.name, size: file.size, onClick: () => deleteAcceptedFile(addedFiles, setAddedFiles, file.name), key: index })));
    const fileRejectionItems = errorFiles.map(({ file, errors }) => (React.createElement(Loader, { name: file.name, size: file.size, error: errors[0].message, onClick: () => deleteRejectedFile(errorFiles, setErrorFiles, file.name), key: file.path })));
    const deleteAcceptedFile = (addedFiles, setAddedFiles, fileName) => {
        setAddedFiles(addedFiles.filter((file) => file.name !== fileName));
    };
    const deleteRejectedFile = (errorFiles, setErrorFiles, fileName) => {
        setErrorFiles(errorFiles.filter(({ file }) => file.name !== fileName));
    };
    // Функция для получения всех доступных форматов в виде строки
    const getAcceptedFormatsString = (acceptedFormats) => {
        const formats = [];
        for (const key in acceptedFormats) {
            if (acceptedFormats.hasOwnProperty(key)) {
                formats.push(...acceptedFormats[key].map(format => format.replace('.', '')));
            }
        }
        return formats.join(', ');
    };
    return (React.createElement("section", { className: classNames(styles['fileAttach'], className), style: style },
        React.createElement("div", Object.assign({}, getRootProps({ className: `${styles['dropzone']} ${disabled ? styles['disabled'] : ''}` })),
            React.createElement("input", Object.assign({}, getInputProps())),
            React.createElement(IconUpload, { htmlColor: disabled ? 'var(--grey-medium)' : 'var(--icons-grey)' }),
            React.createElement(Typography, { variant: "Body2-Medium", color: disabled ? 'var(--grey-medium)' : 'var(--text-dark)' },
                React.createElement("span", { style: { textDecoration: 'underline' } }, "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u044C"),
                React.createElement("span", null, " \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B")),
            React.createElement("div", null,
                maxFileSize && (React.createElement(Typography, { variant: "Caption", color: "var(--grey-medium)" },
                    `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`,
                    " ",
                    React.createElement("br", null))),
                maxFileCount && (React.createElement(Typography, { variant: "Caption", color: "var(--grey-medium)" }, `За раз можно загрузить ${maxFileCount} ${maxFileCount > 1 ? `файлов` : `файл`}`)))),
        acceptedFormats && (React.createElement(Typography, { variant: "Caption", color: "var(--grey-medium)" }, `Поддерживаемые форматы: ${getAcceptedFormatsString(acceptedFormats)}`)),
        (addedFiles === null || addedFiles === void 0 ? void 0 : addedFiles.length) > 0 || (errorFiles === null || errorFiles === void 0 ? void 0 : errorFiles.length) > 0 ? (React.createElement("div", { className: styles['addedFiles'] },
            acceptedFileItems,
            fileRejectionItems)) : (React.createElement(Typography, { variant: "Body2-Medium", color: "var(--text-dark)" }, "\u0424\u0430\u0439\u043B\u044B \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B"))));
};
