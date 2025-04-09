import React, { FC, MouseEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './ListItem.module.css';
import { ListItemProps } from '../../types';
import { Typography } from '../Typography/Typography';
import { Checkbox } from '../Checkbox/Checkbox';
import { RadioButton } from '../RadioButton/RadioButton';

export const ListItem: FC<ListItemProps> = ({
  id,
  onClick,
  onCheck,
  onRadioSelect,
  checked = false,
  selected = false,
  label,
  style,
  className,
  withCheckbox = false,
  checkboxColor,
  withRadioButton = false,
  customBullet,
  bulletClassName,
  children,
  parentChecked,
}) => {
  const [isChecked, setIsChecked] = useState(checked || parentChecked);
  const itemClassNames = classNames(className, styles.listItem);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const handleCheckboxClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (id && onCheck) {
      onCheck(id, newCheckedState);
    }
  };

  const handleRadioClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    if (id && onRadioSelect) {
      onRadioSelect(id);
    }
  };

  useEffect(() => {
    setIsChecked(parentChecked || checked);
  }, [parentChecked, checked]);

  return (
    <div className={itemClassNames} style={style} onClick={handleClick}>
      {withCheckbox && (
        <span className={styles.icon} onClick={handleCheckboxClick}>
          <Checkbox checked={isChecked} color={checkboxColor} />
        </span>
      )}
      {withRadioButton && (
        <span className={styles.icon} onClick={handleRadioClick}>
          <RadioButton checked={selected} value={id} />
        </span>
      )}
      {customBullet && <span className={bulletClassName}>{customBullet}</span>}
      <Typography variant="Body1">{label}</Typography>
      {children}
    </div>
  );
};
