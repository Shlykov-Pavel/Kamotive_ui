import React from 'react';
import styles from './FileItem.module.css';
import { Typography } from '../Typography/Typography';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { IconButton } from '../IconButton/IconButton';
import { IconClose10, IconDownload, IconFile } from '../../Icons';
export const FileItem = ({ name, size = 0, loading = false, error = '', onDownload, onDelete }) => {
    return (React.createElement("div", { className: `${styles['fileItem']} ${error ? styles['error'] : ''}` },
        React.createElement("div", { className: styles['fileItemFile'] },
            React.createElement("div", { className: styles['fileItemInfo'] },
                React.createElement("div", { className: styles['fileItemIcon'] },
                    React.createElement(IconFile, { htmlColor: 'var(--icons-grey)' })),
                React.createElement("div", { className: styles['fileItemName'] },
                    React.createElement(Typography, { variant: "Body1-Medium", color: "var(--text-dark)" }, name),
                    size !== 0 && (React.createElement(Typography, { variant: "Caption", color: "var(--grey-medium)" }, `${(size / 1024).toFixed(1)} кБ`)))),
            onDownload && (React.createElement(IconButton, { icon: React.createElement(IconDownload, null), onClick: onDownload, color: 'var(--icons-grey)', className: styles['fileIcon'] })),
            onDelete && (React.createElement(IconButton, { icon: React.createElement(IconClose10, null), onClick: onDelete, color: 'var(--icons-grey)' }))),
        loading && React.createElement(ProgressBar, { animated: true, size: "sm", value: 100 }),
        error && (React.createElement(Typography, { variant: "Caption", color: "var(--error-main)" }, error))));
};
