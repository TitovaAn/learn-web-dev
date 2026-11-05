from flask import Flask, jsonify, request
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from pydantic import BaseModel, Field, ValidationError

app = Flask(__name__)
app.json.ensure_ascii = False

engine = create_engine('sqlite:///salon.db', echo=False)
Base = declarative_base()
Session = sessionmaker(bind=engine)


# Модели БД

class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)

    services = relationship("Service", back_populates="category")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }


class Master(Base):
    __tablename__ = 'masters'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "specialization": self.specialization
        }


class Service(Base):
    __tablename__ = 'services'

    id = Column(Integer, primary_key=True, autoincrement=True)
    categoryId = Column(Integer, ForeignKey('categories.id'), nullable=False)
    title = Column(String(100), nullable=False)
    desc = Column(String(100), nullable=False)
    duration = Column(Integer, nullable=False)  # в минутах
    price = Column(Float, nullable=False)

    category = relationship("Category", back_populates="services")

    def to_dict(self):
        return {
            "id": self.id,
            "categoryId": self.categoryId,
            "title": self.title,
            "desc": self.desc,
            "duration": self.duration,
            "price": self.price
        }


# Создаём все таблицы
Base.metadata.create_all(engine)


# Заполнение БД начальными данными

def init_db():
    session = Session()

    if session.query(Category).count() == 0:
        categories = [
            Category(name="Стрижки и укладки"),
            Category(name="Маникюр и педикюр"),
            Category(name="Брови и ресницы"),
            Category(name="Спа-процедуры")
        ]
        session.add_all(categories)
        session.commit()

    if session.query(Master).count() == 0:
        masters = [
            Master(name="Анна", specialization="Парикмахер"),
            Master(name="Мария", specialization="Визажист"),
            Master(name="Елена", specialization="Парикмахер"),
            Master(name="Ольга", specialization="Маникюр"),
            Master(name="Татьяна", specialization="Визажист")
        ]
        session.add_all(masters)
        session.commit()

    session.close()


init_db()


# ЗАДАНИЕ 1: PYDANTIC-МОДЕЛЬ 

class ServiceCreate(BaseModel):
    categoryId: int = Field(..., description="Идентификатор категории")
    title: str = Field(..., min_length=1, max_length=100, description="Название услуги")
    desc: str = Field(..., min_length=1, max_length=100, description="Описание услуги")
    duration: int = Field(..., ge=30, le=180, description="Продолжительность в минутах (30-180)")
    price: float = Field(..., gt=0, description="Стоимость услуги (должна быть > 0)")

    model_config = {
        "json_schema_extra": {
            "examples": [{
                "categoryId": 3,
                "title": "Наращивание ресниц",
                "desc": "Огромные ресницы уже через 30 минут",
                "duration": 30,
                "price": 1500.00
            }]
        }
    }


# GET /masters — все мастера или фильтр по специализации
@app.route("/masters", methods=["GET"])
def get_masters():
    session = Session()
    specialization = request.args.get('specialization')

    if specialization:
        masters = session.query(Master).filter(
            Master.specialization == specialization
        ).all()
    else:
        masters = session.query(Master).all()

    session.close()
    return jsonify([m.to_dict() for m in masters]), 200


# GET /masters/<master_id> — один мастер по id
@app.route("/masters/<int:master_id>", methods=["GET"])
def get_master(master_id):
    session = Session()
    master = session.query(Master).filter(Master.id == master_id).first()
    session.close()

    if not master:
        return "Master not found", 404

    return jsonify(master.to_dict()), 200


# ЗАДАНИЕ 2: POST /services 

@app.route("/services", methods=["POST"])
def create_service():
    
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400

    # Валидируем через Pydantic
    try:
        service_data = ServiceCreate(**data)
    except ValidationError as e:
        # Возвращаем 422 с деталями ошибки валидации
        return jsonify({
            "error": "Validation error",
            "details": e.errors()
        }), 422

    session = Session()

    # Проверяем, что категория существует
    category = session.query(Category).filter(Category.id == service_data.categoryId).first()
    if not category:
        session.close()
        return jsonify({"error": f"Category with id {service_data.categoryId} not found"}), 404

    # Создаём новую услугу
    new_service = Service(
        categoryId=service_data.categoryId,
        title=service_data.title,
        desc=service_data.desc,
        duration=service_data.duration,
        price=service_data.price
    )

    session.add(new_service)
    session.commit()
    session.refresh(new_service)

    result = new_service.to_dict()
    session.close()

    return jsonify(result), 201


# GET /services — получить все услуги 
@app.route("/services", methods=["GET"])
def get_services():
    session = Session()
    services = session.query(Service).all()
    session.close()
    return jsonify([s.to_dict() for s in services]), 200


# Запуск

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)