import { useState, useEffect } from 'react'
import { fetchToday, fetchSlots } from './api'
import Header from './components/Header'
import Footer from './components/Footer'
import Breadcrumbs from './components/Breadcrumbs'
import Stepper from './components/Stepper'
import CalendarCard from './components/CalendarCard'
import TimePanel from './components/TimePanel'
import BookingBottomBar from './components/BookingBottomBar'

function App() {
  const [currentYear, setCurrentYear] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [todayDate, setTodayDate] = useState(null)
  const [isTodayLoading, setIsTodayLoading] = useState(true)
  const [todayError, setTodayError] = useState(null)
  
  const [isSlotsLoading, setIsSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState(null)
  const [slots, setSlots] = useState([])

  // Загружаем "сегодня" один раз при монтировании
  useEffect(() => {
    fetchToday()
      .then(data => {
        setCurrentYear(data.year)
        setCurrentMonth(data.month)
        setSelectedDay(data.day)
        setTodayDate(new Date(data.year, data.month, data.day))
        setIsTodayLoading(false)
      })
      .catch(err => {
        setTodayError(err.message)
        setIsTodayLoading(false)
      })
  }, [])

  // Загружаем слоты при изменении выбранной даты
  useEffect(() => {
    if (selectedDay === null || currentMonth === null || currentYear === null) return

    setIsSlotsLoading(true)
    setSlotsError(null)

    let isCancelled = false

    fetchSlots(selectedDay, currentMonth, currentYear)
      .then(data => {
        if (!isCancelled) {
          setSlots(data.slots || [])
          setSelectedTime(null)
          setIsSlotsLoading(false)
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setSlotsError(err.message)
          setIsSlotsLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [selectedDay, currentMonth, currentYear])

  const handleDayClick = (day) => {
    setSelectedDay(day)
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

  if (isTodayLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    )
  }

  if (todayError) {
    return (
      <div className="error-screen">
        <p>Ошибка: {todayError}</p>
        <button className="btn btn--primary" onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    )
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
              today={todayDate}
              onDayClick={handleDayClick}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            
            <TimePanel
              isSlotsLoading={isSlotsLoading}
              slotsError={slotsError}
              currentYear={currentYear}
              currentMonth={currentMonth}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              slots={slots}
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