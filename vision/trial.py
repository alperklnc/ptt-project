
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask,request, jsonify
  
# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
  
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.



"""
@app.route("/", methods=["GET","POST"])
def setdata():
    result = "result,hi"
    return jsonify({"key": result})
"""

@app.route("/", methods=["GET","POST"])
def getdata():
    value = request.json['key']
    return value




if __name__=="__main__":
    app.run(debug=True)