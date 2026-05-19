import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import styles from './Tooltip.module.css';
import { TooltipProps } from '../../types';
import { Typography } from '../Typography/Typography';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { hexToRgba } from '../Tag/Tag'

interface ChildrenRect {
	x: number;
	y: number;
	width: number;
	height: number;
	contentX: number;
	contentY: number;
	contentWidth: number;
  	contentHeight: number;
  }

export const Tooltip: FC<TooltipProps> = ({
	label,
	children,
	className,
	style,
	overlayChildren = false,
	textSize = 'sm',
	position = 'none',
	displayDelay = 750,
	hideDelay = 500,
	opacity = 0.4,
	color,
	followCursor = false,
	testId = "default"
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [coords, setCoords] = useState({ x: 0, y: 0 });
	const [childrenRect, setChildrenRect] = useState<ChildrenRect>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		contentX: 0,
		contentY: 0,
		contentWidth: 0,
		contentHeight: 0,
	});
	const timeoutRef = useRef<number | null>(null);
	const mousePositionRef = useRef({ x: 0, y: 0 });
	const childrenRef = useRef<HTMLDivElement>(null);
	const tooltipElementRef = useRef<HTMLDivElement>(null);

	const updateContainerRect = () => {
		if (childrenRef.current) {
			const childElement = childrenRef.current.firstElementChild as HTMLElement;
			const rect = childElement.getBoundingClientRect();
			
			const computedStyle = window.getComputedStyle(childElement);
			
			const paddingTop = parseFloat(computedStyle.paddingTop);
			const paddingBottom = parseFloat(computedStyle.paddingBottom);
			const paddingLeft = parseFloat(computedStyle.paddingLeft);
			const paddingRight = parseFloat(computedStyle.paddingRight);
			
			const contentX = rect.left + paddingLeft;
			const contentY = rect.top + paddingTop;
			const contentHeight = rect.height - paddingTop - paddingBottom;
			const contentWidth = rect.width - paddingLeft - paddingRight;

			setChildrenRect({
			  x: rect.left,
			  y: rect.top,
			  width: rect.width,
			  height: rect.height,
			  contentX: contentX,
			  contentY: contentY,
			  contentWidth: contentWidth,
			  contentHeight: contentHeight,
			});
		}
	};

	useEffect(() => {
		updateContainerRect();
		window.addEventListener('resize', updateContainerRect);
		window.addEventListener('scroll', updateContainerRect);
		
		return () => {
			window.removeEventListener('resize', updateContainerRect);
			window.removeEventListener('scroll', updateContainerRect);
			setIsVisible(false);
        	setIsOpen(false);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const adjustToViewPort = (posX: number, posY: number) => {
		if (tooltipElementRef.current) {
			const OFFSET = 15;

			const tooltipWidth = tooltipElementRef.current.offsetWidth;
			const tooltipHeight = tooltipElementRef.current.offsetHeight;
			
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			
			if (posX + tooltipWidth > viewportWidth) {
				posX = viewportWidth - tooltipWidth - OFFSET;
			}
			
			if (posY + tooltipHeight > viewportHeight) {
				posY = mousePositionRef.current.y - tooltipHeight - OFFSET;
			}
		}

		return [posX, posY];
	}

	const updateCoords = (mouseX?: number, mouseY?: number) => {
		const OFFSET_X = 8;
		const OFFSET_Y = 15;
		const CONTENT_OFFSET_Y = 5;

		const cursorX = mouseX !== undefined ? mouseX : mousePositionRef.current.x;
        const cursorY = mouseY !== undefined ? mouseY : mousePositionRef.current.y;

		// Если followCursor активен, всегда используем позицию курсора
		if (followCursor) {
			let posX = cursorX + OFFSET_X;
			let posY = cursorY + OFFSET_Y;
			
			// Проверяем границы экрана
			[posX, posY] = adjustToViewPort(posX, posY);
			
			setCoords({
				x: posX,
				y: posY
			});
		} else {
			// Оригинальная логика позиционирования
			let posX = cursorX + OFFSET_X;
			let posY = overlayChildren || cursorY > childrenRect.contentY + childrenRect.contentHeight
				? cursorY + OFFSET_Y
				: childrenRect.contentY + childrenRect.contentHeight + CONTENT_OFFSET_Y;
			
			if (position === 'bottom-center' || position === 'bottom-right' || position === 'bottom-left') {
				posY = childrenRect.contentY + childrenRect.contentHeight + CONTENT_OFFSET_Y;
			} else if (position !== 'none') {
				posY = childrenRect.contentY - childrenRect.contentHeight - CONTENT_OFFSET_Y;
			}

			setCoords({
				x: posX,
				y: posY
			});
		}

		if (!isOpen) {
			setIsOpen(true);
			setTimeout(() => {
				setIsVisible(true);
			}, 10);
		}

		if (!followCursor) {
			/** положение подсказки
			 * x - всегда зависит от положения курсора в момент наведения
			 * y - если пропс overlayChildren true, подсказка будет поверх дочерних компонентов в месте наведения,
			 * в ином случае подсказка всплывает под дочерним элементом
			 */
			let posX = mousePositionRef.current.x + OFFSET_X;
			let posY = overlayChildren || mousePositionRef.current.y > childrenRect.contentY + childrenRect.contentHeight
				? mousePositionRef.current.y + OFFSET_Y
				: childrenRect.contentY + childrenRect.contentHeight + CONTENT_OFFSET_Y;
			
			if (position === 'bottom-center' || position === 'bottom-right' || position === 'bottom-left') {
				posY = childrenRect.contentY + childrenRect.contentHeight + CONTENT_OFFSET_Y;
			} else if (position !== 'none') {
				posY = childrenRect.contentY - childrenRect.contentHeight - CONTENT_OFFSET_Y;
			}

			setCoords({
				x: posX,
				y: posY
			});
			setIsOpen(true);

			setTimeout(() => {
				setIsVisible(true);
			}, 10);
			
			setTimeout(() => {
				if (tooltipElementRef.current) {
					const tooltipWidth = tooltipElementRef.current.offsetWidth;

					if (position === 'bottom-center' || position === 'top-center') {
						posX = childrenRect.x + (childrenRect.width - tooltipWidth) / 2;
					} else if (position === 'bottom-right' || position === 'top-right') {
						posX = childrenRect.contentX + childrenRect.contentWidth - tooltipWidth;
					} else if (position !== 'none') {
						posX = childrenRect.contentX;
					}
			
					adjustToViewPort(posX, posY);
					
					setCoords({
						x: posX,
						y: posY
					});
				}
			}, 0);
		}
	}

	const handleMouseEnter = (e: React.MouseEvent) => {
		updateContainerRect();
		mousePositionRef.current = {
			x: e.clientX,
			y: e.clientY,
		};
	
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	
		timeoutRef.current = window.setTimeout(() => {
			updateCoords();
		}, displayDelay);
	}

	const handleMouseLeave = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		setIsVisible(false);

		setTimeout(() => {
			setIsOpen(false);
		}, hideDelay);
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		mousePositionRef.current = {
			x: e.clientX,
			y: e.clientY,
		};

		if (isOpen && followCursor) {
            updateCoords(e.clientX, e.clientY);
        }
	};
	
	const handlePointerDown = () => {
		setIsVisible(false);
		setIsOpen(false);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	};

	const tooltipStyles = {
		...style,
		position: 'fixed',
		left: `${coords.x}px`,
		top: `${coords.y}px`,
		backgroundColor: color ? hexToRgba(color, opacity) : `rgba(0, 0, 0, ${opacity})`,
		zIndex: 1500,
	} as CSSProperties;

	const tooltipClassNames = classNames(styles.tooltip, isVisible && styles['tooltip--visible'], className);
	return (
		<>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				onMouseDown={handlePointerDown}
				className={styles.wrapper}
				ref={childrenRef}
				data-test-id={`${testId}-tooltip`}
			>
				{children}
			</div>
			{isOpen && ReactDOM.createPortal(
				<div ref={tooltipElementRef} className={tooltipClassNames} style={tooltipStyles}>
					<Typography variant={textSize === 'sm' ? "Caption-Medium" : textSize === 'md' ? "Body2-Medium" : "Body1-Medium"} testId={`${testId}-tooltip`}>{label}</Typography>
				</div>,
				document.body
			)}
		</>
	);
};
