import React, { FC } from 'react';
import styles from './Welcome.module.css';

export const WelcomePage = () => {
  return (
    <div >
      <h1 className={styles.h1}>Дизайн-система Kamotive</h1>
        <body className={styles.body}>Набор компонентов, инструментов и правил, которые упрощают создание, а также визуальное и техническое
            обновление продуктов Kamotive.    
        </body>
    </div>
  );
};
