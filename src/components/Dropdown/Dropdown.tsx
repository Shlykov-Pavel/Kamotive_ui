import React, { FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';
import { ChevronDown10 } from '../../Icons/ChevronDown/ChevronDown10';
import { ChevronUp10 } from '../../Icons/ChevronUp/ChevronUp10';
import { IconClose10 } from '../../Icons/IconClose/IconClose10';
import { IconCheck10 } from '../../Icons/IconCheck/IconCheck10';
import { DropdownProps, TOptions } from '../../types';;
import { Typography } from '../Typography/Typography';

/**
 * Компонент Dropdown позволяет пользователям выбирать однин вариант из выпадающего меню
 */

export interface DropdownListItemProps {
  item: TOptions | null;
  getOptionLabel?: ((option: TOptions) => string);
  size: 'md' | 'lg';
  selectedItem: TOptions | null;
  style?: 'icons' | 'text';
  onChange: (event: React.MouseEvent<HTMLElement>, item: TOptions | null) => void;
  isActive?: boolean;
  activeIndex?: number;
  index?: number;
}

function checkItem(
  item: string | number | TOptions,
  getOptionLabel?: ((option: TOptions) => string),
  disabled?: boolean,
  isDivider?: boolean,
) {
  if (typeof item === 'object' && item !== null) {
    //проверка на вложенные объекты с таким же типом
    Object.keys(item as TOptions).forEach((key) => {
      const value = (item as TOptions)[key as keyof TOptions];
      if (typeof value === 'object' && value !== null && !React.isValidElement(value)) {
      const nestedItem = checkItem(value as TOptions, getOptionLabel, disabled, isDivider) as TOptions;
      if (nestedItem) {
        if (!item.children) {
          item.children = [];
        }
        item.children.push(nestedItem);
        delete (item as any)[key];
      }
    }
  });

  // проверка на наличие пользовательского поля для вывода(передаваемой функции getOptionLabel)
    if(getOptionLabel){
      return { 
        ...item, 
        value: getOptionLabel(item), 
        disabled: disabled ?? false, 
        isDivider: isDivider ?? false,  
      };
    }
    if ('value' in item) {
      return { 
        ...item, 
        disabled: disabled ?? false, 
        isDivider: isDivider ?? false,
      };
    } else if ('name' in item && !('value' in item)) {
      return { 
        ...item, 
        value: item.name, 
        disabled: disabled ?? false, 
        isDivider: isDivider ?? false ,
      };
    } else if ('description' in item && !('value' in item)) {
      return { 
        ...item, 
        value: item.description, 
        disabled: disabled ?? false, 
        isDivider: isDivider ?? false,
      };
    } 
    else {
      const keys = Object.keys(item) as Array<keyof typeof item>;
      if (keys.length) {
        const firstValue = item[keys[0]];
        return { 
          ...item, 
          value: firstValue, 
          disabled: disabled ?? false, 
          isDivider: isDivider ?? false,
        };
      }
    }
  } else if (typeof item === 'string' || typeof item === 'number') {
    return { value: item, disabled: disabled ?? false, isDivider: isDivider ?? false };
  } else {
    return null;
  }
}

export const DropdownListItem: FC<DropdownListItemProps> = ({
  item,
  getOptionLabel,
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
      if (!item?.disabled) {
        onChange(event, item);
      }
    },
    [item, onChange]
  );

  const itemContainerClasses = classNames(styles[`item--container`], { [styles['item--container--active']]: isActive });
  const itemClassess = classNames(styles[`item-block`], styles[`button--${size}`], {
    [styles['item-block--disabled']]: item?.disabled,
    [styles['item-block--active']]: isActive,
  });
  const itemBlock = classNames(
    styles[`item-block`],
    styles[`item-block-${style}`],
    { [styles[`item-block-${style}--selected`]]: selectedItem?.value === item?.value },
    { [styles['item-block--disabled']]: item?.disabled }
  );

  return (
    <div className={itemContainerClasses} onClick={handleItemClick}>
      <div className={itemClassess}>
        <div className={itemBlock}>
          {style === 'icons' &&
            item?.icon &&
            React.cloneElement(item.icon as React.ReactElement, {
              strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
            })}
          <div className={styles.item}>
            <span>{item?.value}</span>
          </div>
          {selectedItem?.value === item?.value && (
            <IconCheck10 strokeWidth={size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0'} htmlColor="#0D99FF" />
          )}
        </div>
        {item?.isDivider && <div className={styles.divider}></div>}
      </div>
      {item?.children && (
        <div className={styles.nestedMenu}>
          {item.children?.map((child: any, childIndex: number) => {
            return (
              <DropdownListItem
                key={child?.key ?? childIndex}
                item={child}
                getOptionLabel={getOptionLabel}
                size={size}
                selectedItem={selectedItem}
                onChange={onChange}
                isActive={activeIndex === index}
                activeIndex={activeIndex}
                index={childIndex}
              />
            );
          })}
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
  getOptionLabel,
  value,
  defaultValue,
  style = 'text',
  className,
  disabled = false,
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
  isDivider = false,
}) => {
  
  const [isOpen, setIsOpen] = useState(isOpened);
  const [modifiedOptions, setModifiedOptions] = useState<TOptions[] | null>([]);
  const [selectedItem, setSelectedItem] = useState<TOptions | null>(null);
  const [errorInput, setErrorInput] = useState(false);
  const [errorInputHelperText, setErrorInputHelperText] = useState(helperText);
  const [activeIndex, setActiveIndex] = useState(-1);
  

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      onClose?.(event);
    }
  };
  const onChangeHandler = (event: React.MouseEvent<HTMLElement>, item: TOptions | null) => {
    event.preventDefault();
    event.stopPropagation();
    const newEvent = {
      ...event,
      currentTarget: {
        ...event.currentTarget,
        value: item,
      },
    };

    if (selectedItem?.value !== item?.value) {
      setSelectedItem(item);
      setIsOpen(false);
      onChange?.(newEvent, item);
      onClose?.(event);
    }
    if (item) {
      setErrorInput(false);
    } else {
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
        modifiedOptions && setActiveIndex((prev) => (prev < modifiedOptions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0) {
          const selectedOption = modifiedOptions && modifiedOptions[activeIndex];
          onChangeHandler(event as any, selectedOption);
          setIsOpen(false);
          onClose?.(event as any);
          setActiveIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        onClose?.(event as any);
        setActiveIndex(-1);
        break;
    }
  };
  //для сброса выбранного значения
  const handleReset = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    const startValue = defaultValue 
      ? (checkItem(defaultValue) as TOptions) 
      : null;
    setSelectedItem(startValue ?? null);
    setIsOpen(false);
    onChange?.(event, startValue ?? null);
    onClose?.(event);
    setActiveIndex(-1);
    if(required) {
      setErrorInput(true);
      setErrorInputHelperText(helperText ?? 'Поле обязательно для заполнения');
    }
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
    [styles['item-placeholder']]: !selectedItem && ((placeholder ?? label) || (!placeholder && !label)),
    [styles['button--icons--item-selected']]: style === 'icons' && selectedItem?.icon,
  });

  const getDropdownMenu = () => {
    const menu = isOpen && (
      <div className={dropdownClassess}>
        {modifiedOptions && modifiedOptions.length > 0 ? (
          modifiedOptions.map((modifiedOption, index) => {
            return (
              <DropdownListItem
                key={modifiedOption?.key ?? index}
                item={modifiedOption}
                getOptionLabel={getOptionLabel}
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
        onClose?.(event as any);
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
        const selectedValue = selectedItem?.value?.toString() || '';
        newWidth = (text.length + selectedValue.length) * inPixel + 40;
      }
      setContainerWidth(newWidth);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedItem, label, isOpen, size, placeholder, onClose, isLeftLabel]);

  useEffect(()=>{
    if (options) {
      const modifiedOptions = options.map((option, index) => { 
        const modifiedOption = checkItem?.(option, getOptionLabel, disabled, isDivider) as TOptions;
        if (modifiedOption && modifiedOption.value === selectedItem?.value) {
          setActiveIndex(index);
        }
        return modifiedOption;
      });  
      setModifiedOptions(modifiedOptions);
    }
  }, [options]);

  useEffect(() => {
    if (value || defaultValue) {
      const startValue = value 
        ? (checkItem(value) as TOptions) 
        : defaultValue 
          ? (checkItem(defaultValue) as TOptions) 
          : null;
      setSelectedItem(startValue ?? null);
    } else {
      setSelectedItem(null);
    }
  }, [value, defaultValue, checkItem]);

  useEffect(()=>{
    setErrorInput(error);
  }, [error])
  
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
          {selectedItem ? selectedItem.value : (placeholder ?? label ?? 'Выберите значение')}
        </div>

        {clearable && !readOnly && !disabled && selectedItem && (
          <div className={styles.resetButton}>
            <IconClose10 strokeWidth="0.2" htmlColor="var(--text-light)" onClick={handleReset} />
          </div>
        )}
        <div className={styles.dropdownIcon}>
          {!isOpen ? (
            <ChevronDown10 strokeWidth={size === 'lg' ? '0.5' : '0.3'} />
          ) : (
            <ChevronUp10 strokeWidth={size === 'lg' ? '0.5' : '0.3'} />
          )}
        </div>
        {getDropdownMenu()}
      </button>
      {errorInput && errorInputHelperText && (
        <Typography variant="Caption" className={classNames(styles.helperText, styles[size])}>
          {helperText ?? errorInputHelperText}
        </Typography>
      )}
    </div>
  );
};