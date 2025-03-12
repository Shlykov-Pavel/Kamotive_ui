import React, { useEffect, useState } from 'react';
import { Typography } from '../Typography/Typography';
import styles from './ProgressBar.module.css';
import classNames from 'classnames';
;
/**
 * Компонент ProgressBar отображает прогресс в виде заполненной полосы.
 */
export const ProgressBar = ({ value = 0, max = 100, size = 'md', showValue = true, animated = false, }) => {
    const [percent, setPercent] = useState(value);
    const validPercentage = Math.min(Math.max(value, 0), max);
    const progressBarClasses = classNames(styles['progress-bar'], styles[size], {
        [styles['progress-bar--animated']]: animated,
        [styles['progress-bar--static']]: !animated,
    });
    useEffect(() => {
        if (animated) {
            const targetPercent = validPercentage;
            const animationDuration = 8000; // Длительность анимации в миллисекундах
            const stepTime = 100; // Интервал обновления в миллисекундах
            const totalSteps = animationDuration / stepTime;
            const increment = targetPercent / totalSteps;
            let currentPercent = 0;
            const intervalId = setInterval(() => {
                currentPercent = Math.min(currentPercent + increment, targetPercent);
                setPercent(Math.round(currentPercent));
                if (currentPercent >= targetPercent) {
                    clearInterval(intervalId);
                }
            }, stepTime);
            return () => clearInterval(intervalId);
        }
        else {
            setPercent(validPercentage);
        }
    }, [animated, validPercentage]);
    return (React.createElement("div", { className: styles["progress-bar--wrapper"] },
        React.createElement("progress", { id: "linear-progress", className: progressBarClasses, value: percent, max: max }),
        React.createElement("label", { htmlFor: "progress", className: styles["progress-bar-percentage"] }, showValue && (React.createElement(Typography, { variant: "Subheading3", color: '#9CA0A7', style: { fontWeight: '300' }, className: styles["progress-bar-percentage"] },
            percent,
            "%")))));
};
