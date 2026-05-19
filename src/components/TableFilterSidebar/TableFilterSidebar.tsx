import React, { FC, ReactNode } from 'react';
import styles from './TableFilterSidebar.module.css';

import classNames from 'classnames';
import { Spinner } from '../Spinner/Spinner';
import { IconButton } from '../IconButton/IconButton';
import { IconClose } from '../../Icons/IconClose/IconClose';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import { TableFilterSidebarProps } from '../../types';

export const TableFilterSidebar: FC<TableFilterSidebarProps> = ({ 
    open, 
    onClose,
    children,
    lng = 'ru',
    onReset,
    onApply,
    isResetDisabled,
    isApplyDisabled,
    style, 
    className,
    isLoading,
    width = '340px',
    zIndex = 10000, 
    top = 0,
    right = 0,
    testId = 'default'
  }
) => {  
  if (!open) return null;
  
  const childrenArray = React.Children.toArray(children);
  const baseWidthNumber = parseInt(String(width), 10) || 340;
  const gap = 5;
  const columnsCount = Math.ceil(childrenArray.length / 4);
  
  // const sidebarWidth = `${baseWidthNumber * columnsCount + (columnsCount - 1) * gap}px`;
  const sidebarWidth = `${(baseWidthNumber * columnsCount) + (gap * (columnsCount - 1)) + 80}px`;
  const isGrid = columnsCount > 1;

  return (
   <>
      {/* Затемнение фона */}
      <div className={styles.overlay} onClick={onClose} style={{ zIndex }} />
      
      <aside
        className={classNames(styles.sidebar, open && styles.open, className)}
        style={{ 
          width: sidebarWidth, 
          gap: `${gap + 5}px`, 
          zIndex: zIndex + 1, 
          top: `${top}px`, 
          right: `${right}px`,
          ...style}}
        data-test-id={`${testId}-filter-modal`}
      >
        <div className={styles.header} data-test-id={`${testId}-filter-header`}>
          <Typography variant='Body1-SemiBold' style={{color:'var(--text-dark)'}} testId={`${testId}-filter`}>{lng === 'ru' ? 'Фильтры' : 'Filters'} </Typography>
          <IconButton
            title={lng === 'ru' ? 'Закрыть' : 'Close'} 
            onClick={onClose} 
            icon={<IconClose />} 
            color="var(--icons-grey)" 
            className={styles.closeBtn}
            testId={`${testId}-filter`}
          />
        </div>
        <div className={styles.content} data-test-id={`${testId}-filter-content`}>
          {isLoading ? (
            <div className={styles.loaderWrapper}><Spinner testId={`${testId}-filter`}/></div>
          ) : (
            <div 
              style={{ 
                display: 'grid', 
                gap: `${gap}px ${gap+10}px`, 
                gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))` 
              }}
              data-test-id={`${testId}-filters-list`}
            >
              {childrenArray.map((child, index) => (
                <div 
                  key={index} 
                  style={{ 
                    minWidth: 0,      
                    width: '100%', 
                  }}
                  data-test-id={`${testId}-filter-item-${index}`}
                >
                  {child}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.buttons}>
        {onReset &&  <Button label={lng === 'ru' ? 'Сбросить' : 'Reset'} variant='outline' onClick={onReset}  disabled={isResetDisabled || isLoading} testId={`${testId}-filter-reset`}/>}
        {onApply &&  <Button label={lng === 'ru' ? 'Применить' : 'Apply'} onClick={onApply} disabled={isApplyDisabled || isLoading} testId={`${testId}-filter-apply`}/>}
        </div>
      </aside>
    </>
  );
};
