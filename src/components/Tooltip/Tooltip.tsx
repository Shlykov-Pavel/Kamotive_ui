import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import styles from './Tooltip.module.css';
import { TooltipProps } from '../../types';
import { Typography } from '../Typography/Typography';
import classNames from 'classnames';

interface ChildrenRect {
	x: number;
	y: number;
	width: number;
	height: number;
	contentY: number;
  	contentHeight: number;
  }

export const Tooltip: FC<TooltipProps> = ({
	label,
	children,
	className,
	style,
	overlayChildren = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const timeoutRef = useRef<number | null>(null);
	const mousePositionRef = useRef({ x: 0, y: 0 });
	const childrenRef = useRef<HTMLDivElement>(null);
	const [childrenRect, setChildrenRect] = useState<ChildrenRect>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		contentY: 0,
		contentHeight: 0,
	});

	const updateContainerRect = () => {
		if (childrenRef.current) {
			const childElement = childrenRef.current.firstElementChild as HTMLElement;
			const rect = childElement.getBoundingClientRect();
			
			const computedStyle = window.getComputedStyle(childElement);
			
			const paddingTop = parseFloat(computedStyle.paddingTop);
			const paddingBottom = parseFloat(computedStyle.paddingBottom);
			
			const contentY = rect.top + paddingTop;
			const contentHeight = rect.height - paddingTop - paddingBottom;

			setChildrenRect({
			  x: rect.left,
			  y: rect.top,
			  width: rect.width,
			  height: rect.height,
			  contentY: contentY,
			  contentHeight: contentHeight
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
		};
	}, []);

	const handleMouseEnter = (e: React.MouseEvent) => {
		updateContainerRect();
		mousePositionRef.current = {
			x: e.clientX,
			y: e.clientY,
		};
	
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	
		/** положение подсказки
		 * x - всегда зависит от положения курсора в момент наведения
		 * y - если пропс overlayChildren true, подсказка будет поверх дочерних компонентов в месте наведения,
		 * в ином случае подсказка всплывает под дочерним элементом
		 */
		timeoutRef.current = window.setTimeout(() => {
			const OFFSET_X = 8;
			const OFFSET_Y = 15;
			setPosition({
				x: mousePositionRef.current.x + OFFSET_X,
				y: overlayChildren || mousePositionRef.current.y > childrenRect.contentY + childrenRect.contentHeight
					? mousePositionRef.current.y + OFFSET_Y
					: childrenRect.contentY + childrenRect.contentHeight
			});
			setIsOpen(true);
		}, 750);
	}

	const handleMouseLeave = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		setTimeout(() => {
			setIsOpen(false);
		}, 500);
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		mousePositionRef.current = {
			x: e.clientX,
			y: e.clientY,
		};
	};

	const tooltipStyles = {
		...style,
		position: 'fixed',
		left: `${position.x}px`,
		top: `${position.y}px`,
		zIndex: 1000,
	} as CSSProperties;

	const tooltipClassNames = classNames(styles.tooltip, isOpen && styles['tooltip--open'], className);
	return (
		<>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				className={styles.wrapper}
				ref={childrenRef}
			>
				{children}
			</div>
			<div className={tooltipClassNames} style={tooltipStyles}>
				<Typography variant="Body1-Medium">{label}</Typography>
			</div>
		</>
	);
};
