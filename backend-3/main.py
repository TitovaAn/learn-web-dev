from flask import Flask, jsonify, request
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

app = Flask(__name__)
app.json.ensure_ascii = False

# Создаём SQLite базу данных
engine = create_engine('sqlite:///salon.db', echo=False)
Base = declarative_base()
Session = sessionmaker(bind=engine)


# ЗАДАНИЕ 1: МОДЕЛЬ MASTER

class Master(Base):
    __tablename__ = 'masters'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)

    def to_dict(self):
        """Преобразует объект Master в словарь для JSON."""
        return {
            "id": self.id,
            "name": self.name,
            "specialization": self.specialization
        }


# Создаём таблицу в базе данных
Base.metadata.create_all(engine)


# Заполнение БД

def init_db():
    """Добавляет начальных мастеров, если таблица пустая."""
    session = Session()
    
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


# ЗАДАНИЕ 2: API МЕТОДЫ

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
    
    return jsonify([master.to_dict() for master in masters]), 200


@app.route("/masters/<int:master_id>", methods=["GET"])
def get_master(master_id):
    session = Session()
    
    master = session.query(Master).filter(Master.id == master_id).first()
    
    session.close()
    
    if not master:
        return "Master not found", 404
    
    return jsonify(master.to_dict()), 200


# Запуск

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)