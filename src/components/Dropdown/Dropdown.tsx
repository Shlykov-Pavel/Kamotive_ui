import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
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
  variant?: 'icons' | 'text';
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
     const itemCopy = { ...item };
    //проверка на вложенные объекты с таким же типом
    Object.keys(itemCopy as TOptions).forEach((key) => {
      const value = (itemCopy as TOptions)[key as keyof TOptions];
      if (typeof value === 'object' && value !== null && !React.isValidElement(value)) {
      const nestedItem = checkItem(value as TOptions, getOptionLabel, disabled, isDivider) as TOptions;
      if (nestedItem) {
        if (!itemCopy.children) {
          itemCopy.children = [];
        }
        itemCopy.children.push(nestedItem);
        delete (itemCopy as any)[key];
      }
    }
  });

  // проверка на наличие пользовательского поля для вывода(передаваемой функции getOptionLabel)
    if(getOptionLabel){
      return { 
        ...itemCopy, 
        value: getOptionLabel(itemCopy), 
        disabled: disabled ?? false, 
        isDivider: isDivider ?? false,  
      };
    }
    if ('value' in itemCopy) {
      return { 
        ...itemCopy, 
        disabled: disabled ?? false, 
        isDivider: isDivider ?? false,
      };
    } else if ('name' in itemCopy && !('value' in itemCopy)) {
      return { 
        ...itemCopy, 
        value: itemCopy.name, 
        disabled: disabled ?? false, 
        isDivider: isDivider ?? false ,
      };
    } else if ('description' in itemCopy && !('value' in itemCopy)) {
      return { 
        ...itemCopy, 
        value: itemCopy.description, 
        disabled: disabled ?? false, 
        isDivider: isDivider ?? false,
      };
    } 
    else {
      const keys = Object.keys(itemCopy) as Array<keyof typeof itemCopy>;
      if (keys.length) {
        const firstValue = itemCopy[keys[0]];
        return { 
          ...itemCopy, 
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
  variant,
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
    styles[`item-block-${variant}`],
    { [styles[`item-block-${variant}--selected`]]: selectedItem?.value === item?.value },
    { [styles['item-block--disabled']]: item?.disabled }
  );

  return (
    <div className={itemContainerClasses} onClick={handleItemClick}>
      <div className={itemClassess}>
        <div className={itemBlock}>
          {variant === 'icons' &&
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
  options,
  id,
  label,
  placeholder,
  required = false,
  value,
  defaultValue,
  onChange,
  getOptionLabel,
  variant = 'text',
  size = 'lg',
  style,
  className,
  isLeftLabel = false,
  isDivider = false,
  disabled = false,
  readOnly = false,
  isOpened = false,
  error = false,
  helperText,
  onClick,
  onBlur,
  onFocus,
  onClose,
  clearable = true,
  enableAutocomplete = false,
  noOptionsText = 'Нет вариантов для выбора',
}) => {
  
  const [isOpen, setIsOpen] = useState(isOpened);
  const [modifiedOptions, setModifiedOptions] = useState<TOptions[] | null>([]);
  const [selectedItem, setSelectedItem] = useState<TOptions | null>(null);
  const [errorInput, setErrorInput] = useState(false);
  const [errorInputHelperText, setErrorInputHelperText] = useState(helperText);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<TOptions[] | null>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

  const wrapperClassess = classNames(className, {
    [styles['dropdown--container']]: !isLeftLabel,
    [styles['dropdown--container-left']]: isLeftLabel,
    [styles['dropdown--container-label']]: label && !isLeftLabel && !required,
    [styles['dropdown--container-helperText']]: errorInput,
  });
  const buttonClassess = classNames(styles.button, styles[`button--${size}`], {
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
    [styles['button--icons--item-selected']]: variant === 'icons' && selectedItem?.icon,
  });

  // обновляет значения searchValue и filteredOptions
  const setAutocompleteValues = (value: string) => {
    setSearchValue(value);

    // фильтрация по введенному значению
    if (modifiedOptions && modifiedOptions.length > 0) {
      const filtered = modifiedOptions.filter((option) => {
        if (!option || !option.value) return false;
        const optionValue = String(option.value).toLowerCase();
        return optionValue.includes(value.toLowerCase());
      });
      
      setFilteredOptions(filtered);
      setActiveIndex(filtered && filtered.length > 0 ? 0 : -1);
    }
  }

  const handleToggle = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen && enableAutocomplete) {
      const value = selectedItem?.value ? selectedItem?.value.toString() : searchValue
      setSearchValue(value);
      setFilteredOptions(modifiedOptions);
      
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    } else if (!newIsOpen) {
      onClose?.(event);
    }
  }, [isOpen, enableAutocomplete, searchValue, selectedItem, modifiedOptions, onClose]);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const value = event.target.value;
    setAutocompleteValues(value);
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

    if (enableAutocomplete && 
        event.target instanceof HTMLInputElement && 
        (event.key !== 'ArrowDown' && 
        event.key !== 'ArrowUp' && 
        event.key !== 'Enter' && 
        event.key !== 'Escape')) {
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

    if (!enableAutocomplete) {
      setIsOpen(false);
    }

    setSearchValue("");
    setFilteredOptions(modifiedOptions);
    onChange?.(event, startValue ?? null);
    onClose?.(event);
    setActiveIndex(-1);
    
    if(required) {
      setErrorInput(true);
      setErrorInputHelperText(helperText ?? 'Поле обязательно для заполнения');
    }
  };

  const getTextField = () => {
    return (
      <div className={selectedItemClassess}>
        {variant === 'icons' &&
          selectedItem?.icon &&
          React.cloneElement(selectedItem.icon as React.ReactElement, {
            strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
          })}
        {isOpen && enableAutocomplete ? (
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            className={styles.inlineSearchInput}
            onChange={handleSearchChange}
            placeholder={selectedItem?.value ? selectedItem.value.toString() : 'Поиск...'}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClick?.(e);
              e.currentTarget.focus();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onFocus={(e) => {
              e.stopPropagation();
              onFocus?.(e);
            }}
            onBlur={(e) => {
              e.stopPropagation();
              onBlur?.(e);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : selectedItem ? (
          selectedItem.value
        ) : (
          searchValue || (placeholder ?? label ?? 'Выберите значение')
        )}
      </div>
    );
  };

  const getDropdownMenu = () => {
    const optionsToRender = enableAutocomplete && searchValue 
      ? filteredOptions 
      : modifiedOptions;

    const menu = isOpen && (
      <div className={dropdownClassess}>
        {optionsToRender && optionsToRender.length > 0 ? (
          optionsToRender.map((optionsToRender, index) => {
            return (
              <DropdownListItem
                key={optionsToRender?.key ?? index}
                item={optionsToRender}
                getOptionLabel={getOptionLabel}
                size={size}
                selectedItem={selectedItem}
                variant={variant}
                onChange={onChangeHandler}
                isActive={activeIndex === index}
                activeIndex={activeIndex}
                index={index}
              />
            );
          })
        ) : (
          <div className={`${styles['item-container']} ${styles['item-block']}`} style={{ paddingLeft: "15px" }}>{noOptionsText}</div>
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

  useEffect(() => {
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
  }, [value, defaultValue]);

  useEffect(() => {
    setErrorInput(error);
  }, [error])

  useEffect(() => {
    setFilteredOptions(modifiedOptions);
  }, [modifiedOptions]);
  
  return (
    <div
      id={id}
      className={wrapperClassess}
      ref={containerRef}
      onClick={onClick}
      style={style? style : { width: isLeftLabel && containerWidth ? `${containerWidth}px` : '100%' }}
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
        {getTextField()}
        {clearable && !readOnly && !disabled && (selectedItem || enableAutocomplete && searchValue) && (
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