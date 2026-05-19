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
  disabled = false,
  label,
  style,
  className,
  withCheckbox = false,
  checkboxColor,
  checkboxFilled,
  withRadioButton = false,
  customBullet,
  bulletClassName,
  children,
  parentChecked,
  testId = 'default'
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

    if (onCheck) {
      onCheck(id || "", newCheckedState);
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
    <div className={itemClassNames} style={style} onClick={handleClick} data-test-id={`${testId}-item-block`}>
      {withCheckbox && (
        <span className={styles.icon} onClick={handleCheckboxClick} data-test-id={`${testId}-item-checkbox-block`}>
          <Checkbox checked={isChecked} color={checkboxColor} filled={checkboxFilled} disabled={disabled} testId={`${testId}-item`}/>
        </span>
      )}
      {withRadioButton && (
        <span className={styles.icon} onClick={handleRadioClick} data-test-id={`${testId}-item-radio-block`}>
          <RadioButton checked={selected} value={id} disabled={disabled} testId={`${testId}-item`}/>
        </span>
      )}
      {customBullet && <span className={bulletClassName} data-test-id={`${testId}-item-bullet`}>{customBullet}</span>}
      <Typography variant="Body1" testId={`${testId}-item`}>{label}</Typography>
      {children}
    </div>
  );
};
