from flask import Flask, render_template
import os

app = Flask(__name__)

picFolder = os.path.join('static', 'pics')
print(picFolder)
app.config['UPLOAD_FOLDER'] = picFolder


@app.route("/")
def index():
    pic1 = os.path.join(app.config['UPLOAD_FOLDER'], 'b.png')
    return render_template("index.html", user_image=pic1)   


@app.route("/index")
def index1():
    return "hello"


app.run()