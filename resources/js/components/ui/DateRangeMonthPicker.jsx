import React, { useMemo, useRef, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { it } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css";

/**
 * Versatile date picker:
 * - mode: "single" | "range"
 * - precision: "day" | "month" | "year"
 * - value: Date | [Date|null, Date|null]
 * - onChange: (Date) => void | ([Date|null, Date|null]) => void
 *
 * Backward compatibility:
 * - You can still pass { startDate, endDate, onChange } like before (month range).
 *   If `value` is not provided and `startDate/endDate` are, it will use those.
 */

// Year boundaries
const MIN_YEAR = 1950;
const CURRENT_YEAR = new Date().getFullYear();

const dpCss = `
  .melap-date-wrapper { width: 100%; display: block; position: relative; }
  .melap-date-input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #e6e8ef;
    border-radius: 12px;
    padding: 12px 14px 12px 40px;
    font-size: 16px;
    outline: none;
    background: #fbfbfe;
    min-height: 46px;
    display: block;
    position: relative;
  }
  .melap-date-wrapper .melap-date-icon {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    font-size: 18px; opacity: .65; pointer-events: none; z-index: 2;
  }
  .melap-dp { border: 0; border-radius: 16px; box-shadow: 0 24px 48px rgba(20,23,38,.12); overflow: hidden; }
  .melap-dp .react-datepicker__header { background: #f5f4ff; border-bottom: 1px solid rgba(20,23,38,.06); padding-top: 8px; }
  .melap-dp__headerbar { display:flex; align-items:center; justify-content:space-between; padding: 8px 12px; }
  .melap-dp__title { font-weight: 800; color: #1f2d3d; }
  .melap-dp__nav { background: #ffffff; border: 1px solid rgba(20,23,38,.08); width:28px; height:28px; border-radius: 8px; cursor:pointer; }
  .melap-dp__nav:hover { border-color: #ffbf00; }
  .melap-dp__nav:disabled { opacity: .35; cursor: not-allowed; }
  .melap-dp .react-datepicker__month { margin: 8px; }
  .melap-dp .react-datepicker__month-text { border-radius: 10px; padding: 6px 8px; }
  .melap-dp .react-datepicker__month-text:hover { background: #ffef99; }
  .melap-dp .react-datepicker__month--selected,
  .melap-dp .react-datepicker__month-text--keyboard-selected,
  .melap-dp .react-datepicker__month-text--in-selecting-range,
  .melap-dp .react-datepicker__month-text--in-range { background: #ffbf00 !important; color: #1f2d3d !important; }
  .melap-dp .react-datepicker__triangle { display:none; }
  .melap-dp__year { appearance: none; background:#fff; border:1px solid rgba(20,23,38,.12); border-radius:10px; padding:4px 10px; font-weight:700; cursor:pointer; }
  .melap-dp__year:hover { border-color:#ffbf00; }

  /* Done button (top-right check) */
  .melap-dp__done {
    position:absolute; top:8px; right:8px;
    background:#ffbf00; border:none; border-radius:999px;
    padding:6px 10px; font-weight:800; cursor:pointer; color:#1f2d3d;
    box-shadow: 0 8px 18px rgba(255,191,0,0.35);
  }
`;

export default function DateRangeMonthPicker({
  // New API
  mode = 'range',                // "single" | "range"
  precision = 'month',           // "day" | "month" | "year"
  value,                         // Date | [Date|null, Date|null]
  onChange,                      // fn(Date) or fn([start, end])
  placeholder, 
  inputClassName = 'melap-date-input',
  wrapperClassName = 'melap-date-wrapper',
  calendarClassName = 'melap-dp',
  popperClassName = 'melap-dp-popper',
  popperPlacement = 'bottom-start',
  showDoneButton = true,         // shows ✔ inside the calendar (useful for ranges)
  // Back-compat props
  startDate,
  endDate,
}) {
  const dpRef = useRef(null);
  const [open, setOpen] = useState(false);

  // ---- Normalize value (support legacy startDate/endDate) ----
  const normalizedValue = useMemo(() => {
    if (typeof value !== 'undefined') return value;
    if (typeof startDate !== 'undefined' || typeof endDate !== 'undefined') {
      return [startDate ?? null, endDate ?? null];
    }
    return mode === 'range' ? [null, null] : null;
  }, [value, startDate, endDate, mode]);

  const [start, end] = Array.isArray(normalizedValue) ? normalizedValue : [normalizedValue, null];

  // ---- Years list for header select (from CURRENT_YEAR back to MIN_YEAR) ----
  const years = useMemo(() => {
    const span = CURRENT_YEAR - MIN_YEAR + 1;
    return Array.from({ length: span }, (_, i) => CURRENT_YEAR - i);
  }, []);

  // ---- Header variations ----
  const renderYearHeader = ({ date, changeYear, decreaseYear, increaseYear }) => {
    const y = date.getFullYear();
    const isAtMaxYear = y >= CURRENT_YEAR;
    const isAtMinYear = y <= MIN_YEAR;
    return (
      <div className="melap-dp__headerbar">
        <button
          type="button"
          className="melap-dp__nav"
          onClick={isAtMinYear ? undefined : decreaseYear}
          aria-label="Anno precedente"
          disabled={isAtMinYear}
        >
          ‹
        </button>
        <div className="melap-dp__title">
          <select
            className="melap-dp__year"
            value={y}
            onChange={(e) => changeYear(Number(e.target.value))}
          >
            {years.map(yr => <option key={yr} value={yr}>{yr}</option>)}
          </select>
        </div>
        <button
          type="button"
          className="melap-dp__nav"
          onClick={isAtMaxYear ? undefined : increaseYear}
          aria-label="Anno successivo"
          disabled={isAtMaxYear}
        >
          ›
        </button>
      </div>
    );
  }

  // For "day" precision we keep the default monthly header (more natural).
  const headerForPrecision = useMemo(() => {
    if (precision === 'day') return undefined;
    return renderYearHeader;
  }, [precision]);

  // ---- React-datepicker flags by precision ----
  const pickerFlags = useMemo(() => {
    return {
      showMonthYearPicker: precision === 'month',
      showYearPicker: precision === 'year',
      // precision === 'day' -> none of the above
    }
  }, [precision]);

  // Props extra per precisione "day"
  const dayDropdownProps = precision === 'day'
    ? {
        showMonthDropdown: true,
        showYearDropdown: true,
        dropdownMode: 'select',
        scrollableYearDropdown: true,
        yearDropdownItemNumber: 10,
      }
    : {}

  // ---- Handle changes from the DatePicker ----
  const handleChange = (val) => {
    if (mode === 'range') {
      // val is [start, end]
      onChange && onChange(val);
    } else {
      // single date
      onChange && onChange(val);
    }
  };

  // Close button inside calendar
  const DoneButton = () => {
    if (!showDoneButton) return null;
    return (
      <button
        type="button"
        className="melap-dp__done"
        onClick={() => setOpen(false)}
      >
        ✔
      </button>
    )
  };

  // Keep placeholder coherent with precision if caller doesn't override it
  const autoPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    if (mode === 'single') {
      if (precision === 'day') return 'gg/mm/aaaa';
      if (precision === 'month') return 'mm/aaaa';
      return 'aaaa';
    } else {
      if (precision === 'day') return 'gg/mm/aaaa - gg/mm/aaaa';
      if (precision === 'month') return 'mm/aaaa - mm/aaaa';
      return 'aaaa - aaaa';
    }
  }, [mode, precision, placeholder]);

  return (
    <>
      <style>{dpCss}</style>
      <div className={wrapperClassName}>
        <span className="melap-date-icon" aria-hidden>📅</span>
        <DatePicker
          ref={dpRef}
          onCalendarOpen={() => setOpen(true)}
          onCalendarClose={() => setOpen(false)}
          open={open}
          onClickOutside={() => setOpen(false)}
          onInputClick={() => setOpen(true)}
          // Mode
          selectsRange={mode === 'range'}
          // Values
          selected={mode === 'single' ? start : undefined}
          startDate={mode === 'range' ? start : undefined}
          endDate={mode === 'range' ? end : undefined}
          onChange={handleChange}
          // Precision
          {...pickerFlags}
          {...dayDropdownProps}
          dateFormat={precision === 'day' ? 'dd/MM/yyyy' : (precision === 'month' ? 'MM/yyyy' : 'yyyy')}
          // UI
          placeholderText={autoPlaceholder}
          className={inputClassName}
          wrapperClassName={wrapperClassName}
          locale={it}
          calendarClassName={calendarClassName}
          popperClassName={popperClassName}
          popperPlacement={popperPlacement}
          minDate={new Date(MIN_YEAR, 0, 1)}
          maxDate={new Date(CURRENT_YEAR, 11, 31)}
          shouldCloseOnSelect={precision === 'day' && mode === 'single'} // keep open for ranges or month/year selection
          renderCustomHeader={headerForPrecision}
        />
        {/* Inline button to close calendar */}
        {open && <DoneButton />}
      </div>
    </>
  )
}