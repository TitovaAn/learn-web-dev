from datetime import datetime


class Appointment:
    def __init__(self, appointment_id: int, client_name: str, 
                 master_id: int, service_id: int, time: str):
        self.id = appointment_id
        self.client_name = client_name
        self.master_id = master_id
        self.service_id = service_id
        self.time = time


class Master:
    def __init__(self, master_id: int):
        self.master_id = master_id


class Service:
    def __init__(self, service_id: int):
        self.service_id = service_id


def get_master(master_id: int):
    return Master(master_id) if master_id > 0 else None


def get_service(service_id: int):
    return Service(service_id) if service_id > 0 else None


def _is_valid_time(time: str) -> bool:
    try:
        appointment_time = datetime.strptime(time, "%H:%M")
        start_time = datetime.strptime("08:00", "%H:%M")
        end_time = datetime.strptime("20:00", "%H:%M")
        return start_time <= appointment_time <= end_time
    except ValueError:
        return False


def create_appointment(client_name: str, 
                       master_id: int, 
                       service_id: int, 
                       time: str):
    if not client_name or not time:
        return None
    
    master = get_master(master_id)
    service = get_service(service_id)
    
    if master is None or service is None:
        return None
    
    if not _is_valid_time(time):
        return None
    
    appointment = Appointment(
        appointment_id=len(appointments) + 1,
        client_name=client_name,
        master_id=master.master_id,
        service_id=service.service_id,
        time=time,
    )
    appointments.append(appointment)
    return appointment


appointments = []

# Задание 1
print("Задание 1:")
first_appointment = create_appointment("Иванова А.А.", 1, 1, '10:00')
second_appointment = create_appointment("Петрова А.А.", 1, 1, '11:00')
print("Список записей:")
for appointment in appointments:
    print(appointment.client_name, appointment.time)

no_correct_appointment = create_appointment("", 1, 1, '12:00')
print(len(appointments))

# Задание 2
print("Задание 2:")
appointments.clear()

first_appointment = create_appointment("Иванова А.А.", 1, 1, '10:00')
second_appointment = create_appointment("Петрова А.А.", 1, 1, '11:00')
print("Список записей:")
for appointment in appointments:
    print(appointment.client_name, appointment.time)

no_correct_appointment = create_appointment("Сидорова А.А.", 1, 1, '00:00')
print(len(appointments))