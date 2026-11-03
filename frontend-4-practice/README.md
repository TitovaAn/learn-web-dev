# Задание 4. Асинхронный JavaScript и создание React-приложений

## Описание

Перевод страницы «Выбор даты и времени» для онлайн-записи в салон красоты «Линия» на работу с имитационным сервером.
Данные (текущая дата и доступные слоты) теперь загружаются через `fetch` с локального API, а не хранятся в коде.
Добавлены состояния загрузки и обработки ошибок.

## Структура проекта

frontend-4-practice/
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── server/
│ ├── database.js 
│ └── server.js 
└── src/
├── main.jsx 
├── index.css 
├── App.jsx 
├── api.js 
├── components/
│ ├── Header.jsx
│ ├── Footer.jsx
│ ├── Breadcrumbs.jsx
│ ├── Stepper.jsx
│ ├── CalendarCard.jsx
│ ├── TimePanel.jsx 
│ └── BookingBottomBar.jsx
├── data/
│ └── date.js 
└── styles/
└── styles.css 

## Установить зависимости
npm install

## Запустить проект
npm run dev