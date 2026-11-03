export default function Stepper() {
  return (
    <div className="stepper">
      <div className="stepper__step stepper__step--done">
        <span className="stepper__icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="stepper__label">Мастер и услуга</span>
      </div>
      <div className="stepper__line"></div>
      <div className="stepper__step stepper__step--active">
        <span className="stepper__number">3</span>
        <span className="stepper__label">Дата и время</span>
      </div>
    </div>
  )
}