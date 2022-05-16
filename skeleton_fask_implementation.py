import cv2
import mediapipe as mp
import numpy as np
from flask import Flask,render_template,Response,jsonify, render_template
import time
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose
a_list = [1]
# For webcam input:
app=Flask(__name__)
cap = cv2.VideoCapture(0)
def generate_frames():
  with mp_pose.Pose(
      min_detection_confidence=0.5,
      min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
      success, image = cap.read()
      if not success:
        print("Ignoring empty camera frame.")
        continue

      # To improve performance, optionally we mark the image as not writeable to
      # pass by reference.
      image.flags.writeable = False
      image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
      results = pose.process(image)

      # Draw the pose annotation on the image.
      image.flags.writeable = True
      image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
      image1= image.copy()
      mp_drawing.draw_landmarks(
          image,
          results.pose_landmarks,
          mp_pose.POSE_CONNECTIONS,
          mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2),
          mp_drawing.DrawingSpec(color=(245,66,230), thickness=15, circle_radius=10))
      #Skeleton
      
      print(a_list[0])
      skeleton = image-image1
      white_skeleton = np.array(skeleton)
      white_skeleton = np.where(white_skeleton>0,255,white_skeleton)
      ret,buffer=cv2.imencode('.jpg',white_skeleton)
      frame=buffer.tobytes()
    
      yield(b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    
    # Flip the image horizontally for a selfie-view display.
    cv2.imshow('MediaPipe Pose', cv2.flip(white_skeleton, 1))
    

def increase():
  return str(a_list[0])

@app.route('/')
def video():
    return Response(generate_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/data')
def data():
    return Response(increase())
  


if __name__=="__main__":
    app.run(debug=True)
   