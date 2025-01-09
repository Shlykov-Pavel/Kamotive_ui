import React, { FC, useEffect, useState } from 'react';

import styles from './ProgressLoader.module.css';
import { Typography } from '../Typography/Typography';
import classNames from 'classnames';
import { ProgressLoaderProps } from 'kamotive_ui';

/**
 * Компонент ProgressLoader отображает прогресс загрузки.
 */
const spinnerSizes: { [key: string]: number } = { xl: 89, lg: 56, md: 40, sm: 34 };
const animationDuration = 4000; // Длительность анимации в миллисекундах
const stepTime = 100; // Интервал обновления в миллисекундах

export const ProgressLoader: FC<ProgressLoaderProps> = ({
  value = 0,
  size = 'xl',
  showValue = true,
  animated = false,
}) => {
  const [percent, setPercent] = useState(value);
  const spinnerSize = typeof size === 'string' ? spinnerSizes[size] : size;

  const validPercentage = Math.min(Math.max(value, 0), 100);
  const fillPercentage = validPercentage / 100;
  // Константы и расчеты для SVG
  const viewBoxSize = 100;
  const desiredStrokeWidth = size === 'xl' || size === 'lg' ? 5 : 4; // Желаемая толщина линии в пикселях
  const strokeWidth = (desiredStrokeWidth * viewBoxSize) / spinnerSize;
  const radius = (viewBoxSize - strokeWidth) / 2;
  const center = viewBoxSize / 2;
  //const fillPercentage = Math.min(1, Math.max(0, value / 100));
  const circumference = 2 * Math.PI * radius;
  const dashArray = circumference;

  const dashOffset = circumference * (1 - fillPercentage);

  const progressLoaderWrapperClasses = classNames(styles['progress-loader-wrapper'], styles[size]);

  const getTypographySize = () => {
    switch (size) {
      case 'md':
        return '12px';
      case 'lg':
        return '16px';
      case 'xl':
        return '24px';
    }
  };

  useEffect(() => {
    if (animated) {
      const targetPercent = validPercentage;
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
    } else {
      setPercent(validPercentage);
    }
  }, [animated, validPercentage]);

  return (
    <div className={progressLoaderWrapperClasses} style={{ width: spinnerSize, height: spinnerSize }}>
      <svg id="svg1" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className={styles['progress-loader']}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e5e5ea"
          strokeWidth={strokeWidth}
          fill="none"
          style={{ strokeLinecap: 'round' }}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={'var(--blue-main)'}
          strokeWidth={strokeWidth}
          fill="none"
          style={{
            strokeDasharray: `${dashArray}`,
            strokeDashoffset: `${dashOffset}`,
            strokeLinecap: 'round',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            //transition: animated ? 'stroke-dashoffset 0.5s ease-in-out' : 'none',
          }}
        >
          {animated && (
            <animate
              attributeName="stroke-dashoffset"
              dur={`${animationDuration / 1000}`}
              values={`${circumference}; ${percent / 100}`}
              fill="freeze"
            />
          )}
        </circle>
      </svg>
      {showValue && size !== 'sm' && (
        <div className={styles['progress-percentage']}>
          <Typography
            variant="Subheading2"
            color={'#9CA0A7'}
            style={{ fontSize: getTypographySize(), fontWeight: '300' }}
            className={styles['progress-percentage']}
          >
            {percent}%
          </Typography>
        </div>
      )}
    </div>
  );
};
