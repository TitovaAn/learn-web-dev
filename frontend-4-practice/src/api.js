export async function fetchToday() {
  const response = await fetch('/api/booking/today')
  if (!response.ok) {
    throw new Error('Не удалось загрузить текущую дату')
  }
  return response.json()
}

export async function fetchSlots(day, month, year) {
  const response = await fetch(`/api/slots?day=${day}&month=${month}&year=${year}`)
  if (!response.ok) {
    throw new Error('Не удалось загрузить доступное время')
  }
  return response.json()
}