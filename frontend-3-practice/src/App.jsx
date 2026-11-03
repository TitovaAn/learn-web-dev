import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Breadcrumbs from './components/Breadcrumbs'
import Stepper from './components/Stepper'
import CalendarCard from './components/CalendarCard'
import TimePanel from './components/TimePanel'
import BookingBottomBar from './components/BookingBottomBar'
import { TIME_SLOTS } from './data/date'

function App() {
  const today = new Date()
  
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [selectedTime, setSelectedTime] = useState(null)
  
  const handleDayClick = (day) => {
    setSelectedDay(day)
    setSelectedTime(null) // сбрасываем время при смене дня
  }
  
  const handleTimeClick = (time) => {
    setSelectedTime(time)
  }
  
  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1
    let newYear = currentYear
    if (newMonth < 0) {
      newMonth = 11
      newYear--
    }
    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }
  
  const handleNextMonth = () => {
    let newMonth = currentMonth + 1
    let newYear = currentYear
    if (newMonth > 11) {
      newMonth = 0
      newYear++
    }
    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }
  
  return (
    <>
      <Header />
      
      <main className="main">
        <div className="main__container">
          <Breadcrumbs />
          <Stepper />
          
          <h1 className="page-title">Когда вам удобно?</h1>
          <p className="page-subtitle">Выберите дату и свободное время для визита.</p>
          
          <div className="booking">
            <CalendarCard
              currentYear={currentYear}
              currentMonth={currentMonth}
              selectedDay={selectedDay}
              today={today}
              onDayClick={handleDayClick}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            
            <TimePanel
              currentYear={currentYear}
              currentMonth={currentMonth}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              timeSlots={TIME_SLOTS}
              onTimeClick={handleTimeClick}
            />
          </div>
          
          <BookingBottomBar
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedDay={selectedDay}
            selectedTime={selectedTime}
          />
        </div>
      </main>
      
      <Footer />
    </>
  )
}

export default App