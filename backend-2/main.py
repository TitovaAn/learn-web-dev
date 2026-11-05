from flask import Flask, jsonify

app = Flask(__name__)
app.json.ensure_ascii = False

categories = [
    {"id": 1, "name": "Стрижки и укладки"},
    {"id": 2, "name": "Маникюр и педикюр"},
    {"id": 3, "name": "Брови и ресницы"},
    {"id": 4, "name": "Спа-процедуры"}
]

services = [
    {"id": 1,  "categoryId": 1, "name": "Женская стрижка"},
    {"id": 2,  "categoryId": 1, "name": "Мужская стрижка"},
    {"id": 3,  "categoryId": 1, "name": "Детская стрижка"},
    {"id": 4,  "categoryId": 1, "name": "Укладка"},
    {"id": 5,  "categoryId": 1, "name": "Окрашивание"},
    {"id": 6,  "categoryId": 2, "name": "Маникюр классический"},
    {"id": 7,  "categoryId": 2, "name": "Маникюр аппаратный"},
    {"id": 8,  "categoryId": 2, "name": "Педикюр"},
    {"id": 9,  "categoryId": 2, "name": "Покрытие гель-лак"},
    {"id": 10, "categoryId": 2, "name": "Дизайн ногтей"},
    {"id": 11, "categoryId": 3, "name": "Коррекция бровей"},
    {"id": 12, "categoryId": 3, "name": "Окрашивание бровей"},
    {"id": 13, "categoryId": 3, "name": "Наращивание ресниц"},
    {"id": 14, "categoryId": 3, "name": "Ламинирование ресниц"},
    {"id": 15, "categoryId": 4, "name": "Массаж лица"},
    {"id": 16, "categoryId": 4, "name": "Массаж тела"},
    {"id": 17, "categoryId": 4, "name": "Обёртывание"},
    {"id": 18, "categoryId": 4, "name": "Пилинг"}
]

def get_services_count(category_id):
    """Считает количество услуг в категории."""
    return len([s for s in services if s["categoryId"] == category_id])


# ЗАДАНИЕ 1. список категорий
@app.route("/categories", methods=["GET"])
def get_categories():
    """Возвращает список всех категорий с количеством услуг."""
    result = [
        {
            "id": category["id"],
            "name": category["name"],
            "servicesCount": get_services_count(category["id"])
        }
        for category in categories
    ]
    return jsonify(result), 200


# ЗАДАНИЕ 2. информация по категории
@app.route("/categories/<category_id>", methods=["GET"])
def get_category(category_id):
    """Возвращает информацию о конкретной категории."""
    # Проверяем, что id — это число
    try:
        category_id = int(category_id)
    except ValueError:
        return "Category not found", 404

    # Ищем категорию
    category = next((c for c in categories if c["id"] == category_id), None)

    if not category:
        return "Category not found", 404

    return jsonify({
        "id": category["id"],
        "name": category["name"],
        "servicesCount": get_services_count(category["id"])
    }), 200


# Запуск
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)