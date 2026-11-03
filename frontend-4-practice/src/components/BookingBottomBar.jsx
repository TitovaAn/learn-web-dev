import { DAYS_OF_WEEK, MONTHS_GENITIVE } from '../data/date'

export default function BookingBottomBar({ currentYear, currentMonth, selectedDay, selectedTime }) {
  const isReady = selectedDay && selectedTime
  
  let buttonText = 'Продолжить'
  if (isReady) {
    const date = new Date(currentYear, currentMonth, selectedDay)
    const dayOfWeek = DAYS_OF_WEEK[date.getDay()]
    const month = MONTHS_GENITIVE[currentMonth]
    buttonText = `Продолжить: ${dayOfWeek}, ${selectedDay} ${month} ${currentYear}, ${selectedTime}`
  }
  
  return (
    <div className="actions">
      <a href="#" className="btn btn--outline">Назад</a>
      <button className={`btn btn--primary ${!isReady ? 'btn--disabled' : ''}`} disabled={!isReady}>
        {buttonText}
      </button>
    </div>
  )
}