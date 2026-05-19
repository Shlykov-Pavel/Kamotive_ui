import React, { FC } from 'react';

import styles from './Spinner.module.css'
import { SpinnerProps } from '../../types';;

/**
 * Компонент Spinner отображает индикатор загрузки.
 */

const spinnerSizes: { [key: string]: number } = { lg: 54, md: 34, sm: 24, xs: 8 };

export const Spinner: FC<SpinnerProps> = ({
  size = 'md',
  testId = 'default'
}) => {
  
  const spinnerSize = typeof size === 'string' ? spinnerSizes[size] : size;
  const viewBoxSize = 100;
  const strokeWidth = size==='lg' || size==='md' ? 12 : 10;
  const adjustedSize = spinnerSize + strokeWidth * 5;
  return (
    <div 
      className={styles['spinner-wrapper']} 
      style={{ 
        width: adjustedSize, 
        height: adjustedSize,
        padding: strokeWidth 
      }}
      data-test-id={`${testId}-spinner`}
    >
      <svg id="spinner" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className={styles["spinner"]} fill="none" color={'var(--blue-main)'}  data-test-id={`${testId}-spinner-svg`}>
        <defs>
          <linearGradient id="spinner-secondHalf">
            <stop offset="0%" stopOpacity="0" stopColor="currentColor"/>
            <stop offset="100%" stopOpacity="0.9" stopColor="currentColor" />
          </linearGradient>
          <linearGradient id="spinner-firstHalf">
            <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
            <stop offset="100%" stopOpacity="0.9" stopColor="currentColor" />
          </linearGradient>
        </defs>
        <g strokeWidth={strokeWidth} className={styles.spinnerRotate}>
          <path stroke="url(#spinner-secondHalf)" d="M 15 50 A 35 35 0 0 1 85 50" />
          <path stroke="url(#spinner-firstHalf)" d="M 85 50 A 35 35 0 0 1 15 50"/>
          <path stroke="currentColor" strokeLinecap="round" d="M 15 50 A 35 35 0 0 1 15 48"
           />
        </g>
      </svg>
    </div>
    )
};