export default function Breadcrumbs() {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <a href="#" className="breadcrumbs__link">Главная</a>
      <span className="breadcrumbs__sep">/</span>
      <span className="breadcrumbs__current">Онлайн-запись</span>
    </nav>
  )
}