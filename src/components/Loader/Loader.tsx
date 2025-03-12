import React, { FC } from 'react';

import { LoaderProps } from 'kamotive_ui';
import styles from './Loader.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
import { IconFile } from '../../Icons/IconFile/IconFile';
import { ProgressBar } from '../ProgressBar/ProgressBar';

export const Loader: FC<LoaderProps> = ({ name, size = 0, loading = false, error = '', onClick }) => {
  return (
    <div className={`${styles['loader']} ${error ? styles['error'] : ''}`}>
      <div className={styles['loaderFile']}>
        <div className={styles['loaderInfo']}>
          <div className={styles['loaderIcon']}>
            <IconFile htmlColor={"var(--icons-grey)"} />
          </div>

          <div className={styles['loaderName']}>
            <Typography variant="Body2-Medium" color="var(--text-dark)">
              {name}
            </Typography>
            {size !==0 && <Typography variant="Caption" color="var(--grey-medium)">
              {`${(size/(1024)).toFixed(1)} кБ`}
            </Typography> }
          </div>
        </div>
        <button type="button" aria-label="Закрыть" title="Удалить файл" onClick={onClick} />
      </div>

      {loading && <ProgressBar animated size="sm" value={100} />}
      {error && (
        <Typography variant="Caption" color="var(--error-main)">
          {error}
        </Typography>
      )}
    </div>
  );
};
