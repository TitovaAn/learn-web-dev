import { buildCalendarGrid, isDateSelectable, DAYS_OF_WEEK_SHORT, MONTHS_NOMINATIVE } from '../data/date'

export default function CalendarCard({ currentYear, currentMonth, selectedDay, today, onDayClick, onPrevMonth, onNextMonth }) {
  const weeks = buildCalendarGrid(currentYear, currentMonth)
  
  return (
    <div className="calendar-card">
      <div className="calendar-card__header">
        <button className="calendar-card__nav calendar-card__nav--prev" onClick={onPrevMonth} aria-label="Предыдущий месяц">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#2D2640" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="calendar-card__month">{MONTHS_NOMINATIVE[currentMonth]} {currentYear}</h2>
        <button className="calendar-card__nav calendar-card__nav--next" onClick={onNextMonth} aria-label="Следующий месяц">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="#2D2640" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="calendar-grid">
        {DAYS_OF_WEEK_SHORT.map(day => (
          <div className="calendar-grid__weekday" key={day}>{day}</div>
        ))}
        
        {weeks.map((week, weekIndex) => (
          week.map((day, dayIndex) => {
            if (day === null) {
              return <span className="calendar-grid__day calendar-grid__day--other" key={`${weekIndex}-${dayIndex}`}></span>
            }
            
            const isSelectable = isDateSelectable(day, currentMonth, currentYear, today)
            const isSelected = selectedDay === day
            
            let className = 'calendar-grid__day'
            if (!isSelectable) className += ' calendar-grid__day--disabled'
            if (isSelected) className += ' calendar-grid__day--selected'
            
            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                className={className}
                disabled={!isSelectable}
                onClick={() => isSelectable && onDayClick(day)}
              >
                {day}
              </button>
            )
          })
        ))}
      </div>
    </div>
  )
}