import React from 'react';
import styles from './Loader.module.css';
import { Typography } from '../Typography/Typography';
import { IconFile } from '../../Icons/IconFile/IconFile';
import { ProgressBar } from '../ProgressBar/ProgressBar';
export const Loader = ({ name, size = 0, loading = false, error = '', onClick }) => {
    return (React.createElement("div", { className: `${styles['loader']} ${error ? styles['error'] : ''}` },
        React.createElement("div", { className: styles['loaderFile'] },
            React.createElement("div", { className: styles['loaderInfo'] },
                React.createElement("div", { className: styles['loaderIcon'] },
                    React.createElement(IconFile, { htmlColor: 'var(--icons-grey)' })),
                React.createElement("div", { className: styles['loaderName'] },
                    React.createElement(Typography, { variant: "Body1-Medium", color: "var(--text-dark)" }, name),
                    size !== 0 && (React.createElement(Typography, { variant: "Caption", color: "var(--grey-medium)" }, `${(size / 1024).toFixed(1)} кБ`)))),
            React.createElement("button", { type: "button", "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u0430\u0439\u043B", onClick: onClick })),
        loading && React.createElement(ProgressBar, { animated: true, size: "sm", value: 100 }),
        error && (React.createElement(Typography, { variant: "Caption", color: "var(--error-main)" }, error))));
};
