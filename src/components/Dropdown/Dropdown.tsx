import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';
import { ChevronDown } from '../../Icons/ChevronDown/ChevronDown';
import { ChevronUp } from '../../Icons/ChevronUp/ChevronUp';
import { IconClose } from '../../Icons/IconClose/IconClose';
import { IconCheck } from '../../Icons/IconCheck/IconCheck';
import { BaseOptions, DropdownProps, TOptions } from '../../types';
import { Typography } from '../Typography/Typography';
import { Tooltip } from '../Tooltip/Tooltip';

const isTextOverflowing = (element: HTMLElement | null): boolean => {
  if (!element) return false;
  return element.scrollWidth > element.clientWidth;
};

const getComparisonValue = (item: BaseOptions | null, getOptionLabel: ((option: TOptions) => string) | undefined) => {
  if (!item) return null;

  if (getOptionLabel && typeof getOptionLabel === 'function') {
    return getOptionLabel(item);
  }
  // Если есть value, используем его
  if (item.value !== undefined) {
    return item.value;
  }

  // Если есть id, используем его для сравнения
  if (item.id !== undefined) {
    return item.id;
  }

  // Иначе используем сам объект
  return item;
};

/**
 * Компонент Dropdown позволяет пользователям выбирать однин вариант из выпадающего меню
 */

export interface DropdownListItemProps {
  item: TOptions | null;
  getOptionLabel?: (option: TOptions) => string;
  size: 'md' | 'lg';
  selectedItem: TOptions | null;
  variant?: 'icons' | 'text';
  onChange: (event: React.MouseEvent<HTMLElement>, item: TOptions | null) => void;
  isActive?: boolean;
  activeIndex?: number;
  index?: number;
  isChild?: boolean;
}

