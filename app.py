from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pymongo
import os

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/contact")
def about():
    return render_template("contact.html")

@app.route("/data")
def podcast():
    return render_template("data.html")

@app.route("/about")
def globe():
    return render_template("about.html")

if __name__ == '__main__':
	port = int(os.environ.get('PORT', 5000))
	app.run(host='0.0.0.0', port=port)
    #app.run(debug=True)