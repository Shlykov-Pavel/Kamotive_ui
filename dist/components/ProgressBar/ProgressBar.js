import React, { useEffect, useState } from 'react';
import { Typography } from '../Typography/Typography';
import styles from './ProgressBar.module.css';
import classNames from 'classnames';
/**
 * Компонент ProgressBar отображает прогресс в виде заполненной полосы.
 */
export const ProgressBar = ({ value = 0, max = 100, size = 'md', showValue = true, animated = false, animationDuration = 8000, setIsLoadingFinished, width, testId = 'default' }) => {
    const [percent, setPercent] = useState(value);
    const validPercentage = Math.min(Math.max(value, 0), max);
    const progressBarClasses = classNames(styles['progress-bar'], styles[size], {
        [styles['progress-bar--animated']]: animated,
        [styles['progress-bar--static']]: !animated,
    });
    useEffect(() => {
        if (animated) {
            const targetPercent = validPercentage;
            // const animationDuration = animationDuration ?? 8000; // Длительность анимации в миллисекундах
            const stepTime = 100; // Интервал обновления в миллисекундах
            const totalSteps = animationDuration / stepTime;
            const increment = targetPercent / totalSteps;
            let currentPercent = 0;
            const intervalId = setInterval(() => {
                currentPercent = Math.min(currentPercent + increment, targetPercent);
                setPercent(Math.round(currentPercent));
                if (currentPercent >= targetPercent) {
                    clearInterval(intervalId);
                    // Вызываем callback, когда прогресс достиг 100%
                    if (setIsLoadingFinished) {
                        setIsLoadingFinished(true);
                    }
                }
            }, stepTime);
            return () => clearInterval(intervalId);
        }
        else {
            setPercent(validPercentage);
        }
    }, [animated, validPercentage, setIsLoadingFinished, animationDuration]);
    return (React.createElement("div", { className: styles['progress-bar--wrapper'], "data-test-id": `${testId}-progressbar` },
        React.createElement("progress", { id: "linear-progress", className: progressBarClasses, value: percent, max: max, style: { width: width }, "data-test-id": `${testId}-progressbar-indicator` }),
        React.createElement("label", { htmlFor: "progress", className: styles['progress-bar-percentage'], "data-test-id": `${testId}-progressbar-label` }, showValue && (React.createElement(Typography, { variant: "Body1", color: '#9CA0A7', className: styles['progress-bar-percentage'], testId: `${testId}-progressbar` },
            percent,
            "%")))));
};
