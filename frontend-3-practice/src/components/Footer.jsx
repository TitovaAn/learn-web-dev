export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Линия</span>
          <p className="footer__tagline">Салон красоты, где вам рады</p>
        </div>
        <div className="footer__contacts">
          <h4 className="footer__heading">КОНТАКТЫ</h4>
          <p>Ярославль, ул. Большая Никитская, 22</p>
          <p>Ежедневно · 10:00–21:00</p>
        </div>
        <div className="footer__reach">
          <h4 className="footer__heading">СВЯЗАТЬСЯ</h4>
          <p>+7 (495) 123-45-67</p>
          <p>gmai@liniya.staly</p>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Line_Salon</span>
        <a href="#" className="footer__policy">Политика конфиденциальности</a>
      </div>
    </footer>
  )
}