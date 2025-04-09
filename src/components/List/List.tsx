import React, { FC, useState, MouseEvent, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './List.module.css';
import { ListItemProps, ListProps } from '../../types';
import { Typography } from '../Typography/Typography';
import { Checkbox } from '../Checkbox/Checkbox';
import { RadioButton } from '../RadioButton/RadioButton';
import { ChevronDown10 } from '../../Icons';

export const List: FC<ListProps> = ({
  onClick,
  onCheck,
  onRadioSelect,
  checked = false,
  selected = false,
  label,
  id,
  collapsible = false,
  withCheckbox = false,
  checkboxColor,
  withRadioButton = false,
  customBullet,
  customItemBullet,
  bulletClassName,
  children,
  isHeader = false,
  parentChecked = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(checked || parentChecked);

  const childIds: string[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<ListItemProps | ListProps>(child) && child.props.id) {
      childIds.push(child.props.id);
    }
  });

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (collapsible) {
      setIsOpen(!isOpen);
    }

    if (onClick) {
      onClick();
    }
  };

  const handleChildCheck = (childId: string | string[], isChecked: boolean) => {
    if (onCheck) {
      onCheck(childId, isChecked);
    }
  };

  const handleChildRadioSelect = (childId: string) => {
    if (onRadioSelect) {
      onRadioSelect(childId);
    }
  };

  const handleCheckboxClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (id && onCheck) {
      onCheck(id, newCheckedState);
    }

    if (childIds.length > 0 && onCheck) {
      childIds.forEach((childId) => {
        onCheck(childId, newCheckedState);
      });
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

  const headerClassNames = classNames(styles.header);

  const contentClassNames = classNames(
    styles.content,
    isOpen ? styles['content--expanded'] : styles['content--collapsed']
  );

  return (
    <div className={styles.collapsibleList}>
      {label && (
        <div className={headerClassNames} onClick={handleClick}>
          {!isHeader && (
            <div>
              {withCheckbox && (
                <span onClick={handleCheckboxClick}>
                  <Checkbox checked={isChecked} color={checkboxColor} />
                </span>
              )}
              {withRadioButton && (
                <span onClick={handleRadioClick}>
                  <RadioButton checked={selected} value={id} />
                </span>
              )}
              {customBullet && <span className={classNames(styles.bullet, bulletClassName)}>{customBullet}</span>}
            </div>
          )}
          <Typography variant="Body1">{label}</Typography>
          {collapsible && (
            <span className={styles.indicator}>{isOpen ? <ChevronDown10 /> : <ChevronDown10 rotation={270} />}</span>
          )}
        </div>
      )}

      <div className={collapsible ? contentClassNames : styles.content} style={{ paddingLeft: !label ? 0 : '16px' }}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              bulletClassName: classNames(styles.bullet, child.props.bulletClassName || bulletClassName),
              customBullet:
                child.props.customBullet !== undefined
                  ? child.props.customBullet
                  : customItemBullet !== undefined
                    ? customItemBullet
                    : customBullet,
              withCheckbox: child.props.withCheckbox !== undefined ? child.props.withCheckbox : withCheckbox,
              withRadioButton:
                child.props.withRadioButton !== undefined ? child.props.withRadioButton : withRadioButton,
              onCheck: handleChildCheck,
              onRadioSelect: handleChildRadioSelect,
              parentChecked: isChecked,
              selected: child.props.selected,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};
