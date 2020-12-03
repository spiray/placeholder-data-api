"""This is the main file for the Placeholder Data API"""
import flask
from flask import jsonify, request
from requests import get, post as req_post, put, patch, delete
from constants import BASE_URL

app = flask.Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    """This is the route handler for the home route"""
    return jsonify({
        'message': 'See "endpoints" for available endpoints/actions',
        'endpoints': {
            'GET_ALL': '/posts',
            'GET': '/posts?id=1',
            'POST': '/posts title body userID',
            'PUT': '/posts id title body userId',
            'PATCH': '/posts?id=1 title? body? userId?',
            'DELETE': '/posts?id=1'
        }
    })


@app.route('/posts/all', methods=['GET'])
def get_all_posts():
    """This is the route handler to get all posts"""
    posts = get(BASE_URL + '/posts').json()

    return jsonify(posts)


@app.route('/posts', methods=['GET'])
def get_post_by_id():
    """This is the route handler to get a post by ID"""
    if 'id' in request.args:
        post_id = request.args['id']
    post = get(BASE_URL + '/posts/' + post_id).json()

    return jsonify(post)


@app.route('/posts', methods=['POST'])
def create_post():
    """This is the route handler to create a post"""
    title, body, user_id = request.json.values()
    post = req_post(BASE_URL + '/posts', data={
        'title': title,
        'body': body,
        'userId': user_id
    }).json()

    return jsonify(post)


@app.route('/posts', methods=['PUT'])
def replace_post():
    """This is the route handler to replace a post"""
    post_id, title, body, user_id = request.json.values()
    post = put(BASE_URL + '/posts/' + post_id, data={
        'title': title,
        'body': body,
        'userId': user_id
    }).json()
    return jsonify(post)


@app.route('/posts', methods=['PATCH'])
def modify_post():
    """This is the route handler to modify a post"""
    body = request.json
    post = patch(BASE_URL + '/posts/' + request.args['id'], data=body).json()

    return jsonify(post)


@app.route('/posts', methods=['DELETE'])
def delete_post():
    """This is the route handler to delete a post"""
    res = delete(BASE_URL + '/posts/' + request.args['id'])

    return str(res.status_code)


app.run()
