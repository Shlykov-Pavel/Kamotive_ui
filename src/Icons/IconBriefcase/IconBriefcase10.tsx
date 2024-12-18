import React, { FC } from 'react';
import styles from '../Icons.module.css'



export const IconBriefcase10: FC<{ color?: string; htmlColor?: string }> = ({ color = 'inherit', htmlColor }) => {

 return (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.icon} ${color && styles[color]}`}>
 <path fill={htmlColor || 'currentColor'} d="M5,7H8V5L10,3H13L15,5V7H18C19.66,7 21,8.34 21,10V18C21,19.66 19.66,21 18,21H5C3.34,21 2,19.66 2,18V10C2,8.34 3.34,7 5,7M10.41,4L9,5.41V7H14V5.41L12.59,4H10.41M5,8C3.9,8 3,8.9 3,10V18C3,19.1 3.9,20 5,20H18C19.1,20 20,19.1 20,18V10C20,8.9 19.1,8 18,8H5Z" />
 </svg>
 );
};
