import React, { FC, useEffect, useRef, useState } from 'react';
import './Dropdown.css';
import styles from './Dropdown.module.css'
import classNames from 'classnames';
import { ChevronDown10 } from '../../Icons/ChevronDown/ChevronDown10';
import { ChevronUp10 } from '../../Icons/ChevronUp/ChevronUp10';
import { IconCheck10 } from '../../Icons/IconCheck/IconCheck10';
import { DropdownProps } from 'kamotive_ui';


/**
 * Компонент Dropdown позволяет пользователям выбирать однин вариант из выпадающего меню
*/

export interface DropdownListItemProps {
  item: DropdownProps['items'][number];
  size: 'sm' | 'md' | 'lg';
  selectedItem:  DropdownProps['items'][number] | null | string | number;
  style?: 'default' | 'text' ;
  onChange: (value: DropdownProps['items'][number]) => void;
}
export const DropdownListItem:FC<DropdownListItemProps> = (
  {
    item,
    size = 'md',
    selectedItem,
    style,
    onChange
  }
)=>{
  
  const handleItemClick = (item: DropdownProps['items'][number], disabled: boolean | undefined) => {
      if (!disabled) {
    onChange(item);
  }  
 };
 const itemClassess = classNames(
  styles[`item-block`],
  styles[`button--${size}`],
  { 'item-block--selected': selectedItem?.value === item?.value || (typeof selectedItem === 'string' || typeof selectedItem === 'number') && selectedItem === item},
  { 'item-block--disabled': item?.disabled },
);
const itemBlock = classNames(
  styles[`item-block`],
  styles[`item-block-${style}`],
  { [`item-block-${style}--selected`]: selectedItem?.value === item.value },
  { 'item-block--disabled': item.disabled },
)

return (
  <div className={styles[`item--container`]}>
    <div className={styles[itemClassess]} onClick={() => handleItemClick(item, item.disabled)}>
      <div className={itemBlock}>
          {style=== 'default' && item.icon && React.cloneElement(item.icon as React.ReactElement, {strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0' })}
          <div className={styles["item"]}>
          <span>{item?.value || item}</span>
        </div>
      {selectedItem?.value === item.value && <IconCheck10 strokeWidth= {size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0' } htmlColor='#0D99FF'/>}
      </div>
      {item.isDivider && <div className={styles["divider"]}></div>}    
    </div>
    {item?.children && (<div className={styles["nestedMenu"]}>
      {item.children?.map((child: any, index: number) => (
        <DropdownListItem key={index} item={child} size={size} selectedItem={selectedItem} onChange={onChange} />
      ))}
 </div>
 )}
  </div>
)
}
export const Dropdown:FC<DropdownProps> = (
  {
    id,
    name,
    label,
    size = 'md',
    disabled,
    className,
    defaultValue,
    items,
    isOpened = false,
    style = 'default',
    readOnly = false,
    isLeftLabel=false
  }
)=>{
  const [isOpen, setIsOpen] = useState(isOpened);
  const [selectedItem, setSelectedItem] = useState<DropdownProps['items'][number] | null>(defaultValue ?? null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
  
  const icon = !isOpen ? <ChevronDown10/> : <ChevronUp10/>

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const onChange = (item:DropdownProps['items'][number])=>{
   if(selectedItem?.value !== item.value){
    setSelectedItem(item);
    setIsOpen(false);
   } else {
    setSelectedItem(null);
   }
  }
  const wrapperClassess = classNames(styles[`dropdown--container`], {
    'wrapper--left': isLeftLabel,
  });

  const buttonClassess = classNames(
    styles['button'],
    className,
    styles[`button--${size}`],
    {'button-item--selected': selectedItem?.value && !disabled},
    {'button--readOnly': readOnly},
    { 'button--disabled': disabled },
  );
  const dropdownClassess = classNames(
    styles['dropdown'],
    className,
    {
      'dropdown--disabled': disabled,
    }
  );
  const labelClasses = classNames(styles['label'], 
    {'label--default':!isLeftLabel,
      'label--left': isLeftLabel,
    });


    const checkItem = (item: any)=>{
      if (typeof item === 'object') {
        if(item.value){
          return item;
        } else if (item.name && !item.value){
          return {...item, value: name}
        } else if(item.description && !item.value){
          return {...item, value: item.description}
        } else {
          const keys = Object.keys(item);
          if (keys.length) {
            const firstValue = item[keys[0]];
            return {...item, value: firstValue};
          }
        }
      } else if(typeof item === 'string' || typeof item === 'number') {
        return { value: item };
      } else {
        return null;
      }
    }
  const getDropdownMenu = () => {
   
    // const menu = withPortal ? (
    //   ReactDOM.createPortal(<DropdownMenu withPortal >{children}</DropdownMenu>, portalContainer)
    // ) : <DropdownMenu>{children}</DropdownMenu>
    const menu = isOpen && <div className={styles[dropdownClassess]}>
           {items?.map((item,index) => {
            const modifiedItem = checkItem(item)
              return (
                <DropdownListItem key={item?.key ?? index} item={modifiedItem} size={size} selectedItem={selectedItem} style={style} onChange={onChange}/>
              );
            })}
         </div>
    return isOpen ? menu : null;
  }

   useEffect(() => {
      if (containerRef.current) {
        const textWidth = Math.max(name?.length, selectedItem?.value.length || 0); 
        let newWidth;
        if (textWidth === name?.length) {    
          const inPixel = size === 'sm' ? 11 : size === 'md' ? 12 : 14
          newWidth = selectedItem ? textWidth * inPixel : textWidth * inPixel; 
        } else {
          const inPixel = size === 'sm'? 9 : size === 'md' ? 10 : 12
          newWidth = textWidth * inPixel;
        }
      setContainerWidth(newWidth);
      }
    }, [selectedItem, name, isOpen, size]);
  
  
    return(
    <div className={styles[wrapperClassess]} ref={containerRef} style={{ width: containerWidth ? `${containerWidth}px` : 'auto' }}>
       {selectedItem && label && (
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
      )}
      <button className={buttonClassess} onClick={readOnly ? undefined : handleToggle} disabled={disabled}>
        <div className={style === 'default' && selectedItem?.icon ? styles[`button--default--item-selected`]:''}>
        {style === 'default' && selectedItem?.icon &&  React.cloneElement(selectedItem.icon as React.ReactElement, {strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0' })}
        {selectedItem ? selectedItem.value : name}
        </div>
            {icon && React.cloneElement(icon as React.ReactElement, {strokeWidth: size === 'lg' ? '0.5' : size === 'md' ? '0.3' : '0.0' })}
      </button>
      {getDropdownMenu()}
    </div>

  )
}