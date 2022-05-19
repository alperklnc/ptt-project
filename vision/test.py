# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask,request, jsonify
from flask_cors import CORS, cross_origin
import os
  
# Flask constructor takes the name of 
# current module (_name_) as argument.
app = Flask(__name__)
CORS(app, support_credentials=True)
  
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.





@app.route("/data", methods=["POST"])
@cross_origin(supports_credentials=True)
def setdata():
    print("selam")
    id_ = request.json['id']
    weak = request.json['weak']
    type_ = request.json['type']
    print(id_)
    print(weak)
    print(type_)
    os.system("python flaskapp.py "+weak+id)
    return id_





if __name__=="__main__":
    app.run(debug=True)
