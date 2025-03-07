import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';
import { ChevronDown10 } from '../../Icons/ChevronDown/ChevronDown10';
import { ChevronUp10 } from '../../Icons/ChevronUp/ChevronUp10';
import { IconClose10 } from '../../Icons/IconClose/IconClose10';
import { IconCheck10 } from '../../Icons/IconCheck/IconCheck10';
import { DropdownProps } from 'kamotive_ui';
import { Typography } from '../Typography/Typography';

/**
 * Компонент Dropdown позволяет пользователям выбирать однин вариант из выпадающего меню
 */

export interface DropdownListItemProps {
  item: DropdownProps['options'][number];
  size: 'md' | 'lg';
  selectedItem: DropdownProps['options'][number] | null | string | number;
  style?: 'icons' | 'text';
  // onChange: (event: DropdownProps['options'][number]) => void;
  onChange: (event: React.MouseEvent<HTMLElement>, item: DropdownProps['options'][number]) => void;
  isActive?: boolean;
  activeIndex?: number;
  index?: number;
}
export const DropdownListItem: FC<DropdownListItemProps> = ({
  item,
  size = 'md',
  selectedItem,
  style,
  onChange,
  isActive,
  activeIndex,
  index,
}) => {
  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!item.disabled) {
        onChange(event, item);
      }
    },
    [item, onChange]
  );

  const itemContainerClasses = classNames(styles[`item--container`], { [styles['item--container--active']]: isActive });
  const itemClassess = classNames(styles[`item-block`], styles[`button--${size}`], {
    [styles['item-block--disabled']]: item.disabled,
    [styles['item-block--active']]: isActive,
  });
  const itemBlock = classNames(
    styles[`item-block`],
    styles[`item-block-${style}`],
    { [styles[`item-block-${style}--selected`]]: selectedItem?.value === item.value },
    { [styles['item-block--disabled']]: item.disabled }
  );

  return (
    <div className={itemContainerClasses} onClick={handleItemClick}>
      <div className={itemClassess}>
        <div className={itemBlock}>
          {style === 'icons' &&
            item.icon &&
            React.cloneElement(item.icon as React.ReactElement, {
              strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
            })}
          <div className={styles.item}>
            <span>{item?.value || item}</span>
          </div>
          {selectedItem?.value === item.value && (
            <IconCheck10 strokeWidth={size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0'} htmlColor="#0D99FF" />
          )}
        </div>
        {item.isDivider && <div className={styles.divider}></div>}
      </div>
      {item?.children && (
        <div className={styles.nestedMenu}>
          {item.children?.map((child: any, childIndex: number) => (
            <DropdownListItem
              key={child?.key ?? childIndex}
              item={child}
              size={size}
              selectedItem={selectedItem}
              onChange={onChange}
              isActive={activeIndex === index}
              activeIndex={activeIndex}
              index={childIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export const Dropdown: FC<DropdownProps> = ({
  id,
  label,
  placeholder,
  size = 'lg',
  options,
  value,
  defaultValue,
  style = 'text',
  className,
  disabled,
  readOnly = false,
  isOpened = false,
  noOptionsText = 'Нет вариатов для выбора',
  isLeftLabel = false,
  error = false,
  helperText,
  onChange,
  onClose,
  clearable = true,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(isOpened);
  const [selectedItem, setSelectedItem] = useState<DropdownProps['options'][number] | null>(
    value ?? defaultValue ?? null
  );
  const [errorInput, setErrorInput] = useState(error);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

  const ArrowIcon = !isOpen ? <ChevronDown10 /> : <ChevronUp10 />;

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      onClose?.(event);
    }
  };
  const onChangeHandler = (event: React.MouseEvent<HTMLElement>, item: DropdownProps['options'][number]) => {
    event.preventDefault();
    event.stopPropagation();
    const newEvent = {
      ...event,
      currentTarget: {
        ...event.currentTarget,
        value: item,
      },
    };

    if (selectedItem?.value !== item.value) {
      setSelectedItem(item);
      setIsOpen(false);
      onChange?.(newEvent, item);
      onClose?.(event);
    }
    if (item) {
      setErrorInput(false);
    } else if (!item) {
      setErrorInput(true);
    }
  };

  //для выбора опции из списка с клавиатуры
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(true);
        setActiveIndex(0);
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0) {
          const selectedOption = options[activeIndex];
          onChangeHandler(event as any, selectedOption);
          setIsOpen(false);
          onClose?.(event);
          setActiveIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        onClose?.(event);
        setActiveIndex(-1);
        break;
    }
  };

  //для сброса выбранного значения
  const handleReset = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setSelectedItem(defaultValue ?? null);
    setIsOpen(false);
    onChange?.(event, defaultValue ?? null);
    onClose?.(event);
    setActiveIndex(-1);
  };

  const wrapperClassess = classNames({
    [styles['dropdown--container']]: !isLeftLabel,
    [styles['dropdown--container-left']]: isLeftLabel,
    [styles['dropdown--container-label']]: label && !isLeftLabel && !required,
    [styles['dropdown--container-helperText']]: errorInput,
  });

  const buttonClassess = classNames(styles.button, className, styles[`button--${size}`], {
    [styles['button-item--selected']]: selectedItem?.value && !disabled,
    [styles['button--readOnly']]: readOnly,
    [styles['button--disabled']]: disabled,
    [styles['button--error']]: errorInput,
  });
  const dropdownClassess = classNames(styles.dropdown, className, {
    [styles['dropdown--disabled']]: disabled,
  });
  const labelClasses = classNames(styles.label, styles[size], {
    [styles['label--default']]: !isLeftLabel,
    [styles['label--left']]: isLeftLabel,
    [styles['label--required']]: required,
  });

  const selectedItemClassess = classNames({
    [styles['item-selected']]: selectedItem,
    [styles['item-placeholder']]: !selectedItem && (placeholder ?? label),
    [styles['button--icons--item-selected']]: style === 'icons' && selectedItem?.icon,
  });

  const checkItem = (item: any) => {
    if (typeof item === 'object') {
      if (item.value) {
        return item;
      } else if (item.name && !item.value) {
        return { ...item, value: item.name };
      } else if (item.description && !item.value) {
        return { ...item, value: item.description };
      } else {
        const keys = Object.keys(item);
        if (keys.length) {
          const firstValue = item[keys[0]];
          return { ...item, value: firstValue };
        }
      }
    } else if (typeof item === 'string' || typeof item === 'number') {
      return { value: item };
    } else {
      return null;
    }
  };
  const getDropdownMenu = () => {
    const menu = isOpen && (
      <div className={dropdownClassess}>
        {options.length > 0 ? (
          options.map((option, index) => {
            const modifiedItem = checkItem(option);
            return (
              <DropdownListItem
                key={option?.key ?? index}
                item={modifiedItem}
                size={size}
                selectedItem={selectedItem}
                style={style}
                onChange={onChangeHandler}
                isActive={activeIndex === index}
                activeIndex={activeIndex}
                index={index}
              />
            );
          })
        ) : (
          <div className={styles['no-options']}>{noOptionsText}</div>
        )}
      </div>
    );
    return isOpen ? menu : null;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.(event);
      }
    };
    if (containerRef.current) {
      const text = label ?? placeholder ?? '';
      let newWidth;
      if (!isLeftLabel) {
        const textWidth = Math.max((text || '').length, (selectedItem?.value?.toString() || '').length);
        const inPixel = size === 'lg' ? 11 : 9;
        newWidth = textWidth * inPixel;
      } else {
        const inPixel = size === 'lg' ? 11 : 9;
        newWidth = (text.length + selectedItem?.value?.toString().length) * inPixel + 20;
      }
      setContainerWidth(newWidth);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedItem, label, isOpen, size]);

  useEffect(() => {
    if (value) {
      setSelectedItem(value);
    }
  }, [value]);

  return (
    <div
      id={id}
      className={wrapperClassess}
      ref={containerRef}
      style={{ width: isLeftLabel && containerWidth ? `${containerWidth}px` : '100%' }}
    >
      {label && (
        <Typography variant="Caption" className={labelClasses}>
          {label}
        </Typography>
      )}
      <button
        className={buttonClassess}
        onClick={readOnly ? undefined : handleToggle}
        disabled={disabled}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className={selectedItemClassess}>
          {style === 'icons' &&
            selectedItem?.icon &&
            React.cloneElement(selectedItem.icon as React.ReactElement, {
              strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
            })}
          {selectedItem ? selectedItem.value : (placeholder ?? label)}
        </div>

        {clearable && !readOnly && !disabled && selectedItem && (
          <div className={styles.resetButton}>
            <IconClose10 strokeWidth="0.2" htmlColor="var(--text-light)" onClick={handleReset} />
          </div>
        )}
        {ArrowIcon &&
          React.cloneElement(ArrowIcon as React.ReactElement, {
            strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
          })}
        {getDropdownMenu()}
      </button>
      {errorInput && helperText && (
        <Typography variant="Caption" className={classNames(styles.helperText, styles[size])}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};