function checkItem(
  item: string | number | TOptions,
  getOptionLabel?: (option: TOptions) => string,
  disabled?: boolean,
  isDivider?: boolean
) {
  if (typeof item === 'object' && item !== null) {
    const itemCopy = { ...item };
    // Проверяем только поле value на вложенные объекты
    if (getOptionLabel) {
      const labelResult = getOptionLabel(itemCopy);
      // Если getOptionLabel возвращает массив
      if (Array.isArray(labelResult)) {
        if (!itemCopy.children) {
          itemCopy.children = [];
        }

        labelResult.forEach((labelItem: any) => {
          const processedLabelItem = checkItem(labelItem, getOptionLabel, disabled, isDivider) as TOptions;
          if (processedLabelItem) {
            itemCopy.children!.push(processedLabelItem);
          }
        });

        // Для родительского элемента используем первый элемент массива или name
        const displayValue =
          labelResult.length > 0
            ? typeof labelResult[0] === 'object'
              ? labelResult[0].name || labelResult[0].value || 'Группа'
              : labelResult[0]
            : itemCopy.name || 'Группа опций';

        return {
          ...itemCopy,
          value: displayValue,
          disabled: disabled ?? false,
          isDivider: isDivider ?? false,
        };
      } else {
        // Обычная обработка, если getOptionLabel возвращает строку
        return {
          ...itemCopy,
          value: labelResult,
          disabled: disabled ?? false,
          isDivider: isDivider ?? false,
        };
      }
    }
    if (!getOptionLabel && 'value' in itemCopy && itemCopy.value !== null && !React.isValidElement(itemCopy.value)) {
      if (Array.isArray(itemCopy.value)) {
        if (!itemCopy.children) {
          itemCopy.children = [];
        }
        // Обрабатываем каждый элемент массива
        itemCopy.value.forEach((nestedItem: any) => {
          const processedNestedItem = checkItem(nestedItem, getOptionLabel, disabled, isDivider) as TOptions;
          if (processedNestedItem) {
            itemCopy.children!.push(processedNestedItem);
          }
        });
        // Для родительского элемента используем name или первое значение
        itemCopy.value = itemCopy.name || 'Группа опций';
      } else if (typeof itemCopy.value === 'object') {
        const nestedItem = checkItem(itemCopy.value as TOptions, getOptionLabel, disabled, isDivider) as TOptions;
        if (nestedItem) {
          if (!itemCopy.children) {
            itemCopy.children = [];
          }
          itemCopy.children.push(nestedItem);
          // Заменяем value на обработанное значение
          itemCopy.value = nestedItem.value;
        }
      }
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
        isDivider: isDivider ?? false,
      };
    } else if ('description' in itemCopy && !('value' in itemCopy)) {
      return {
        ...itemCopy,
        value: itemCopy.description,
        disabled: disabled ?? false,
        isDivider: isDivider ?? false,
      };
    } else {
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
  isChild = false,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      setShowTooltip(isTextOverflowing(itemRef.current));
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [getComparisonValue(item, getOptionLabel)]);

  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!item?.disabled) {
        if (!item?.children || item.children.length === 0) {
          onChange(event, item); // Если у элемента есть дети, не выбираем родительский элемент
        }
      }
    },
    [item, onChange]
  );
  const hasChildren = item?.children && item.children.length > 0;
  const itemContainerClasses = classNames(styles[`item--container`], {
    [styles['item--container--active']]: isActive,
    [styles['item--container--parent']]: hasChildren && !isChild,
    [styles['item--container--child']]: isChild,
  });
  const itemClassess = classNames(styles[`item-block`], styles[`button--${size}`], {
    [styles['item-block--disabled']]: item?.disabled,
    [styles['item-block--active']]: isActive,
    [styles['item-block--parent']]: hasChildren && !isChild, // Стиль для родительских элементов
    [styles['item-block--child']]: isChild, // Стиль для дочерних элементов
  });
  const itemBlock = classNames(
    styles[`item-block`],
    styles[`item-block-${variant}`],
    // { [styles[`item-block-${variant}--selected`]]: selectedItem?.value === item?.value },
    {
      [styles[`item-block-${variant}--selected`]]:
        getComparisonValue(selectedItem, getOptionLabel) === getComparisonValue(item, getOptionLabel),
      [styles['item-block--disabled']]: item?.disabled,
      [styles['item-block--parent']]: hasChildren && !isChild,
      [styles['item-block--child']]: isChild,
    }
  );

  const itemContent = (
    <div className={itemContainerClasses} onClick={handleItemClick}>
      <div className={itemClassess}>
        <div className={itemBlock}>
          {variant === 'icons' &&
            item?.icon &&
            React.cloneElement(item.icon as React.ReactElement, {
              strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
            })}
          <div className={styles.item} ref={itemRef}>
            {/* <span>{item?.value}</span> */}
            <span>{getComparisonValue(item, getOptionLabel)}</span>
          </div>
          {!hasChildren &&
            getComparisonValue(selectedItem, getOptionLabel) === getComparisonValue(item, getOptionLabel) && (
              <IconCheck strokeWidth={size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0'} htmlColor="#0D99FF" />
            )}
        </div>
        {item?.isDivider && <div className={styles.divider}></div>}
      </div>
      {/* Вложенные элементы */}
      {hasChildren && (
        <div className={styles.nestedMenu}>
          {item.children?.map((child: any, childIndex: number) => {
            return (
              <DropdownListItem
                key={child?.key ?? `${index}-${childIndex}`}
                item={child}
                getOptionLabel={getOptionLabel}
                size={size}
                selectedItem={selectedItem}
                onChange={onChange}
                isActive={false}
                activeIndex={activeIndex}
                index={childIndex}
                isChild={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
  return showTooltip ? (
    <Tooltip label={getComparisonValue(item, getOptionLabel)?.toString() || ''} position="bottom-left">
      {itemContent}
    </Tooltip>
  ) : (
    itemContent
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
  lng = 'ru',
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
    [styles['button-item--selected']]: getComparisonValue(selectedItem, getOptionLabel) && !disabled,
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
  };

  const handleToggle = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);

      if (newIsOpen && enableAutocomplete) {
        const value = getComparisonValue(selectedItem, getOptionLabel)
          ? getComparisonValue(selectedItem, getOptionLabel).toString()
          : searchValue;
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
    },
    [isOpen, enableAutocomplete, searchValue, selectedItem, modifiedOptions, onClose]
  );

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

    if (getComparisonValue(selectedItem, getOptionLabel) !== getComparisonValue(item, getOptionLabel)) {
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

    if (
      enableAutocomplete &&
      event.target instanceof HTMLInputElement &&
      event.key !== 'ArrowDown' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'Enter' &&
      event.key !== 'Escape'
    ) {
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

    const startValue = defaultValue ? (checkItem(defaultValue) as TOptions) : null;
    setSelectedItem(startValue ?? null);

    if (!enableAutocomplete) {
      setIsOpen(false);
    }

    setSearchValue('');
    setFilteredOptions(modifiedOptions);
    onChange?.(event, startValue ?? null);
    onClose?.(event);
    setActiveIndex(-1);

    if (required) {
      setErrorInput(true);
      setErrorInputHelperText(helperText ?? lng === 'ru' ? 'Поле обязательно для заполнения' : 'Field is required');
    }
  };

  const [showSelectedTooltip, setShowSelectedTooltip] = useState(false);
  const selectedItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkOverflow = () => {
      setShowSelectedTooltip(isTextOverflowing(selectedItemRef.current));
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [getComparisonValue(selectedItem, getOptionLabel)]);
  const getTextField = () => {
    const textFieldContent = (
      <div className={selectedItemClassess} ref={selectedItemRef}>
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
            placeholder={
              getComparisonValue(selectedItem, getOptionLabel)
                ? getComparisonValue(selectedItem, getOptionLabel).toString()
                : lng === 'ru' ? 'Поиск...' : 'Search...'
            }
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
          getComparisonValue(selectedItem, getOptionLabel)
        ) : (
          searchValue || (placeholder ?? label ?? lng === 'ru' ? 'Выберите значение' : 'Select value')
        )}
      </div>
    );

    return showSelectedTooltip ? (
      <div className={styles.textField}>
        <Tooltip
          label={getComparisonValue(selectedItem, getOptionLabel)?.toString() || ''}
          position="bottom-left"
          style={{ width: '100% !important' }}
        >
          {textFieldContent}
        </Tooltip>
      </div>
    ) : (
      textFieldContent
    );
  };

  const getDropdownMenu = () => {
    const optionsToRender = enableAutocomplete && searchValue ? filteredOptions : modifiedOptions;

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
          <div className={`${styles['item-container']} ${styles['item-block']}`} style={{ paddingLeft: '15px' }}>
            {lng === 'ru' || lng.includes('ru') ? noOptionsText || 'Нет вариантов для выбора' : noOptionsText || 'No options to select' }
          </div>
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
        const textWidth = Math.max(
          (text || '').length,
          (getComparisonValue(selectedItem, getOptionLabel)?.toString() || '').length
        );
        const inPixel = size === 'lg' ? 11 : 9;
        newWidth = textWidth * inPixel;
      } else {
        const inPixel = size === 'lg' ? 11 : 9;
        const selectedValue = getComparisonValue(selectedItem, getOptionLabel)?.toString() || '';
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
        const modifiedOption = checkItem?.(
          option,
          getOptionLabel,
          (option as BaseOptions)?.disabled,
          isDivider
        ) as TOptions;
        if (
          modifiedOption &&
          getComparisonValue(modifiedOption, getOptionLabel) === getComparisonValue(selectedItem, getOptionLabel)
        ) {
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
  }, [error]);

  useEffect(() => {
    setFilteredOptions(modifiedOptions);
  }, [modifiedOptions]);

  return (
    <div
      id={id}
      className={wrapperClassess}
      ref={containerRef}
      onClick={onClick}
      style={style ? style : { width: isLeftLabel && containerWidth ? `${containerWidth}px` : '100%' }}
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
        <div className={styles.actionButtons}>
          {clearable && !readOnly && !disabled && (selectedItem || (enableAutocomplete && searchValue)) && (
            <div className={styles.resetButton}>
              <IconClose strokeWidth="0.2" htmlColor="var(--text-light)" onClick={handleReset} />
            </div>
          )}
          <div className={styles.dropdownIcon}>
            {!isOpen ? (
              <ChevronDown strokeWidth={size === 'lg' ? '0.5' : '0.3'} />
            ) : (
              <ChevronUp strokeWidth={size === 'lg' ? '0.5' : '0.3'} />
            )}
          </div>
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
