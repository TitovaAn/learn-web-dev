import { db, getSlotsByDate } from './database.js'

const DELAY_MS = 800

export function setupServer(middlewares) {
  middlewares.use((req, res, next) => {
    if (req.url.startsWith('/api/booking/today')) {
      setTimeout(() => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(db.today))
      }, DELAY_MS)
      return
    }

    if (req.url.startsWith('/api/slots')) {
      const url = new URL(req.url, `http://${req.headers.host}`)
      const day = Number(url.searchParams.get('day'))
      const month = Number(url.searchParams.get('month'))
      const year = Number(url.searchParams.get('year'))

      setTimeout(() => {
        const data = getSlotsByDate(day, month, year)
        res.setHeader('Content-Type', 'application/json')
        if (!data) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Ошибка сервера при получении слотов' }))
        } else {
          res.end(JSON.stringify(data))
        }
      }, DELAY_MS)
      return
    }

    next()
  })
}