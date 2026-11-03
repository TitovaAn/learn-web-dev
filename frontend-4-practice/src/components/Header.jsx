export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="#" className="header__logo">
          <svg className="header__logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="6" cy="6" r="3"/>
            <circle cx="6" cy="18" r="3"/>
            <line x1="20" y1="4" x2="8.12" y2="15.88"/>
            <line x1="14.47" y1="14.48" x2="20" y2="20"/>
            <line x1="8.12" y1="8.12" x2="12" y2="12"/>
          </svg>
          <span className="header__logo-text">Линия</span>
        </a>
        <nav className="header__nav">
          <a href="#" className="header__nav-link">Услуги</a>
          <a href="#" className="header__nav-link">Мастера</a>
          <a href="#" className="header__nav-link">Отзывы</a>
          <a href="#" className="header__nav-link">Контакты</a>
        </nav>
      </div>
    </header>
  )
}