
# Project Butterfly | Annabel Zhang
# Animal Behavior
# Final Project
# 2022-04-21

from flask import Flask, request, render_template, redirect, session, jsonify

app = Flask(__name__)
app.secret_key = "butterfly"

@app.route("/", methods=['GET', 'POST'])
def welcome():
	return render_template("index.html")

if __name__ == "__main__": #false if this file imported as module
	#enable debugging, auto-restarting of server when this file is modified
	app.debug = True
	app.run()
