from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from bson.json_util import dumps
from bson.objectid import ObjectId
from bson.errors import InvalidId
import json
from pymongo import MongoClient
import datetime

app = Flask(__name__)
api = Api(app)

client = MongoClient(
    'mongodb+srv://iot:iotproject@cluster0.wow2pnq.mongodb.net/?retryWrites=true&w=majority')
db = client.flask_db
rooms = db.rooms

parser = reqparse.RequestParser()


class ROOMS(Resource):
    def get(self):

        ROOMS_OBJECT = {}

        where_clause = {}

        search_room = request.args.get("search_room")

        min_temperature = request.args.get("min_temperature")
        max_temperature = request.args.get("max_temperature")

        min_humidity = request.args.get("min_humidity")
        max_humidity = request.args.get("max_humidity")

        min_light = request.args.get("min_light")
        max_light = request.args.get("max_light")

        min_pressure = request.args.get("min_pressure")
        max_pressure = request.args.get("max_pressure")
        if search_room != None:
            where_clause['room.room_name'] = search_room

        # filter based on the given min and max temperature
        if min_temperature != None and max_temperature != None:
            where_clause['room.temperature'] = {
                '$gte': min_temperature, '$lte': max_temperature}
        # filter based on the given min and max humidity
        if min_humidity != None and max_humidity != None:
            where_clause['room.humidity'] = {
                '$gte': min_humidity, '$lte': max_humidity}
        # filter based on the given min and max light
        if min_light != None and max_light != None:
            where_clause['room.light'] = {
                '$gte': min_light, '$lte': max_light}
        # filter based on the given min and max pressure
        if min_pressure != None and max_pressure != None:
            where_clause['room.pressure'] = {
                '$gte': min_pressure, '$lte': max_pressure}

        all_rooms = rooms.aggregate(
            [
                {"$sort": {"room.time": -1}
                 }, {"$match": where_clause},
                {"$group": {"_id": "$room.room_name", "doc": {"$first": "$$ROOT"}}},
                {"$replaceRoot": {"newRoot": "$doc"}},
            ])
        ROOMS_OBJECT = json.loads(dumps(all_rooms, default=str))
        return ROOMS_OBJECT


class ROOM(Resource):
    def get(self, room_name):
        current_time = datetime.datetime.utcnow()
        past_time = current_time - datetime.timedelta(hours=24)
        past_time = past_time.strftime('%Y-%m-%d %H:%M:%S')
        current_time = current_time.strftime('%Y-%m-%d %H:%M:%S')

        try:
            room = rooms.find({"room.room_name": room_name, 'room.time': {
                              '$gte': past_time, '$lte': current_time}})
            room = json.loads(dumps(room, default=str))
            if not room:
                return "Not found", 404

            # Group the documents by 3 hour intervals
            data = {}
            for doc in room:
                time = datetime.datetime.strptime(
                    doc['room']['time'], '%Y-%m-%d %H:%M:%S')
                interval = (time.hour // 3) * 3
                if interval not in data:
                    data[interval] = []
                data[interval].append(doc)
            averages = {}
            for interval, documents in data.items():
                temperature_sum = 0
                humidity_sum = 0
                light_sum = 0
                pressure_sum = 0
                count = len(documents)
                for doc in documents:
                    temperature_sum += doc['room']['temperature']
                    humidity_sum += doc['room']['humidity']
                    light_sum += doc['room']['light']
                    pressure_sum += doc['room']['pressure']
                averages[f"{interval}-{interval+3}"] = {
                    'temperature': temperature_sum / count,
                    'humidity': humidity_sum / count,
                    'light': light_sum / count,
                    'pressure': pressure_sum / count
                }
            return averages
        except InvalidId:
            return "Not found", 404


@ app.route('/rooms/average_values')
def averageValues():

    current_time = datetime.datetime.utcnow()
    past_time = current_time - datetime.timedelta(hours=24)
    past_time = past_time.strftime('%Y-%m-%d %H:%M:%S')
    current_time = current_time.strftime('%Y-%m-%d %H:%M:%S')

    query = {'room.time': {'$gte': past_time, '$lte': current_time}}
    documents = rooms.find(query)

    # Group the documents by 3 hour intervals
    data = {}
    for doc in documents:
        time = datetime.datetime.strptime(
            doc['room']['time'], '%Y-%m-%d %H:%M:%S')
        interval = (time.hour // 3) * 3
        if interval not in data:
            data[interval] = []
        data[interval].append(doc)

    averages = {}
    for interval, documents in data.items():
        temperature_sum = 0
        humidity_sum = 0
        light_sum = 0
        pressure_sum = 0
        count = len(documents)
        for doc in documents:
            temperature_sum += doc['room']['temperature']
            humidity_sum += doc['room']['humidity']
            light_sum += doc['room']['light']
            pressure_sum += doc['room']['pressure']
        averages[f"{interval}-{interval+3}"] = {
            'temperature': temperature_sum / count,
            'humidity': humidity_sum / count,
            'light': light_sum / count,
            'pressure': pressure_sum / count
        }
    return averages


api.add_resource(ROOMS, '/rooms')
api.add_resource(ROOM, '/rooms/<room_name>/')


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8087)
