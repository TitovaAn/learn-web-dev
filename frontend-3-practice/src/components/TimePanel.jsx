import { DAYS_OF_WEEK, MONTHS_GENITIVE } from '../data/date'

export default function TimePanel({ currentYear, currentMonth, selectedDay, selectedTime, timeSlots, onTimeClick }) {
  if (!selectedDay) {
    return (
      <div className="time-panel">
        <h3 className="time-panel__title">Доступное время</h3>
        <div className="time-slots">
          {timeSlots.map(time => (
            <button className="time-slot" disabled key={time}>{time}</button>
          ))}
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
        {timeSlots.map(time => {
          const isSelected = selectedTime === time
          const className = isSelected ? 'time-slot time-slot--selected' : 'time-slot'
          
          return (
            <button
              key={time}
              className={className}
              onClick={() => onTimeClick(time)}
            >
              {time}
            </button>
          )
        })}
      </div>
    </div>
  )
}