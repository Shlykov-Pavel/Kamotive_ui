import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import classNames from 'classnames';
import { ChevronDown10 } from '../../Icons/ChevronDown/ChevronDown10';
import { ChevronUp10 } from '../../Icons/ChevronUp/ChevronUp10';
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
  onChange: (value: DropdownProps['options'][number]) => void;
}
export const DropdownListItem: FC<DropdownListItemProps> = ({ item, size = 'md', selectedItem, style, onChange }) => {
  const handleItemClick = (item: DropdownProps['options'][number], disabled: boolean | undefined) => {
    if (!disabled) {
      onChange(item);
    }
  };
  const itemClassess = classNames(
    styles[`item-block`],
    styles[`button--${size}`],
    { [styles['item-block--selected']]: selectedItem?.value === item.value },
    { [styles['item-block--disabled']]: item.disabled }
  );
  const itemBlock = classNames(
    styles[`item-block`],
    styles[`item-block-${style}`],
    { [styles[`item-block-${style}--selected`]]: selectedItem?.value === item.value },
    { [styles['item-block--disabled']]: item.disabled }
  );

  return (
    <div className={styles[`item--container`]}>
      <div className={itemClassess} onClick={() => handleItemClick(item, item.disabled)}>
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
          {item.children?.map((child: any, index: number) => (
            <DropdownListItem key={index} item={child} size={size} selectedItem={selectedItem} onChange={onChange} />
          ))}
        </div>
      )}
    </div>
  );
};
export const Dropdown: FC<DropdownProps> = ({
  id,
  placeholder,
  label,
  size = 'lg',
  disabled,
  className,
  defaultValue,
  options,
  isOpened = false,
  noOptionsText,
  style = 'text',
  readOnly = false,
  isLeftLabel = false,
  error = false,
  helperText,
}) => {
  console.log('label', label);

  const [isOpen, setIsOpen] = useState(isOpened);
  const [selectedItem, setSelectedItem] = useState<DropdownProps['options'][number] | null>(defaultValue ?? null);
  console.log('selectedItem', selectedItem);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

  const icon = !isOpen ? <ChevronDown10 /> : <ChevronUp10 />;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const onChange = (item: DropdownProps['options'][number]) => {
    if (selectedItem?.value !== item.value) {
      setSelectedItem(item);
      setIsOpen(false);
    } else {
      setSelectedItem(null);
    }
  };
  const wrapperClassess = classNames({
    [styles['dropdown--container']]: !isLeftLabel,
    [styles['dropdown--container-left']]: isLeftLabel,
    [styles['dropdown--container-label']]: label,
    [styles['dropdown--container-helperText']]: error,
  });

  const buttonClassess = classNames(
    styles.button,
    className,
    styles[`button--${size}`],
    { [styles['button-item--selected']]: selectedItem?.value && !disabled },
    { [styles['button--readOnly']]: readOnly },
    { [styles['button--disabled']]: disabled }
  );
  const dropdownClassess = classNames(styles.dropdown, className, {
    [styles['dropdown--disabled']]: disabled,
  });
  const labelClasses = classNames(styles.label, styles[size], {
    [styles['label--default']]: !isLeftLabel,
    [styles['label--left']]: isLeftLabel,
  });

  const selectedItemClassess = classNames({
    [styles['item-selected']]: selectedItem,
    [styles['button--icons--item-selected']]: style === 'icons' && selectedItem?.icon,
  });
  console.log('selectedItemClassess', selectedItemClassess);

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
    // const menu = withPortal ? (
    //   ReactDOM.createPortal(<DropdownMenu withPortal >{children}</DropdownMenu>, portalContainer)
    // ) : <DropdownMenu>{children}</DropdownMenu>
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
                onChange={onChange}
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
      }
    };
    // if (containerRef.current) {
    //   const text = placeholder ?? label ?? '';
    //   const textWidth = Math.max(text.length, selectedItem?.value.length || 0);
    //   let newWidth;
    //   if (textWidth === text?.length) {
    //     const inPixel = size === 'md' ? 12 : 14;
    //     newWidth = selectedItem ? textWidth * inPixel : textWidth * inPixel;
    //   } else {
    //     const inPixel = size === 'md' ? 10 : 12;
    //     newWidth = textWidth * inPixel;
    //   }
    //   setContainerWidth(newWidth);
    // }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedItem, placeholder, label, isOpen, size]);

  return (
    <div
      className={wrapperClassess}
      ref={containerRef}
      style={{ width: containerWidth ? `${containerWidth}px` : 'auto' }}
    >
      {label && (
        <Typography variant="Caption" className={labelClasses}>
          {label}
        </Typography>
      )}
      <button className={buttonClassess} onClick={readOnly ? undefined : handleToggle} disabled={disabled}>
        {/* <div className={style === 'icons' && selectedItem?.icon ? styles[`button--icons--item-selected`] : ''}> */}
        <div className={selectedItemClassess}>
          {style === 'icons' &&
            selectedItem?.icon &&
            React.cloneElement(selectedItem.icon as React.ReactElement, {
              strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
            })}
          {selectedItem ? selectedItem.value : (placeholder ?? label)}
        </div>
        {icon &&
          React.cloneElement(icon as React.ReactElement, {
            strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0',
          })}
        {getDropdownMenu()}
      </button>
      {error && helperText && (
        <Typography variant="Caption" className={classNames(styles.helperText, styles[size])}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};
