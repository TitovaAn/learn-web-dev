import { DAYS_OF_WEEK, MONTHS_GENITIVE } from '../data/date'

export default function TimePanel({ 
  isSlotsLoading, 
  slotsError, 
  currentYear, 
  currentMonth, 
  selectedDay, 
  selectedTime, 
  slots, 
  onTimeClick 
}) {
  if (isSlotsLoading) {
    return (
      <div className="time-panel">
        <div className="loading-state">
          <div className="spinner spinner--small"></div>
          <p>Загрузка слотов...</p>
        </div>
      </div>
    )
  }

  if (slotsError) {
    return (
      <div className="time-panel">
        <div className="error-state">
          <p>Не удалось загрузить время. Попробуйте выбрать другой день.</p>
        </div>
      </div>
    )
  }

  if (!selectedDay || slots.length === 0) {
    return (
      <div className="time-panel">
        <div className="error-state">
          <p>На этот день нет свободных мест. Пожалуйста, выберите другую дату.</p>
        </div>
      </div>
    )
  }
  
  const date = new Date(currentYear, currentMonth, selectedDay)
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()]
  const month = MONTHS_GENITIVE[currentMonth]
  
  return (
    <div className="time-panel">
      <h3 className="time-panel__title">{dayOfWeek}, {selectedDay} {month}</h3>
      <p className="time-panel__subtitle">Доступное время</p>
      <div className="time-slots">
        {slots.map(slot => {
          const isDisabled = !slot.available
          const isSelected = selectedTime === slot.time && slot.available
          
          let className = 'time-slot'
          if (isDisabled) className += ' time-slot--disabled'
          if (isSelected) className += ' time-slot--selected'
          
          return (
            <button
              key={slot.time}
              className={className}
              disabled={isDisabled}
              onClick={() => !isDisabled && onTimeClick(slot.time)}
            >
              {slot.time}
            </button>
          )
        })}
      </div>
    </div>
  )
}