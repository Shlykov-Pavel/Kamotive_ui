import React, { FC, useState, MouseEvent, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './List.module.css';
import { ListItemProps, ListProps } from '../../types';
import { Typography } from '../Typography/Typography';
import { Checkbox } from '../Checkbox/Checkbox';
import { RadioButton } from '../RadioButton/RadioButton';
import { ChevronDown } from '../../Icons';
import { ListItem } from '../ListItem/ListItem';

export const List: FC<ListProps> = ({
  onClick,
  onCheck,
  onRadioSelect,
  checked = false,
  selected = false,
  disabled = false,
  label,
  id,
  style,
  className,
  collapsible = false,
  open = false,
  withCheckbox = false,
  checkboxColor,
  checkboxFilled,
  withRadioButton = false,
  customBullet,
  customItemBullet,
  bulletClassName,
  titleContent,
  children,
  isHeader = false,
  parentChecked = false,
  testId = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(open);
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

    if (onCheck) {
      onCheck(id || '', newCheckedState);
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

  const headerClassNames = classNames(styles.header, className);

  const contentClassNames = classNames(
    styles.content,
    isOpen ? styles['content--expanded'] : styles['content--collapsed']
  );

  return (
    <div className={styles.collapsibleList} data-test-id={`${testId}-list`}>
      {label || titleContent && (
        <div className={headerClassNames} onClick={handleClick} style={style} data-test-id={`${testId}-list-header`}>
          {!isHeader && (
            <div>
              {withCheckbox && (
                <span onClick={handleCheckboxClick} data-test-id={`${testId}-list-chechbox-block`}>
                  <Checkbox checked={isChecked} color={checkboxColor} filled={checkboxFilled} disabled={disabled} testId={`${testId}-list`}/>
                </span>
              )}
              {withRadioButton && (
                <span onClick={handleRadioClick} data-test-id={`${testId}-list-radio-block`}>
                  <RadioButton checked={selected} value={id} disabled={disabled} testId={`${testId}-list`}/>
                </span>
              )}
              {customBullet && <span className={classNames(styles.bullet, bulletClassName)} data-test-id={`${testId}-list-bullet`}>{customBullet}</span>}
            </div>
          )}
          {label && <Typography variant="Body1" testId={`${testId}-list`}>{label}</Typography>}
          {titleContent}
          {collapsible && (
            <span className={styles.indicator} data-test-id={`${testId}-list-action-icon`}>{isOpen ? <ChevronDown /> : <ChevronDown rotation={270} />}</span>
          )}
        </div>
      )}

      <div className={collapsible ? contentClassNames : styles.content} style={{ paddingLeft: !label ? 0 : '16px' }} data-test-id={`${testId}-list-content-block`}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const childTestId = (child.props as any).testId || `${testId}-list-${index}`;
            const commonProps = {
              style: child.props.style || style,
              className: child.props.className,
              testId: childTestId,
            };

            if (child.type === ListItem || child.type === List) {
              return React.cloneElement(child, {
                ...commonProps,
                bulletClassName: classNames(styles.bullet, child.props.bulletClassName || bulletClassName),
                customBullet:
                  child.props.customBullet !== undefined
                    ? child.props.customBullet
                    : customItemBullet !== undefined
                      ? customItemBullet
                      : customBullet,
                withCheckbox: child.props.withCheckbox !== undefined ? child.props.withCheckbox : withCheckbox,
                checkboxFilled: child.props.checkboxFilled !== undefined ? child.props.checkboxFilled : checkboxFilled,
                withRadioButton:
                  child.props.withRadioButton !== undefined ? child.props.withRadioButton : withRadioButton,
                onCheck: handleChildCheck,
                onRadioSelect: handleChildRadioSelect,
                parentChecked: isChecked,
                selected: child.props.selected,
              });
            }

            return React.cloneElement(child, commonProps);
          }
          return child;
        })}
      </div>
    </div>
  );
};
