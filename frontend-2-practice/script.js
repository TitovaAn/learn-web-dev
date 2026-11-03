// ===== ДАННЫЕ =====
const MONTHS_NOMINATIVE = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const DAYS_OF_WEEK = [
  'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
  'Четверг', 'Пятница', 'Суббота'
];

const DAYS_OF_WEEK_SHORT = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

// Слоты времени (можно захардкодить или генерировать)
const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '12:00',
  '13:30', '14:00', '15:00', '16:30', '18:00'
];

// ===== СОСТОЯНИЕ =====
const state = {
  currentYear: 2026,
  currentMonth: 9, // Октябрь (0-индексный: 0=Январь, 9=Октябрь)
  selectedDay: null,
  selectedTime: null,
  today: new Date() // Сегодняшняя дата
};

// ===== ЧИСТЫЕ ФУНКЦИИ =====

// Сравнение двух дат (возвращает -1, 0, 1)
function compareDates(date1, date2) {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

// Проверка: можно ли выбрать день
function isDateSelectable(day, month, year, today) {
  const date = new Date(year, month, day);
  return compareDates(date, today) >= 0;
}

// Построение сетки календаря
function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // День недели первого дня (0=Вс, 1=Пн, ..., 6=Сб)
  let firstDayOfWeek = firstDay.getDay();
  // Превращаем в 0=Пн, 1=Вт, ..., 6=Вс
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  const weeks = [];
  let currentWeek = [];
  
  // Пустые ячейки до первого дня
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }
  
  // Дни месяца
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  
  // Последняя неделя (если не полная)
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }
  
  return weeks;
}

// ===== РЕНДЕР =====

// Рендер календаря
function renderCalendar() {
  const calendarGrid = document.querySelector('.calendar-grid');
  if (!calendarGrid) return;
  
  const weeks = buildCalendarGrid(state.currentYear, state.currentMonth);
  
  let html = '';
  
  // Заголовки дней недели
  DAYS_OF_WEEK_SHORT.forEach(day => {
    html += `<div class="calendar-grid__weekday">${day}</div>`;
  });
  
  // Дни
  weeks.forEach(week => {
    week.forEach(day => {
      if (day === null) {
        html += `<span class="calendar-grid__day calendar-grid__day--other"></span>`;
      } else {
        const isSelectable = isDateSelectable(day, state.currentMonth, state.currentYear, state.today);
        const isSelected = state.selectedDay === day && 
                          state.currentMonth === new Date().getMonth() && 
                          state.currentYear === new Date().getFullYear();
        
        let classes = 'calendar-grid__day';
        if (!isSelectable) {
          classes += ' calendar-grid__day--disabled';
        }
        if (isSelected) {
          classes += ' calendar-grid__day--selected';
        }
        
        html += `<button class="${classes}" data-day="${day}" ${!isSelectable ? 'disabled' : ''}>${day}</button>`;
      }
    });
  });
  
  calendarGrid.innerHTML = html;
  
  // Вешаем обработчики на дни
  const dayButtons = calendarGrid.querySelectorAll('.calendar-grid__day:not(.calendar-grid__day--other):not(.calendar-grid__day--disabled)');
  dayButtons.forEach(button => {
    button.addEventListener('click', onDayClick);
  });
  
  // Обновляем заголовок месяца
  const monthTitle = document.querySelector('.calendar-card__month');
  if (monthTitle) {
    monthTitle.textContent = `${MONTHS_NOMINATIVE[state.currentMonth]} ${state.currentYear}`;
  }
}

// Рендер слотов времени
function renderTimeSlots() {
  const timePanel = document.querySelector('.time-panel');
  if (!timePanel) return;
  
  if (!state.selectedDay) {
    // Если день не выбран — показываем пустую панель
    timePanel.innerHTML = `
      <h3 class="time-panel__title">Доступное время</h3>
      <div class="time-slots">
        ${TIME_SLOTS.map(time => `<button class="time-slot" disabled>${time}</button>`).join('')}
      </div>
    `;
    return;
  }
  
  // Форматируем дату
  const date = new Date(state.currentYear, state.currentMonth, state.selectedDay);
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
  const day = state.selectedDay;
  const month = MONTHS_GENITIVE[state.currentMonth];
  
  timePanel.innerHTML = `
    <h3 class="time-panel__title">${dayOfWeek}, ${day} ${month}</h3>
    <p class="time-panel__subtitle">Доступное время</p>
    <div class="time-slots">
      ${TIME_SLOTS.map(time => {
        const isSelected = state.selectedTime === time;
        const classes = isSelected ? 'time-slot time-slot--selected' : 'time-slot';
        return `<button class="${classes}" data-time="${time}">${time}</button>`;
      }).join('')}
    </div>
  `;
  
  // Вешаем обработчики на слоты
  const timeButtons = timePanel.querySelectorAll('.time-slot:not([disabled])');
  timeButtons.forEach(button => {
    button.addEventListener('click', onTimeSlotClick);
  });
  
  // Обновляем нижнюю панель
  updateBottomBar();
}

// Обновление нижней панели (кнопка "Продолжить")
function updateBottomBar() {
  const continueBtn = document.querySelector('.btn--primary');
  if (!continueBtn) return;
  
  if (state.selectedDay && state.selectedTime) {
    continueBtn.disabled = false;
    continueBtn.classList.remove('btn--disabled');
    
    // Можно добавить текст с выбранной датой и временем
    const date = new Date(state.currentYear, state.currentMonth, state.selectedDay);
    const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
    const day = state.selectedDay;
    const month = MONTHS_GENITIVE[state.currentMonth];
    const year = state.currentYear;
    
    continueBtn.textContent = `Продолжить: ${dayOfWeek}, ${day} ${month} ${year}, ${state.selectedTime}`;
  } else {
    continueBtn.disabled = true;
    continueBtn.classList.add('btn--disabled');
    continueBtn.textContent = 'Продолжить';
  }
}

// ===== ОБРАБОТЧИКИ =====

function onDayClick(event) {
  const day = parseInt(event.currentTarget.dataset.day);
  
  // Сбрасываем выбранное время при смене дня
  state.selectedTime = null;
  state.selectedDay = day;
  
  // Перерисовываем
  renderCalendar();
  renderTimeSlots();
}

function onTimeSlotClick(event) {
  const time = event.currentTarget.dataset.time;
  state.selectedTime = time;
  
  // Перерисовываем слоты (чтобы подсветить выбранный)
  renderTimeSlots();
}

function onPrevMonth() {
  state.currentMonth--;
  if (state.currentMonth < 0) {
    state.currentMonth = 11;
    state.currentYear--;
  }
  renderCalendar();
}

function onNextMonth() {
  state.currentMonth++;
  if (state.currentMonth > 11) {
    state.currentMonth = 0;
    state.currentYear++;
  }
  renderCalendar();
}

function setupMonthNavigation() {
  const prevBtn = document.querySelector('.calendar-card__nav--prev');
  const nextBtn = document.querySelector('.calendar-card__nav--next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', onPrevMonth);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', onNextMonth);
  }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====

function init() {
  // Устанавливаем начальные значения (например, сегодня)
  const today = new Date();
  state.currentYear = today.getFullYear();
  state.currentMonth = today.getMonth();
  state.selectedDay = today.getDate();
  
  // Первый рендер
  renderCalendar();
  renderTimeSlots();
  
  // Навешиваем обработчики на стрелки
  setupMonthNavigation();
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', init);