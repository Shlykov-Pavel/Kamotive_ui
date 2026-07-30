import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';
import { ChevronDown } from '../../Icons/ChevronDown/ChevronDown';
import { ChevronUp } from '../../Icons/ChevronUp/ChevronUp';
import { IconClose } from '../../Icons/IconClose/IconClose';
import { IconCheck } from '../../Icons/IconCheck/IconCheck';
import {  DropdownProps, IDropdownItem, BaseOptions } from '../../types';
import { Typography } from '../Typography/Typography';
import { Tooltip } from '../Tooltip/Tooltip';
import { Spinner } from '../Spinner/Spinner';
import { Button } from '../Button/Button';

const isTextOverflowing = (element: HTMLElement | null): boolean => {
  if (!element) return false;
  return element.scrollWidth > element.clientWidth;
};

const getComparisonValue = <T extends BaseOptions>(item: T | null, getOptionLabel: ((option: T) => string) | undefined): any => {
  if (!item) return null;

  if (getOptionLabel && typeof getOptionLabel === 'function') {
    return getOptionLabel(item);
  }
  
  if (item && typeof item === 'object') {
    if ('value' in item) return (item as any).value;
    if ('id' in item) return (item as any).id;
  }

  return item;
};

const getItemId = <T extends BaseOptions>(item: T | null): any => {
  if (!item || typeof item !== 'object') return null;
  if ('id' in item) return (item as any).id;
  return null;
};

/**
 * Компонент Dropdown позволяет пользователям выбирать однин вариант из выпадающего меню
 */

export interface DropdownListItemProps<T extends BaseOptions> {
  item: T | null;
  getOptionLabel?: (option: T) => string;
  size: 'md' | 'lg';
  selectedItem: T | null | T[];
  variant?: 'icons' | 'text' | 'filter';
  onChange: (event: React.MouseEvent<HTMLElement>, item: T | null) => void;
  isActive?: boolean;
  activeIndex?: number;
  index?: number;
  isChild?: boolean;
  testId?: string;
}

function checkItem<T>(
  item: T,
  getOptionLabel?: (option: T) => string,
  disabled?: boolean,
  isDivider?: boolean
): IDropdownItem | null {
  if (typeof item === 'string' || typeof item === 'number') {
    return { value: item, disabled: disabled ?? false, isDivider: isDivider ?? false };
  } 
  if (typeof item === 'object' && item !== null) {
    const itemCopy = { ...item } as IDropdownItem;
    // Проверяем только поле value на вложенные объекты
    if (getOptionLabel) {
      const labelResult = getOptionLabel(item);
      // Если getOptionLabel возвращает массив
      if (Array.isArray(labelResult)) {
        if (!itemCopy.children) {
          itemCopy.children = [];
        }

        labelResult.forEach((labelItem: any) => {
          const processedLabelItem = checkItem(labelItem, getOptionLabel, disabled, isDivider);
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
          disabled: itemCopy.disabled ?? disabled ?? false,
          isDivider: itemCopy.isDivider ?? isDivider ?? false,
        };
      } else {
        // Обычная обработка, если getOptionLabel возвращает строку
        return {
          ...itemCopy,
          value: labelResult,
         disabled: itemCopy.disabled ?? disabled ?? false,
          isDivider: itemCopy.isDivider ?? isDivider ?? false,
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
          const processedNestedItem = checkItem(nestedItem, getOptionLabel, disabled, isDivider) as IDropdownItem;
          if (processedNestedItem) {
            itemCopy.children!.push(processedNestedItem);
          }
        });
        // Для родительского элемента используем name или первое значение
        itemCopy.value = itemCopy.name || 'Группа опций';
      } else if (typeof itemCopy.value === 'object') {
        const nestedItem = checkItem(itemCopy.value as IDropdownItem, getOptionLabel, disabled, isDivider) as IDropdownItem;
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
        disabled: itemCopy.disabled ?? disabled ?? false,
        isDivider: itemCopy.isDivider ?? isDivider ?? false,
      };
    } else if ('name' in itemCopy && !('value' in itemCopy)) {
      return {
        ...itemCopy,
        value: itemCopy.name,
        disabled: itemCopy.disabled ?? disabled ?? false,
        isDivider: itemCopy.isDivider ?? isDivider ?? false,
      };
    } else if ('description' in itemCopy && !('value' in itemCopy)) {
      return {
        ...itemCopy,
        value: itemCopy.description,
        disabled: itemCopy.disabled ?? disabled ?? false,
        isDivider: itemCopy.isDivider ?? isDivider ?? false,
      };
    } else {
      const keys = Object.keys(itemCopy) as Array<keyof typeof itemCopy>;
      if (keys.length) {
        const firstValue = itemCopy[keys[0]];
        return {
          ...itemCopy,
          value: firstValue,
          disabled: itemCopy.disabled ?? disabled ?? false,
          isDivider: itemCopy.isDivider ?? isDivider ?? false,
        };
      }
    }
  }
  return null;
}

