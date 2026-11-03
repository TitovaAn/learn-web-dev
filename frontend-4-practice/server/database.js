const today = new Date()

export const db = {
  today: {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  },
  slots: {
    [`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`]: {
      date: 'Сегодня',
      slots: [
        { time: '10:00', available: true },
        { time: '10:30', available: true },
        { time: '11:00', available: false },
        { time: '12:00', available: true },
        { time: '13:30', available: true },
        { time: '14:00', available: true },
        { time: '15:00', available: false },
        { time: '16:30', available: true },
        { time: '18:00', available: true },
      ]
    },
    [`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 1).padStart(2, '0')}`]: {
      date: 'Завтра',
      slots: [
        { time: '09:00', available: true },
        { time: '10:00', available: true },
        { time: '11:00', available: true },
      ]
    }
  }
}

export const getSlotsByDate = (day, month, year) => {
  if (day === 99) return null
  const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return db.slots[key] || { date: 'Нет данных', slots: [] }
}