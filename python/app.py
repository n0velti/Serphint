# python/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/add": {"origins": "*"}})

# In app.py, add logging
@app.route('/add', methods=['POST'])
def add_five():
    print('Received request:', request.get_json())
    data = request.get_json()
    number = data.get('number', 0)
    result = number + 5
    response = {'result': result}
    print('Sending response:', response)
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=3000)