export const DropdownListItem = <T extends BaseOptions> ({
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
  testId
}: DropdownListItemProps<T>) => {
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
      if (!item) return;
      
      if (typeof item === 'string') {
        onChange(event, item);
        return;
      }
      if (!(item as any)?.disabled) {
        if (!(item as any)?.children || (item as any).children.length === 0) {
          onChange(event, item); // Если у элемента есть дети, не выбираем родительский элемент
        }
      }
    },
    [item, onChange]
  );
  const hasChildren = item !== null && typeof item === 'object' && 'children' in item && Array.isArray((item as any).children) && (item as any).children.length > 0;
  const isDisabled = item !== null && typeof item === 'object' && 'disabled' in item && (item as any).disabled;

  const itemId = getItemId(item);
  const isSelectedItem = Array.isArray(selectedItem)
    ? selectedItem.some((i) => itemId !== null ? getItemId(i) === itemId : getComparisonValue(i, getOptionLabel) === getComparisonValue(item, getOptionLabel))
    : itemId !== null
      ? getItemId(selectedItem as T | null) === itemId
      : getComparisonValue(selectedItem, getOptionLabel) === getComparisonValue(item, getOptionLabel);

  const itemContainerClasses = classNames(styles[`item--container`], {
    [styles['item--container--active']]: isActive,
    [styles['item--container--parent']]: hasChildren && !isChild,
    [styles['item--container--child']]: isChild,
  });
  const itemClassess = classNames(styles[`item-block`], styles[`button--${size}`], {
    [styles['item-block--disabled']]: isDisabled,
    [styles['item-block--active']]: isActive,
    [styles['item-block--parent']]: hasChildren && !isChild, // Стиль для родительских элементов
    [styles['item-block--child']]: isChild, // Стиль для дочерних элементов
  });

  const itemBlock = classNames(
    styles[`item-block`],
    styles[`item-block-${variant}`],
    // { [styles[`item-block-${variant}--selected`]]: selectedItem?.value === item?.value },
    {
      [styles['item-block--disabled']]: isDisabled,
      [styles[`item-block-${variant}--selected`]]: isSelectedItem,
      [styles['item-block--parent']]: hasChildren && !isChild,
      [styles['item-block--child']]: isChild,
    }
  );

  const itemData = item !== null && typeof item === 'object' ? (item as any) : null; 
  const itemContent = (
    <div className={itemContainerClasses} onClick={handleItemClick} data-test-id={`${testId}-item`}>
      <div className={itemClassess}>
        <div className={itemBlock}>
          {variant === 'icons' && itemData?.icon &&
          React.cloneElement(itemData.icon as React.ReactElement, {
            strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
          })}
          <div className={styles.item} ref={itemRef}>
            {/* <span>{item?.value}</span> */}
            <span data-test-id={`${testId}-item-title`}>{getComparisonValue(item, getOptionLabel)}</span>
          </div>
          {!hasChildren && isSelectedItem && (
             <span 
                data-test-id={`${testId}-checked-icon`} 
                style={{ display: 'inline-flex' }}
              >
                <IconCheck strokeWidth={size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0'} htmlColor="#0D99FF" />
              </span>
            )}
        </div>
       {itemData?.isDivider && <div className={styles.divider}></div>}
      </div>
      {/* Вложенные элементы */}
      {hasChildren && (
        <div className={styles.nestedMenu} data-test-id={`${testId}-nested-block`}>
          {(item as any).children?.map((child: any, childIndex: number) => {
            return (
              <DropdownListItem
                key={child?.id ?? `${index}-${childIndex}`}
                item={child}
                getOptionLabel={getOptionLabel}
                size={size}
                selectedItem={selectedItem}
                onChange={onChange}
                isActive={false}
                activeIndex={activeIndex}
                index={childIndex}
                isChild={true}
                testId={`${testId}-nested-${childIndex}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
  return showTooltip ? (
    <Tooltip 
        label={getComparisonValue(item as any, getOptionLabel)?.toString() || ''} 
        position="bottom-left" 
        testId={`${testId}`}
        className={variant === 'filter' ? styles.filterTooltipWidth : ''}
        >
      {itemContent}
    </Tooltip>
  ) : (
    itemContent
  );
};

export const Dropdown = <T extends BaseOptions>({
  options,
  id,
  label,
  placeholder,
  required = false,
  value,
  defaultValue,
  onChange,
  showLoadMore = false,
  loadMore,
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
  onOpen,
  onClick,
  onBlur,
  onFocus,
  onClose,
  clearable = true,
  enableAutocomplete = false,
  onSearch,
  isOptionsLoading,
  isSearchLoading,
  noOptionsText,
  lng = 'ru',
  multiple = false,
  limitTags = 1,
  testId = 'default'
}: DropdownProps<T>) => {

  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoveredIndexRef = useRef<number>(-1);
  const onCloseRef = useRef(onClose);
  const labelChipRef = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const selectedItemRef = useRef<HTMLDivElement>(null); 

  const [isOpen, setIsOpen] = useState(isOpened);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [selectedItems, setSelectedItems] = useState<T[]>([]); //при множественном выборе
  const [errorInput, setErrorInput] = useState(false);
  const [errorInputHelperText, setErrorInputHelperText] = useState(helperText);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchValue, setSearchValue] = useState('');
  const [isInitialOpen, setIsInitialOpen] = useState(false)
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
  const [showSelectedTooltip, setShowSelectedTooltip] = useState(false);
  const [showChipTooltip, setShowChipTooltip] = useState<Record<string, boolean>>({});
  const prevErrorRef = useRef(error);
  const prevSearchValueRef = useRef('');

  const actualOptions = useMemo(() => {
    return (options?.map(opt => {
      const transformed = checkItem(opt, getOptionLabel,disabled,isDivider);
      return transformed as T;
    }) || []) as T[];
  }, [options, getOptionLabel]);

  const displayOptions = useMemo(() => {
    if (!enableAutocomplete || !searchValue) return actualOptions;

    // Для выбранного значения
    if (isInitialOpen) {
      return actualOptions;
    }

    // Серверный поиск
    if (onSearch && searchValue.trim().length >= 3) {
      return actualOptions; 
    }

    // Локальная фильтрация
    return actualOptions.filter(opt => {
      const val = getComparisonValue(opt as any, getOptionLabel) || '';
      return String(val).toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [actualOptions, enableAutocomplete, searchValue, isInitialOpen, onSearch]);


 
  const calculatedWidth = useMemo(() => {
    const text = label ?? placeholder ?? '';
    const selectedValue = getComparisonValue(selectedItem as any, getOptionLabel)?.toString() || '';
    const inPixel = size === 'lg' ? 11 : 9;
    
    if (!isLeftLabel) {
      return Math.max(text.length, selectedValue.length) * inPixel;
    }
    return (text.length + selectedValue.length) * inPixel + 40;
  }, [selectedItem, label, size, placeholder, isLeftLabel]);


  const wrapperClassess = classNames(className, {
    [styles['dropdown--container']]: !isLeftLabel,
    [styles['dropdown--container-left']]: isLeftLabel,
    [styles['dropdown--container-label']]: label && !isLeftLabel && !required,
    [styles['dropdown--container-helperText']]: errorInput,
  });
  
  const buttonClassess = classNames(styles.button, styles[`button--${size}`], {
    [styles['button--filter']]: variant === 'filter',
    [styles['button-item--selected']]: getComparisonValue(selectedItem as any, getOptionLabel) && !disabled,
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
    [styles['item-selected']]: !!selectedItem || !!selectedItems.length || !!searchValue,
      [styles['item-placeholder']]: !(selectedItem || selectedItems.length || searchValue) && 
    ((placeholder ?? label) || (!placeholder && !label)),
    // [styles['item-placeholder']]: !(selectedItem || selectedItems.length) && ((placeholder ?? label) || (!placeholder && !label)),
    [styles['button--icons--item-selected']]: variant === 'icons' && (selectedItem as any)?.icon && !multiple,
  });

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen) {
      onOpen?.(event);
      const currentItem = multiple ? null : selectedItem;
      const initialIndex = currentItem
        ? displayOptions.findIndex((opt) => {
            const id = getItemId(opt as any);
            return id !== null ? id === getItemId(currentItem as any) : getComparisonValue(opt as any, getOptionLabel) === getComparisonValue(currentItem as any, getOptionLabel);
          })
        : -1;
      setActiveIndex(initialIndex);

      if (enableAutocomplete && onChange) {
        const selectedValue = getComparisonValue(selectedItem as any, getOptionLabel)?.toString() || '';
        if (error && selectedItem) {
          setSearchValue(selectedValue);
          setIsInitialOpen(true);
          onSearch?.('');
        } else if (searchValue) {
          setIsInitialOpen(false);
          requestAnimationFrame(() => inputRef.current?.focus());
          return;
        } else {
          setIsInitialOpen(true);
          setSearchValue(selectedValue);
        }
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    } else if (!newIsOpen) {
      onClose?.(event);
      hoveredIndexRef.current = -1;
    }
  };

  const onChangeHandler = (event: React.MouseEvent<HTMLElement>, item: T | null) => {
    event.preventDefault();
    event.stopPropagation();
    if (multiple && item){
      setErrorInput(false);
      setSearchValue(''); 
      setSelectedItems((selectedItems) => {
        const itemId = getItemId(item);
        const isSame = (i: T) => itemId !== null
          ? getItemId(i) === itemId
          : getComparisonValue(i, getOptionLabel) === getComparisonValue(item, getOptionLabel);
        const isSelected = selectedItems.some(isSame);
        const newSelectedItems = isSelected
          ? selectedItems.filter((i) => !isSame(i))
          : [...selectedItems, item]

        const newEvent = {
          ...event,
          currentTarget: {
            ...event.currentTarget,
            value: newSelectedItems,
          },
        };
        (onChange as (event: any, value: T[]) => void)?.(event, newSelectedItems);

        return newSelectedItems;
      })
      return;
    }

    const newEvent = {
      ...event,
      currentTarget: {
        ...event.currentTarget,
        value: item,
      },
    };  
    const selectedId = getItemId(selectedItem as any);
    const itemId = getItemId(item as any);
    const isDifferent = selectedId !== null && itemId !== null
      ? selectedId !== itemId
      : getComparisonValue(selectedItem as any, getOptionLabel) !== getComparisonValue(item as any, getOptionLabel);
    if (isDifferent) {
      setSelectedItem(item);     
      setIsOpen(false);
      setSearchValue('');
      onSearch?.('');  
     (onChange as (event: any, value: T | null) => void)?.(event, item);
      onClose?.(event);
    }     
    if (item) {
      setErrorInput(false);
    } else {
      setErrorInput(true);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    const regex = /(\S+)\.\s+$/ //проверка автоматического подставления точки после двойных пробелов
    if (regex.test(value)) {
        value = value.replace(regex, '$1  ');
    }
    event.preventDefault();
    event.stopPropagation();
    if (value === '') {
       // onChange?.(event as any, null); 
        // setSelectedItem(null);
      handleReset(event, false); 
      return; 
    }
    setSearchValue(value);
    onSearch?.(value);
    setIsInitialOpen(false);
    setActiveIndex(0);
  };

  //для выбора опции из списка с клавиатуры
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement) {
      const inputTarget = event.target; 
      
      if (event.key === ' ' && !inputTarget.value.trim()) {
        event.preventDefault(); 
        return; 
      }
    }
    if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();
        if (!error) {
          setIsOpen(true);
          setActiveIndex(0);
        }
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
        displayOptions && setActiveIndex((prev) => {
          const start = prev < 0 ? hoveredIndexRef.current : prev;
          const hasLoadMore = showLoadMore && !!loadMore && !isSearchingNow && !showSpinner;
          const max = displayOptions.length - 1 + (hasLoadMore ? 1 : 0);    
          return start <= max ? start + 1 : start;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        displayOptions && setActiveIndex((prev) => {
          const start = prev < 0 ? hoveredIndexRef.current : prev;
          return start > 0 ? start - 1 : start;
        });
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex === displayOptions.length && showLoadMore && loadMore) {
          loadMore();
        } else if (activeIndex >= 0 && activeIndex < displayOptions.length) {
          const selectedOption = displayOptions[activeIndex];
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

  //для сброса выбранного значения или всех (если multiple)
  const handleReset = (event?: React.SyntheticEvent, close: boolean = true) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const startValue = defaultValue ? (checkItem(defaultValue) as T) : null;
    if(multiple){
      setSelectedItems([])
    } else{
      setSelectedItem(startValue ?? null);
    }

    // if (!enableAutocomplete) {
    //   setIsOpen(false);
    // }
    if (!multiple && close) {;
      setIsOpen(false);
    }
    setSearchValue('');
    onSearch?.('');
    (onChange as (event: any, value: T[]) => void)?.(event, []);
    close && onClose?.(event);
    setActiveIndex(-1);

    if (required) {
      setErrorInput(true);
      setErrorInputHelperText((helperText ?? lng === 'ru') ? 'Поле обязательно для заполнения' : 'Field is required');
    }
  };

  const handleResetMultipleItem = (event: React.MouseEvent<HTMLElement>, item: T | T[] | null) => {
    event.preventDefault();
    event.stopPropagation();

    item && setSelectedItems((selectedItems) => {

        const itemId = getItemId(item as T);
        const newSelectedItems = selectedItems.filter((i) =>
          itemId !== null ? getItemId(i) !== itemId : getComparisonValue(i, getOptionLabel) !== getComparisonValue(item, getOptionLabel)
        );
        (onChange as (event: any, value: T[]) => void)?.(event, newSelectedItems);

        if (required && newSelectedItems.length === 0) {
          setErrorInput(true);
          setErrorInputHelperText((helperText ?? lng === 'ru') ? 'Поле обязательно для заполнения' : 'Field is required');
        }

        return newSelectedItems;
      })
  }


  //ОТРИСОВКИ
  const getSelectedItemsText = () => {
    if(multiple) {
      if(selectedItems.length === 0){ return ''}
      return selectedItems.map((item) => {
        getComparisonValue(item as any, getOptionLabel)
      })
    }
    return getComparisonValue(selectedItem, getOptionLabel)
  }

  const getChips = () => {   
    const visible = selectedItems.slice(0, limitTags);
    const hidden = selectedItems.length - visible.length;

    return (
      <div className={styles.chipsWrap}>
        {visible.map((opt) => {
          const key = String(getItemId(opt) ?? getComparisonValue(opt, getOptionLabel) ?? getSelectedItemsText());
          const label = String(getComparisonValue(opt, getOptionLabel) ?? '');
          const chip = (
            <span
              className={styles.chip}
              onMouseEnter={() => requestAnimationFrame(() => recalcChipTooltips())}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <span
                className={styles.chipLabel}
                ref={(el) => {
                  labelChipRef.current.set(key, el);
                }}
              >
                {label}
              </span>

              <span
                className={styles.chipRemove}
                role="button"
                tabIndex={0}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => handleResetMultipleItem(e as any, opt)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleResetMultipleItem(e as any, opt);
                }}
                aria-label={lng === 'ru' ? 'Удалить' : 'Remove'}
              >
                ×
              </span>
            </span>
          );

          return showChipTooltip[key] ? (
              <Tooltip
                label={label}
                position="bottom-left"
                style={{ width: '100% !important' }}
                key={key}
              >
                {chip}
              </Tooltip>
          ) : (
            chip
          );
        })}

        {hidden > 0 && (
          <span
            className={styles.chipMore}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            +{hidden}
          </span>
        )}
      </div>
    );

  }
  
  const  getTextField = () => {
    const selectedText = getSelectedItemsText()
    
    const textFieldContent = (
      <div 
        className={selectedItemClassess} 
        ref={selectedItemRef}
        onClick={() => {
          if (isOpen && enableAutocomplete) {
            inputRef.current?.focus();
          }
        }}
        data-test-id={`${testId}-dropdown-value-wrapper`}
        >
        {variant === 'icons' && !multiple &&
          (selectedItem as any)?.icon &&
          React.cloneElement((selectedItem as any).icon as React.ReactElement, {
            strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
          })
          }
        {multiple && selectedItems.length > 0 && getChips()}
        {!multiple && selectedItem && (
          <span data-test-id={`${testId}-dropdown-current-value`} style={{ display: (isOpen && enableAutocomplete && searchValue) ? 'none' : 'block'}}>
            {getComparisonValue(selectedItem as any, getOptionLabel)}
          </span>
        )}
        {enableAutocomplete && (isOpen || (error && searchValue && !selectedItem && !multiple)) && (
              <input
                ref={inputRef}
                type="text"
                name="text"
                value={searchValue}
                className={styles.inlineSearchInput}
                onChange={handleSearchChange}
                placeholder={
                  !searchValue && !selectedItem 
                    ? (lng === 'ru' ? 'Поиск...' : 'Search...') 
                    : ''
                }

                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onClick?.(e);
                  e.currentTarget.focus();
                }}
                onMouseDown={(e) => e.stopPropagation()}
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
                data-test-id={`${testId}-dropdown-search-input`}
              />
        )}
        {!isOpen && !error && searchValue && !selectedItem && !multiple && (
          <span data-test-id={`${testId}-dropdown-current-value`}>
            {searchValue}
          </span>
        )}
        {!multiple && !selectedItem && !searchValue && !(isOpen && enableAutocomplete) && (
          <span data-test-id={`${testId}-dropdown-placeholder`}>
            {placeholder ?? label ?? (lng === 'ru' ? 'Выберите значение' : 'Select value')}
          </span>
        )}
        {multiple && selectedItems.length === 0 && !searchValue && !(isOpen && enableAutocomplete) && (
          <span data-test-id={`${testId}-dropdown-placeholder`}>{placeholder ?? label ?? (lng === 'ru' ? 'Выберите значения' : 'Select values')}</span>
        )}
      </div>
  );

    return showSelectedTooltip ? (
      <div className={styles.textField}>
        <Tooltip
          label={getComparisonValue(selectedItem as any, getOptionLabel)?.toString() || ''}
          position="bottom-left"
          style={{ width: '100% !important' }}
          className={variant === 'filter' ? styles.filterTooltipWidth : ''}
          data-test-id={`${testId}-dropdown-tooltip`}
          
        >
          {textFieldContent}
        </Tooltip>
      </div>
    ) : (
      textFieldContent
    );
  };

  
  const isSearchingNow = !isInitialOpen && !!searchValue.trim();
  const showSpinner = isSearchLoading || (isOptionsLoading && displayOptions.length === 0);

  const getDropdownMenu = () => {
  const optionsToRender = displayOptions;
  const menu = isOpen && (
    <div
      className={dropdownClassess}
      ref={dropdownRef}
      onMouseMove={(e) => {
        const items = dropdownRef.current?.querySelectorAll<HTMLElement>('[class*="item--container"]');
        if (!items) return;
        const target = (e.target as HTMLElement).closest('[class*="item--container"]') as HTMLElement | null;
        if (!target) return;
        const idx = Array.from(items).indexOf(target);
        if (idx !== -1) hoveredIndexRef.current = idx;
        setActiveIndex(-1);
      }}
      data-test-id={`${testId}-dropdown-options-list`}
    >
      {showSpinner ? (
        <div className={`${styles['item-block']}`} style={{ padding: '10px', display: 'flex', flexDirection:"column", alignItems:'center', justifyContent:'center', margin:'0 auto' }} data-test-id={`${testId}-dropdown-spinner`}>
           <Spinner /> 
        </div>
      ) : (
        <>
          {optionsToRender && optionsToRender.length > 0 ? (
            optionsToRender.map((option, index) => (
              <DropdownListItem
                key={(option as any)?.id ?? index}
                item={option}
                getOptionLabel={getOptionLabel as any}
                size={size}
                selectedItem={multiple? selectedItems : selectedItem}
                variant={variant}
                onChange={onChangeHandler}
                isActive={activeIndex === index}
                activeIndex={activeIndex}
                index={index}
                testId={`${testId}-dropdown-option-${index}`}
              />
            ))
          ) : (
            <div className={`${styles['item-block']}`} style={{ margin: '15px auto', textAlign:'center', color:'var(--text-grey)' }} data-test-id={`${testId}-dropdown-empty`}>
              {lng === 'ru' || lng.includes('ru')
                ? noOptionsText || 'Нет вариантов для выбора'
                : noOptionsText || 'No options to select'}
            </div>
          )}
        </>
      )}
      
      {!showSpinner && !isSearchingNow && showLoadMore && loadMore && (
      <Button
            ref={loadMoreRef}
            style={{width: '97%', margin:'10px auto', display: 'block', boxSizing:'border-box'}}
            disabled={isOptionsLoading}
            variant='outline'
            active={activeIndex === displayOptions.length}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              loadMore();
            }}
            testId={`${testId}-dropdown-loadmore`}
          >
            {isOptionsLoading 
            ? (lng === 'ru' ? 'Загрузка...': 'Loading...') 
            : (lng === 'ru' ? 'Загрузить еще' : 'Load more')}
      </Button>
    )}
    </div>
  );
  return isOpen ? menu : null;
  };

  const loadMoreRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeIndex < 0 || !dropdownRef.current) return;
    if (activeIndex === displayOptions.length) {
      loadMoreRef.current?.scrollIntoView({ block: 'nearest' });
      return;
    }
    const items = dropdownRef.current.querySelectorAll<HTMLElement>('[class*="item--container"]');
    items[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, displayOptions.length]);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (error) {
      setIsOpen(false);
    }
  }, [error]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onCloseRef.current?.(event as any);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setErrorInputHelperText(helperText);
  }, [helperText]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(calculatedWidth);
    }
  }, [calculatedWidth]);

  useEffect(() => {
    if (multiple) {
      if(Array.isArray(value)){
          const transformed = value.map(item => checkItem(item, getOptionLabel) as T);
      setSelectedItems(transformed);
        //setSelectedItems(value => value.map(item => checkItem(item) as T))
      }
      else{
        setSelectedItems([])
      }
      return
    }
    if (value || defaultValue) {
      const startValue = value
        ? (checkItem(value as any) as T)
        : defaultValue
          ? (checkItem(defaultValue as any) as T)
          : null;
      setSelectedItem(startValue ?? null);
      setSearchValue('');
      setIsInitialOpen(false); 
    } else {
      setSelectedItem(null);
      setSearchValue('');
    }
  }, [value, defaultValue, multiple]);

  useEffect(() => { 
    const checkOverflow = () => {
      if (!selectedItemRef.current) return;
      const firstChild = selectedItemRef.current.firstElementChild as HTMLElement;
      if (firstChild) {
      const hasOverflow = firstChild.scrollWidth > selectedItemRef.current.clientWidth;
      setShowSelectedTooltip(hasOverflow);
      } else {
        setShowSelectedTooltip(isTextOverflowing(selectedItemRef.current));
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [getComparisonValue(selectedItem as any, getOptionLabel)]);

  const recalcChipTooltips = useCallback(() => {
    const next: Record<string, boolean> = {};
    labelChipRef.current.forEach((el, key) => {
      next[key] = !!el && isTextOverflowing(el);
    });
    setShowChipTooltip(next);
  }, []);

  useEffect(() => {
    if (!multiple) return;

    requestAnimationFrame(() => recalcChipTooltips());

    window.addEventListener('resize', recalcChipTooltips);
    return () => window.removeEventListener('resize', recalcChipTooltips);
  }, [multiple, selectedItems, limitTags, recalcChipTooltips]);

  useEffect(() => {
    setErrorInput(error);
    const errorJustCleared = prevErrorRef.current && !error;
    const searchValueUnchanged = searchValue === prevSearchValueRef.current;

    if (errorJustCleared && searchValueUnchanged && searchValue.trim().length > 0) {
      setSearchValue('');
      setIsOpen(false);
    } else if (
      !error &&
      searchValue.trim().length > 0 &&
      enableAutocomplete &&
      searchValue !== prevSearchValueRef.current
    ) {
      setIsOpen(true);
    }

    prevErrorRef.current = error;
    prevSearchValueRef.current = searchValue;

  }, [error, searchValue, enableAutocomplete]);

  return (
    <div
      id={id}
      className={wrapperClassess}
      ref={containerRef}
      onClick={onClick}
      style={style ? style : { width: isLeftLabel && containerWidth ? `${containerWidth}px` : '100%' }}
      data-test-id={`${testId}-dropdown-block`}
    >
       {label && (
        <Typography variant="Caption" className={labelClasses} testId={`${testId}-dropdown`}>
          {label}
        </Typography>
      )}
      <div
        className={buttonClassess}
        onClick={disabled || readOnly ? undefined : handleToggle}
        role="button"
        // disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onKeyDown={(e) => {
          if (disabled) return;
          if (enableAutocomplete && e.target instanceof HTMLInputElement) return;
          handleKeyDown(e);
        }}
        data-test-id={`${testId}-dropdown-trigger-button`}
      >
        {getTextField()}
        <div className={styles.actionButtons}>
          {clearable &&
            !readOnly &&
            !disabled &&
            (selectedItem || (multiple && selectedItems.length !== 0) || (enableAutocomplete && searchValue)) && (
              <div className={styles.resetButton} data-test-id={`${testId}-dropdown-clear-button`}>
                <IconClose strokeWidth="0.2" htmlColor="var(--text-light)" onClick={handleReset} />
              </div>
            )}
          <div className={styles.dropdownIcon} data-test-id={`${testId}-dropdown-open-button`}>
            {!isOpen ? (
              <ChevronDown strokeWidth={size === 'lg' ? '0.5' : '0.3'} htmlColor='var(--icons-medium)' />
            ) : (
              <ChevronUp strokeWidth={size === 'lg' ? '0.5' : '0.3'} htmlColor='var(--icons-medium)' />
            )}
          </div>
        </div>
        {getDropdownMenu()}
      </div>
      {errorInput && (helperText || errorInputHelperText) && (
        <Typography variant="Caption" className={classNames(styles.helperText, styles[size])} testId={`${testId}-dropdown-error`}>
          {helperText ?? errorInputHelperText}
        </Typography>
      )}
    </div>
  );
};
