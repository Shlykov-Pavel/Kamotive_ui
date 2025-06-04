import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import styles from './DateInput.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
import DatePicker from 'react-datepicker';
import { IconCalendar10 } from '../../Icons/IconCalendar/IconCalendar10';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import { ChevronRight } from '../../Icons/ChevronRight/ChevronRight';
import { ChevronLeft } from '../../Icons/ChevronLeft/ChevronLeft';
import { Button } from '../Button/Button';
registerLocale('ru', ru);
const CustomInput = forwardRef(({ value = '', onClick, onDateChange, onClose, className, disabled = false, readOnly = false }, ref) => {
    const inputRef = useRef(null);
    const [selectedPart, setSelectedPart] = useState(null);
    const [tempInput, setTempInput] = useState('');
    const [hasFocus, setHasFocus] = useState(false);
    const [shouldReselect, setShouldReselect] = useState(false);
    const [input, setInput] = useState(value);
    const positions = {
        day: { start: 0, end: 2 },
        month: { start: 3, end: 5 },
        year: { start: 6, end: 10 },
    };
    const selectDatePart = (part) => {
        setSelectedPart(part);
        setTempInput('');
        setShouldReselect(true);
    };
    const highlightDatePart = () => {
        if (!shouldReselect || !inputRef.current || !hasFocus || selectedPart === null)
            return;
        const pos = positions[selectedPart];
        if (inputRef.current && document.activeElement === inputRef.current) {
            inputRef.current.setSelectionRange(pos.start, pos.end);
        }
    };
    const updateInputValue = (char, position) => {
        setShouldReselect(true);
        if (!readOnly) {
            setInput(input.substring(0, position) + char + input.substring(position + char.length));
        }
    };
    const handleClick = (e) => {
        e.preventDefault();
        if (onClick)
            onClick(e);
        if (!inputRef.current)
            return;
        setHasFocus(true);
        const cursorPosition = inputRef.current.selectionStart || 0;
        let newSelectedPart;
        if (cursorPosition <= positions.day.end) {
            newSelectedPart = 'day';
        }
        else if (cursorPosition <= positions.month.end) {
            newSelectedPart = 'month';
        }
        else {
            newSelectedPart = 'year';
        }
        selectDatePart(newSelectedPart);
    };
    const handleKeyDown = (e) => {
        if (!inputRef.current || !onDateChange || selectedPart === null)
            return;
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (selectedPart === 'month') {
                selectDatePart('day');
            }
            else if (selectedPart === 'year') {
                selectDatePart('month');
            }
        }
        else if (e.key === 'ArrowRight' || e.key === '.') {
            e.preventDefault();
            if (selectedPart === 'day') {
                selectDatePart('month');
            }
            else if (selectedPart === 'month') {
                selectDatePart('year');
            }
        }
        else if (/^\d$/.test(e.key)) {
            e.preventDefault();
            if (!/^\d{2}\.\d{2}\.\d{4}$/.test(input)) {
                const today = new Date();
                handleDateUpdate(today, e.key);
                return;
            }
            const [day, month, year] = input.split('.').map((part) => parseInt(part, 10));
            const currentDate = new Date(year, month - 1, day);
            handleDateUpdate(currentDate, e.key);
        }
        else if (e.key === 'Tab') {
            if (e.shiftKey) {
                e.preventDefault();
                if (selectedPart === 'year') {
                    selectDatePart('month');
                }
                else if (selectedPart === 'month') {
                    selectDatePart('day');
                }
            }
            else {
                e.preventDefault();
                if (selectedPart === 'day') {
                    selectDatePart('month');
                }
                else if (selectedPart === 'month') {
                    selectDatePart('year');
                }
            }
        }
        else if (e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
            selectDatePart(selectedPart);
        }
    };
    const handleDateUpdate = (currentDate, key) => {
        if (!onDateChange || selectedPart === null)
            return;
        const newTempInput = tempInput + key;
        setTempInput(newTempInput);
        let newDate = new Date(currentDate);
        if (selectedPart === 'day') {
            if (newTempInput.length === 1) {
                updateInputValue(key, positions.day.start);
                return;
            }
            updateInputValue(key, positions.day.start + 1);
            let newDay = parseInt(newTempInput, 10);
            newDate.setDate(newDay);
            onDateChange(newDate);
            selectDatePart('month');
        }
        else if (selectedPart === 'month') {
            if (newTempInput.length === 1) {
                updateInputValue(key, positions.month.start);
                return;
            }
            updateInputValue(key, positions.day.start + 1);
            let newMonth = parseInt(newTempInput, 10);
            newDate.setMonth(newMonth - 1);
            onDateChange(newDate);
            selectDatePart('year');
        }
        else if (selectedPart === 'year') {
            if (newTempInput.length < 4) {
                updateInputValue(key, positions.year.start + newTempInput.length - 1);
                return;
            }
            let newYear = parseInt(newTempInput, 10);
            newDate.setFullYear(newYear);
            onDateChange(newDate);
            if (onClose) {
                onClose();
            }
        }
    };
    const handleFocus = () => {
        setHasFocus(true);
        selectDatePart('day');
    };
    const handleBlur = () => {
        setHasFocus(false);
        setTempInput('');
        setSelectedPart(null);
    };
    const removeSelection = useCallback(() => {
        if (inputRef.current) {
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
        }
    }, []);
    useEffect(() => {
        if (!readOnly) {
            setInput(value);
        }
    }, [value]);
    useEffect(() => {
        setTempInput('');
    }, [value]);
    useEffect(() => {
        highlightDatePart();
    }, [selectedPart, highlightDatePart, shouldReselect]);
    useImperativeHandle(ref, () => ({
        removeSelection,
    }), [removeSelection]);
    return (React.createElement("input", { ref: inputRef, value: input, onClick: handleClick, onKeyDown: handleKeyDown, onFocus: handleFocus, onBlur: handleBlur, readOnly: readOnly, disabled: disabled, className: className }));
});
export const DateInput = ({ id, label = 'Выберите дату', size = 'lg', value, style, className, disabled = false, readOnly = false, isLeftLabel = false, icon, error = false, helperText, onChange, onBlur, required = false, minDate = new Date('1975-12-31'), maxDate = new Date('2074-12-31'), inputClassName, calendarClassName, dateFormat = 'dd.MM.yyyy', }) => {
    const wrapperClassess = classNames(styles['wrapper--input'], className, {
        [styles['wrapper--left']]: isLeftLabel,
        [styles['wrapper--input-label']]: label && !isLeftLabel && !required,
        [styles['wrapper--input-helperText']]: error,
    });
    const inputClassess = classNames(styles.input, styles[size], {
        [styles['input--error']]: error,
        [styles['readOnly']]: readOnly,
        [styles['input--withIcon']]: true,
        [styles['input--left']]: isLeftLabel,
    });
    const labelClasses = classNames(styles.label, styles[size], {
        [styles['label--default']]: !isLeftLabel,
        [styles['label--left']]: isLeftLabel,
        [styles['label--required']]: required,
    });
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());
    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
    const datePickerRef = useRef(null);
    const inputRef = useRef(null);
    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];
    const years = Array.from({ length: maxDate.getFullYear() - minDate.getFullYear() }, (_, i) => minDate.getFullYear() + i);
    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
            if (onChange) {
                onChange(date);
            }
        }
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.removeSelection();
            }
        }, 0);
    };
    const handleCustomInputChange = (date) => {
        setSelectedDate(date);
    };
    const handleCloseDatePicker = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(false);
        }
    };
    const MonthPicker = ({ date }) => {
        const itemClasses = (type, isActive) => classNames(styles.listItem, styles[`listItem--${type}`], {
            [styles['item--active']]: isActive,
        });
        const [currentMonth, setCurrentMonth] = useState(date.getMonth());
        const [currentYear, setCurrentYear] = useState(date.getFullYear());
        const yearRefs = useRef([]);
        const monthRefs = useRef([]);
        const getRef = (refs, index) => {
            return (element) => {
                if (element && refs.current)
                    refs.current[index] = element;
            };
        };
        useEffect(() => {
            var _a;
            if (yearRefs.current[years.indexOf(currentYear)]) {
                (_a = yearRefs.current[years.indexOf(currentYear)]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }, [currentYear]);
        useEffect(() => {
            var _a;
            if (monthRefs.current[currentMonth]) {
                (_a = monthRefs.current[currentMonth]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }, [currentMonth]);
        return (React.createElement("div", { className: `${styles.monthPicker} ${styles.calendar}` },
            React.createElement("div", { className: styles.monthPickerWrapper },
                React.createElement("div", { className: styles.monthContainer }, months.map((month, index) => {
                    const monthClasses = itemClasses('month', months.indexOf(month) === currentMonth);
                    return (React.createElement("div", { key: month, ref: getRef(monthRefs, index), className: monthClasses, onClick: () => {
                            setCurrentMonth(months.indexOf(month));
                        } }, month));
                })),
                React.createElement("div", { className: styles.monthContainer }, years.map((year, index) => {
                    const yearClasses = itemClasses('year', year === currentYear);
                    return (React.createElement("div", { key: year, ref: getRef(yearRefs, index), className: yearClasses, onClick: () => {
                            setCurrentYear(year);
                        } }, year));
                }))),
            React.createElement("div", { className: styles.buttonContainer },
                React.createElement(Button, { condition: "info", onClick: () => {
                        setIsMonthPickerOpen(false);
                    } }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
                React.createElement(Button, { onClick: () => {
                        date.setMonth(currentMonth);
                        date.setFullYear(currentYear);
                        setIsMonthPickerOpen(false);
                    } }, "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"))));
    };
    const getMonthPickerWithDate = (date) => {
        return () => React.createElement(MonthPicker, { date: date });
    };
    const renderCustomHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled, }) => {
        return (React.createElement("div", { className: styles.calendarHeader },
            React.createElement("button", { type: "button", onClick: decreaseMonth, disabled: prevMonthButtonDisabled, className: styles.calendarNavButton },
                React.createElement(ChevronLeft, null)),
            React.createElement("div", { className: styles.monthDisplay, onClick: () => {
                    setIsMonthPickerOpen(true);
                } },
                months[date.getMonth()],
                ", ",
                date.getFullYear()),
            React.createElement("button", { type: "button", onClick: increaseMonth, disabled: nextMonthButtonDisabled, className: styles.calendarNavButton },
                React.createElement(ChevronRight, null))));
    };
    const renderDayContents = (day, date) => {
        return React.createElement("div", { className: styles.calendarDay }, day);
    };
    return (React.createElement("div", { className: wrapperClassess, style: style },
        label && (React.createElement(Typography, { variant: "Caption", className: labelClasses }, label)),
        React.createElement("div", { className: styles.icon, onClick: () => { var _a; return (_a = datePickerRef.current) === null || _a === void 0 ? void 0 : _a.setOpen(true); } }, icon || React.createElement(IconCalendar10, null)),
        React.createElement(DatePicker, Object.assign({ id: id, ref: datePickerRef, selected: selectedDate, onChange: handleDateChange, onBlur: onBlur, dateFormat: dateFormat, locale: "ru", readOnly: readOnly, disabled: disabled, showPopperArrow: false, calendarClassName: classNames(styles.calendar, calendarClassName), popperClassName: styles.calendarPopper, onCalendarClose: () => setIsMonthPickerOpen(false), minDate: minDate, maxDate: maxDate, inline: false, calendarStartDay: 1, dayClassName: (date) => {
                return date.getMonth() === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getMonth()) && date.getFullYear() === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getFullYear())
                    ? 'current-month-day'
                    : '';
            } }, (isMonthPickerOpen
            ? { calendarContainer: getMonthPickerWithDate(selectedDate || new Date()) }
            : {
                renderCustomHeader: renderCustomHeader,
                renderDayContents: renderDayContents,
            }), { customInput: React.createElement(CustomInput, { ref: inputRef, className: classNames(inputClassess, inputClassName), onDateChange: handleCustomInputChange, onClose: handleCloseDatePicker, disabled: disabled, readOnly: readOnly }) })),
        error && helperText && (React.createElement(Typography, { variant: "Caption", className: classNames(styles.helperText, styles[size]) }, helperText))));
};
