import React, {
  FC,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DateInputProps } from '../../types';
import styles from './DateInput.module.css';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { IconCalendar } from '../../Icons/IconCalendar/IconCalendar';

import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import { enUS } from 'date-fns/locale/en-US';
import { ChevronRight } from '../../Icons/ChevronRight/ChevronRight';
import { ChevronLeft } from '../../Icons/ChevronLeft/ChevronLeft';
import { Button } from '../Button/Button';

registerLocale('ru', ru);
registerLocale('en', enUS);

interface CustomInputProps {
  value?: string;
  lng?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onClose?: () => void;
  onDateChange?: (date: Date) => void;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  dateFormat?: string;
}

interface SelectionPositions {
  day: { start: number; end: number };
  month: { start: number; end: number };
  year: { start: number; end: number };
}

interface CustomDatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  inputClassName?: string;
  calendarClassName?: string;
  dateFormat?: string;
}

interface MonthPickerProps {
  date: Date;
}

type DatePart = 'day' | 'month' | 'year';

const CustomInput = forwardRef<{ removeSelection: () => void }, CustomInputProps>(
  ({ value = '', lng, onClick, onDateChange, onClose, className, disabled=false, readOnly=false, dateFormat='dd.MM.yyyy' }, ref) => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedPart, setSelectedPart] = useState<DatePart | null>(null);
    const [tempInput, setTempInput] = useState<string>('');
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const [shouldReselect, setShouldReselect] = useState<boolean>(false);
    const [input, setInput] = useState(value);

    const separator = dateFormat.includes('.') ? '.' : dateFormat.includes('-') ? '-' : '/';

    const positions: SelectionPositions = {
      day: { start: 0, end: 2 },
      month: { start: 3, end: 5 },
      year: { start: 6, end: 10 },
    };

    const placeholderText = lng === 'ru' ? 'Не выбрано' : 'Not selected';
    const displayValue = value || placeholderText;

    const selectDatePart = (part: DatePart): void => {
      setSelectedPart(part);
      setTempInput('');
      setShouldReselect(true);
    };

    const highlightDatePart = () => {
      if (!shouldReselect || !inputRef.current || !hasFocus || selectedPart === null) return;
      const pos = positions[selectedPart];
      if (inputRef.current && document.activeElement === inputRef.current) {
        inputRef.current.setSelectionRange(pos.start, pos.end);
      }
    };

    const updateInputValue = (char: string, position: number) => {
      setShouldReselect(true);
      if (!readOnly) {
        setInput(input.substring(0, position) + char + input.substring(position + char.length));
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>): void => {
      e.preventDefault();
      if (onClick) onClick(e);

      if (!inputRef.current) return;

      setHasFocus(true);

      if (value) {
        const cursorPosition = inputRef.current.selectionStart || 0;

        let newSelectedPart: DatePart;
        if (cursorPosition <= positions.day.end) {
          newSelectedPart = 'day';
        } else if (cursorPosition <= positions.month.end) {
          newSelectedPart = 'month';
        } else {
          newSelectedPart = 'year';
        }

        selectDatePart(newSelectedPart);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (!inputRef.current || !onDateChange || selectedPart === null) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (selectedPart === 'month') {
          selectDatePart('day');
        } else if (selectedPart === 'year') {
          selectDatePart('month');
        }
      } else if (e.key === 'ArrowRight' || e.key === separator) {
        e.preventDefault();
        if (selectedPart === 'day') {
          selectDatePart('month');
        } else if (selectedPart === 'month') {
          selectDatePart('year');
        }
      } else if (/^\d$/.test(e.key)) {
        e.preventDefault();

        const dateRegex = new RegExp(`^\\d{2}\\${separator}\\d{2}\\${separator}\\d{4}$`);
        if (!dateRegex.test(input)) {
          const today = new Date();
          handleDateUpdate(today, e.key);
          return;
        }

        const [day, month, year] = input.split(separator).map((part) => parseInt(part, 10));
        const currentDate = new Date(year, month - 1, day);

        handleDateUpdate(currentDate, e.key);
      } else if (e.key === 'Tab') {
        if (e.shiftKey) {
          e.preventDefault();
          if (selectedPart === 'year') {
            selectDatePart('month');
          } else if (selectedPart === 'month') {
            selectDatePart('day');
          }
        } else {
          e.preventDefault();
          if (selectedPart === 'day') {
            selectDatePart('month');
          } else if (selectedPart === 'month') {
            selectDatePart('year');
          }
        }
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        selectDatePart(selectedPart);
      }
    };

    const handleDateUpdate = (currentDate: Date, key: string): void => {
      if (!onDateChange || selectedPart === null) return;

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
      } else if (selectedPart === 'month') {
        if (newTempInput.length === 1) {
          updateInputValue(key, positions.month.start);
          return;
        }

        updateInputValue(key, positions.month.start + 1);
        let newMonth = parseInt(newTempInput, 10);
        newDate.setMonth(newMonth - 1);
        onDateChange(newDate);
        selectDatePart('year');
      } else if (selectedPart === 'year') {
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

    const handleFocus = (): void => {
      setHasFocus(true);
      if (value) {
        selectDatePart('day');
      }
    };

    const handleBlur = (): void => {
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

    useImperativeHandle(
      ref,
      () => ({
        removeSelection,
      }),
      [removeSelection]
    );

    return (
      <input
        ref={inputRef}
        value={input || displayValue}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={() => {}}
        readOnly={!value || readOnly}
        disabled={disabled}
        className={className}
      />
    );
  }
);

export const DateInput: FC<DateInputProps & CustomDatePickerProps> = ({
  id,
  label = 'Выберите дату',
  size = 'lg',
  value,
  style,
  className,
  disabled = false,
  readOnly = false,
  isLeftLabel = false,
  icon,
  error = false,
  helperText,
  onChange,
  onBlur,
  required = false,
  lng = 'ru',

  minDate = new Date('1975-12-31'),
  maxDate = new Date('2074-12-31'),
  inputClassName,
  calendarClassName,
  dateFormat = 'dd.MM.yyyy',
}) => {
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

  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  const datePickerRef = useRef<any>(null);
  const inputRef = useRef<{ removeSelection: () => void } | null>(null);

  const weekDays = lng === 'ru' ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const months =
    lng === 'ru'
      ? [
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
        ]
      : [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];

  const years = Array.from({ length: maxDate.getFullYear() - minDate.getFullYear() }, (_, i) => minDate.getFullYear() + i);

  const handleDateChange = (date: Date | null): void => {
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

  const handleCustomInputChange = (date: Date): void => {
    setSelectedDate(date);
  };

  const handleCloseDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const MonthPicker: FC<MonthPickerProps> = ({ date }): ReactElement => {

    const itemClasses = (type: string, isActive: boolean) => classNames(styles.listItem, styles[`listItem--${type}`], {
      [styles['item--active']]: isActive,
    });

    const [currentMonth, setCurrentMonth] = useState(date.getMonth());
    const [currentYear, setCurrentYear] = useState(date.getFullYear());

    const yearRefs = useRef<Array<HTMLDivElement | null>>([]);
    const monthRefs = useRef<Array<HTMLDivElement | null>>([]);

    const getRef = (refs: React.MutableRefObject<Array<HTMLDivElement | null>>, index: number) => {
      return (element: HTMLDivElement | null) => {
        if (element && refs.current) refs.current[index] = element;
      };
    };

    useEffect(() => {
      if (yearRefs.current[years.indexOf(currentYear)]) {
        yearRefs.current[years.indexOf(currentYear)]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }, [currentYear]);

    useEffect(() => {
      if (monthRefs.current[currentMonth]) {
        monthRefs.current[currentMonth]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }, [currentMonth]);

    return (
      <div className={`${styles.monthPicker} ${styles.calendar}`}>
        <div className={styles.monthPickerWrapper}>
          <div className={styles.monthContainer}>
            {months.map((month, index) => {
              const monthClasses = itemClasses('month', months.indexOf(month) === currentMonth);
              return (
                <div
                  key={month}
                  ref={getRef(monthRefs, index)}
                  className={monthClasses}
                  onClick={() => {
                    setCurrentMonth(months.indexOf(month));
                  }}
                >
                  {month}
                </div>
              );
            })}
          </div>
          <div className={styles.monthContainer}>
            {years.map((year, index) => {
              const yearClasses = itemClasses('year', year === currentYear);
              return (
                <div
                  key={year}
                  ref={getRef(yearRefs, index)}
                  className={yearClasses}
                  onClick={() => {
                    setCurrentYear(year);
                  }}
                >
                  {year}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            condition="info"
            onClick={() => {
              setIsMonthPickerOpen(false);
            }}
          >
            {lng === 'ru' ? "Отмена" : "Cancel"}
          </Button>
          <Button
            onClick={() => {
              date.setMonth(currentMonth);
              date.setFullYear(currentYear);
              setIsMonthPickerOpen(false);
            }}
          >
             {lng === 'ru' ? "Применить" : "Apply"}
          </Button>
        </div>
      </div>
    );
  };

  const getMonthPickerWithDate = (date: Date) => {
    return () => <MonthPicker date={date} />;
  };

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps): ReactElement => {
    return (
      <div className={styles.calendarHeader}>
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className={styles.calendarNavButton}
        >
          <ChevronLeft />
        </button>

        <div
          className={styles.monthDisplay}
          onClick={() => {
            setIsMonthPickerOpen(true);
          }}
        >
          {months[date.getMonth()]}, {date.getFullYear()}
        </div>

        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className={styles.calendarNavButton}
        >
          <ChevronRight />
        </button>
      </div>
    );
  };

  const renderDayContents = (day: number, date: Date): ReactElement => {
    return <div className={styles.calendarDay}>{day}</div>;
  };

  return (
    <div className={wrapperClassess} style={style}>
      {label && (
        <Typography variant="Caption" className={labelClasses}>
          {label}
        </Typography>
      )}
      <div className={styles.icon} onClick={() => datePickerRef.current?.setOpen(true)}>
        {icon || <IconCalendar />}
      </div>
      <DatePicker
        id={id}
        ref={datePickerRef}
        selected={selectedDate}
        onChange={handleDateChange}
        onBlur={onBlur}
        dateFormat={dateFormat}
        locale={lng === 'ru' ? 'ru' : 'en'}
        readOnly={readOnly}
        disabled={disabled}
        showPopperArrow={false}
        calendarClassName={classNames(styles.calendar, calendarClassName)}
        popperClassName={styles.calendarPopper}
        onCalendarClose={() => setIsMonthPickerOpen(false)}
        minDate={minDate}
        maxDate={maxDate}
        inline={false}
        calendarStartDay={1}
        formatWeekDay={(dayName) => {
          const dayIndex = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье']
            .findIndex(day => day === dayName);

          return weekDays[dayIndex];
        }}

        dayClassName={(date) => {
          return date.getMonth() === selectedDate?.getMonth() && date.getFullYear() === selectedDate?.getFullYear()
            ? 'current-month-day'
            : '';
        }}
        
        {...(isMonthPickerOpen
          ? { calendarContainer: getMonthPickerWithDate(selectedDate || new Date()) }
          : {
              renderCustomHeader: renderCustomHeader,
              renderDayContents: renderDayContents,
            })}

        customInput={
          <CustomInput
            ref={inputRef}
            lng={lng}
            className={classNames(inputClassess, inputClassName)}
            onDateChange={handleCustomInputChange}
            onClose={handleCloseDatePicker}
            disabled={disabled}
            readOnly={readOnly}
            dateFormat={dateFormat}
          />
        }
      />
      {error && helperText && (
        <Typography variant="Caption" className={classNames(styles.helperText, styles[size])}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};
