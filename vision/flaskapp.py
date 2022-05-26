import math
import cv2
import numpy as np
from time import  time
import mediapipe as mp
import sys
from flask import Flask,  Response,request, send_file
from matplotlib import pyplot as plt
import requests
from flask_cors import CORS, cross_origin
import os
import json
import logging

# MediaPipe Architectures for body pose estimation. 
mp_pose = mp.solutions.pose
mp_pose2 = mp.solutions.pose

#For drawing landmarks
mp_drawing = mp.solutions.drawing_utils

#Hashes for communication with database and frontend
input_hash = {"eid":0,"weak":"LEFT","type":1,"isFinished":False,"pid":2}
output_hash = {"max": [], "hip": []}

#Flask server app initialization
app = Flask(__name__)

#In order to enable the sharing mechanism that allows
# restricted resources on a web page to be requested from another domain outside the domain
#we use flask cors policy
CORS(app, support_credentials=True)
logging.getLogger('flask_cors').level = logging.DEBUG

a = 0
#Axes domains for the output graph.
axes_x = [0.0, 110.32]
axes_y = [0.0, 178.69]


def detectPose(image, pose, display=True,drawBool=False):
    # Setting up the Pose function.
    # Initializing mediapipe drawing class, useful for annotation.
    
    # Create a copy of the input image.
    output_image = image.copy()
    # Convert the image from BGR into RGB format.
    imageRGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # Perform the Pose Detection.
    results = pose.process(imageRGB)
    # Retrieve the height and width of the input image.
    height, width, _ = image.shape
    # Initialize a list to store the detected landmarks.
    landmarks = []
    # Check if any landmarks are detected.
    if results.pose_landmarks:
        # Draw Pose landmarks on the output image.
        if drawBool:
            mp_drawing.draw_landmarks(
                output_image,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=15, circle_radius=10))
        # Iterate over the detected landmarks.
        for landmark in results.pose_landmarks.landmark:
            # Append the landmark into the list.
            landmarks.append((int(landmark.x * width), int(landmark.y * height),
                              (landmark.z * width)))
    # Return the output image and the found landmarks.
    return output_image, landmarks


def calculateAngle2D(landmark1, landmark2, landmark3):
    # Get the required landmarks coordinates.
    x1, y1, _ = landmark1
    x2, y2, _ = landmark2
    x3, y3, _ = landmark3
    # Calculate the angle between the three points
    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) - math.atan2(y1 - y2, x1 - x2))
    # Check if the angle is less than zero.
    if angle < 0:
        # Add 360 to the found angle.
        angle += 360
    return int(angle)


def calculateAngle3D(Angle1, Angle2):
    # make correction
    if 90.5 > Angle1 > 89.5:
        Angle1 = 89
    if 90.5 > Angle2 > 89.5:
        Angle2 = 89
    inside = math.tan(math.radians(Angle1)) ** 2 + math.tan(math.radians(Angle2)) ** 2
    angle3D = math.degrees(math.atan(math.sqrt(inside)))
    if Angle1 > 90 and Angle2 > 90:
        angle3D = 180 - angle3D
    return int(angle3D)

#This function takes 4 variables, and returns the calculated angles.
# ex_id -> Exercise id that is assigned for each specific exercise
#Landmark1 -> Landmark points that are coming from the MediaPipe Pose(front)
#Landmark1 -> Landmark points that are coming from the MediaPipe Pose(side)
#Direction -> Which side of an arm is weak
def Selector(Ex_id, Landmark1, Landmark2, Direction):
    if Direction == 'RIGHT':
        if Ex_id == 1:
            # Makara exercise front
            return Exer1(Landmark1, Landmark2)
        elif Ex_id == 2:
            # Makara exercise side
            return Exer2(Landmark1, Landmark2)
        elif Ex_id == 3:
            # Stick Exercise front
            return Exer3(Landmark1, Landmark2)
        elif Ex_id == 4:
            # Stick Exercise side
            return Exer4(Landmark1, Landmark2)
        else:
            return -180, -180
    elif Direction == 'LEFT':
        if Ex_id == 1:
            # Makara exercise front
            return Exer5(Landmark1, Landmark2)
        elif Ex_id == 2:
            # Makara exercise side
            return Exer6(Landmark1, Landmark2)
        elif Ex_id == 3:
            # Stick Exercise front
            return Exer7(Landmark1, Landmark2)
        elif Ex_id == 4:
            # Stick Exercise side
            return Exer8(Landmark1, Landmark2)
        else:
            return -180, -180
    else:
        return -180, -180


def Exer1(landmarks1, landmarks2):
    shoulder_angle = 0
    hip_angle = 0
    shoulder_angle_back = 0
    if landmarks1:
        shoulder_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                          landmarks1[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                          landmarks1[mp_pose.PoseLandmark.RIGHT_ELBOW.value])
        hip_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                     landmarks1[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                     landmarks1[mp_pose.PoseLandmark.RIGHT_KNEE.value])
    if landmarks2:
        shoulder_angle_back = calculateAngle2D(landmarks2[mp_pose2.PoseLandmark.RIGHT_HIP.value],
                                               landmarks2[mp_pose2.PoseLandmark.RIGHT_SHOULDER.value],
                                               landmarks2[mp_pose2.PoseLandmark.RIGHT_ELBOW.value])

    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back)
    return angle3D, hip_angle


def Exer2(landmarks1, landmarks2):
    shoulder_angle = 0
    hip_angle = 0
    shoulder_angle_back = 0
    if landmarks1:
        shoulder_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                          landmarks1[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                          landmarks1[mp_pose.PoseLandmark.RIGHT_ELBOW.value])
    if landmarks2:
        shoulder_angle_back = calculateAngle2D(landmarks2[mp_pose2.PoseLandmark.RIGHT_HIP.value],
                                               landmarks2[mp_pose2.PoseLandmark.RIGHT_SHOULDER.value],
                                               landmarks2[mp_pose2.PoseLandmark.RIGHT_ELBOW.value])
        hip_angle = calculateAngle2D(landmarks2[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                     landmarks2[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                     landmarks2[mp_pose.PoseLandmark.RIGHT_KNEE.value])
    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back)
    return angle3D, hip_angle


def Exer3(landmarks1, landmarks2):
    shoulder_angle = 0
    hip_angle = 0
    shoulder_angle_back = 0
    if landmarks1:
        shoulder_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                          landmarks1[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                          landmarks1[mp_pose.PoseLandmark.RIGHT_ELBOW.value])
        hip_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                     landmarks1[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                     landmarks1[mp_pose.PoseLandmark.RIGHT_KNEE.value])
    if landmarks2:
        shoulder_angle_back = calculateAngle2D(landmarks2[mp_pose2.PoseLandmark.RIGHT_HIP.value],
                                               landmarks2[mp_pose2.PoseLandmark.RIGHT_SHOULDER.value],
                                               landmarks2[mp_pose2.PoseLandmark.RIGHT_ELBOW.value])
    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back)
    return angle3D, hip_angle


def Exer4(landmarks1, landmarks2):
    shoulder_angle = 0
    hip_angle = 0
    shoulder_angle_back = 0
    if landmarks1:
        shoulder_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                          landmarks1[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                          landmarks1[mp_pose.PoseLandmark.RIGHT_ELBOW.value])
    if landmarks2:
        shoulder_angle_back = calculateAngle2D(landmarks2[mp_pose2.PoseLandmark.RIGHT_HIP.value],
                                               landmarks2[mp_pose2.PoseLandmark.RIGHT_SHOULDER.value],
                                               landmarks2[mp_pose2.PoseLandmark.RIGHT_ELBOW.value])
        hip_angle = calculateAngle2D(landmarks2[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                     landmarks2[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                     landmarks2[mp_pose.PoseLandmark.RIGHT_KNEE.value])
    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back)
    return angle3D, hip_angle


def Exer5(landmarks1, landmarks2):
    shoulder_angle = 0
    hip_angle = 0
    shoulder_angle_back = 0
    if landmarks1:
        shoulder_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.LEFT_HIP.value],
                                          landmarks1[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                          landmarks1[mp_pose.PoseLandmark.LEFT_ELBOW.value])
        hip_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                     landmarks1[mp_pose.PoseLandmark.LEFT_HIP.value],
                                     landmarks1[mp_pose.PoseLandmark.LEFT_KNEE.value])
    if landmarks2:
        shoulder_angle_back = calculateAngle2D(landmarks2[mp_pose2.PoseLandmark.LEFT_HIP.value],
                                               landmarks2[mp_pose2.PoseLandmark.LEFT_SHOULDER.value],
                                               landmarks2[mp_pose2.PoseLandmark.LEFT_ELBOW.value])
    angle3D = calculateAngle3D(360 - shoulder_angle, 360 - shoulder_angle_back)
    return angle3D, hip_angle


def Exer6(landmarks1, landmarks2):
    shoulder_angle = 0
    hip_angle = 0
    shoulder_angle_back = 0
    if landmarks1:
        shoulder_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.LEFT_HIP.value],
                                          landmarks1[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                          landmarks1[mp_pose.PoseLandmark.LEFT_ELBOW.value])
    if landmarks2:
        shoulder_angle_back = calculateAngle2D(landmarks2[mp_pose2.PoseLandmark.LEFT_HIP.value],
                                               landmarks2[mp_pose2.PoseLandmark.LEFT_SHOULDER.value],
                                               landmarks2[mp_pose2.PoseLandmark.LEFT_ELBOW.value])
        hip_angle = calculateAngle2D(landmarks2[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                     landmarks2[mp_pose.PoseLandmark.LEFT_HIP.value],
                                     landmarks2[mp_pose.PoseLandmark.LEFT_KNEE.value])
    angle3D = calculateAngle3D(360 - shoulder_angle, 360 - shoulder_angle_back)
    return angle3D, hip_angle


def Exer7(landmarks1, landmarks2):
    shoulder_angle = 0
    hip_angle = 0
    shoulder_angle_back = 0
    if landmarks1:
        shoulder_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.LEFT_HIP.value],
                                          landmarks1[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                          landmarks1[mp_pose.PoseLandmark.LEFT_ELBOW.value])
        hip_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                     landmarks1[mp_pose.PoseLandmark.LEFT_HIP.value],
                                     landmarks1[mp_pose.PoseLandmark.LEFT_KNEE.value])
    if landmarks2:
        shoulder_angle_back = calculateAngle2D(landmarks2[mp_pose2.PoseLandmark.LEFT_HIP.value],
                                               landmarks2[mp_pose2.PoseLandmark.LEFT_SHOULDER.value],
                                               landmarks2[mp_pose2.PoseLandmark.LEFT_ELBOW.value])
    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back)
    return angle3D, hip_angle


def Exer8(landmarks1, landmarks2):
    shoulder_angle = 0
    hip_angle = 0
    shoulder_angle_back = 0
    if landmarks1:
        shoulder_angle = calculateAngle2D(landmarks1[mp_pose.PoseLandmark.LEFT_HIP.value],
                                          landmarks1[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                          landmarks1[mp_pose.PoseLandmark.LEFT_ELBOW.value])
    if landmarks2:
        shoulder_angle_back = calculateAngle2D(landmarks2[mp_pose2.PoseLandmark.LEFT_HIP.value],
                                               landmarks2[mp_pose2.PoseLandmark.LEFT_SHOULDER.value],
                                               landmarks2[mp_pose2.PoseLandmark.LEFT_ELBOW.value])
        hip_angle = calculateAngle2D(landmarks2[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                     landmarks2[mp_pose.PoseLandmark.LEFT_HIP.value],
                                     landmarks2[mp_pose.PoseLandmark.LEFT_KNEE.value])
    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back)
    return angle3D, hip_angle

#This function takes an array which has two values for x and y values.
def rotate(point):
    angle = 45
    ox, oy = 0, 0
    px, py = point
    qx = ox + math.cos(angle) * (px - ox) - math.sin(angle) * (py - oy)
    qy = oy + math.sin(angle) * (px - ox) + math.cos(angle) * (py - oy)
    return qx, qy


#This function creates the output graph for the datapoints.
def plot_graph():
    total_max = output_hash["max"]
    total_hip = output_hash["hip"]
    total_max = [s for s in total_max if s != -511 ]
    total_hip = [s for s in total_hip if s != -511 ]
    if len(total_max)>0:
        lastx =total_max[-1]
        lasty = total_hip[-1]
        total_max =total_max[0:-1]
        total_hip = total_hip[0:-1]
        plt.plot(total_max, total_hip, 'o', 'b',markersize= 12)
        plt.plot([lastx], [lasty], 'g^',markersize= 12)
    
    plt.plot(axes_x, axes_y, linestyle='-', color='k')
    plt.xlim(0, 110)
    plt.ylim(0, 180)
    plt.savefig('/Users/adarbayan/Desktop/COMP491_Git_Desktop/ptt-project/front-end/src/testplot1.png')
    plt.savefig('/Users/adarbayan/Desktop/COMP491_Git_Desktop/ptt-project/front-end/src/testplot2.png')
    plt.close()

#Sending skeleton video to the frontend.
@app.route('/video')
@cross_origin(supports_credentials=True)
def video():
    print("I am in the video")
    output_hash ["max"]= []
    output_hash["hip"]= []
    return Response(pose_estimation(), mimetype='multipart/x-mixed-replace; boundary=frame')



#Fetching and sending data to frontend.
@app.route("/data", methods=["GET", "POST"])
@cross_origin(supports_credentials=True,allow_headers='*')
def getdata():
    json_lst=request.json

    ex_id = json_lst['id']
    weak = json_lst['weak']
    ex_type = json_lst['type']
    isFinished = json_lst['isFinished']
    patient_id =  json_lst['pid']
    
    print("pdf will created")
    os.system("python3 graph_output.py " + str(patient_id))
    print("pdf is ready")
    
    print("taken data")
    print(isFinished)
    print(ex_id)
    print(weak)
    print(ex_type)
    print(patient_id)
    print()

    input_hash['isFinished'] = isFinished
    input_hash["pid"] =  patient_id
    input_hash["eid"]=ex_id
    input_hash["weak"]=weak
    input_hash["type"]=ex_type

    return ""

def pose_estimation():
    side=input_hash["weak"]
    exercise=input_hash["type"]

    print("\tweek side is ", side)
    print("\texercise number is " + str(exercise))
    # Setup Pose function for video.
    pose_video = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.1,
                              min_tracking_confidence=0.1)

    # Setup Pose function for video2.
    pose_video2 = mp_pose2.Pose(static_image_mode=False, min_detection_confidence=0.1,
                                min_tracking_confidence=0.1)

    # Initialize the VideoCapture object to read from the webcam.
    # video is external camera (Side)
    # video2 is front camera
    video = cv2.VideoCapture(0)
    video2 = cv2.VideoCapture(1)

    # Set video camera size
    #1280 960
    video.set(3, 1280)
    video.set(4, 960)
    video2.set(3, 1280)
    video2.set(4, 960)

    # Initialize a variable to store the time of the previous frame.
    time1 = 0
    local_max = 0
    ret_shoul = []
    ret_hip = []
    for i in range(10):
        output_hash["max"].append(-511)
        output_hash["hip"].append(-511)
        ret_hip.append(-511)
        ret_shoul.append(-511)
    count = 0
    lastx = -511
    lasty = -511
    NRLX = 0
    NRLY = 0

    # Iterate until the video is accessed successfully.
    while video.isOpened() and video2.isOpened():

        # Read a frames.
        ok, frame = video.read()
        ok2, frame2 = video2.read()

        # Flip the frame horizontally for natural (selfie-view) visualization.
        #frame = cv2.flip(frame, 1)
        #frame2 = cv2.flip(frame2, 1)

        # Get the width and height of the frames
        frame_height, frame_width, _ = frame.shape
        frame2_height, frame2_width, _ = frame2.shape

        # Resize the frames while keeping the aspect ratio.
        frame = cv2.resize(frame, (int(frame_width * (480 / frame_height)), 480))
        frame2 = cv2.resize(frame2, (int(frame2_width * (480 / frame2_height)), 480))
        image = frame

        # Perform Pose landmarks detection.
        frame, landmarks= detectPose(frame, pose_video, display=False,drawBool=True)
        frame2, landmarks2= detectPose(frame2, pose_video2, display=False,drawBool=True)

        ##### Calculate angle
        angle3D, hip_angle = Selector(exercise, landmarks, landmarks2, side)
        # Set the time for this frame to the current time.
        time2 = time()

        # Check if the difference between the previous and this frame time > 0 to avoid division by zero.
        if (time2 - time1) > 0:
            
            if angle3D > local_max and angle3D > 20:
                local_max = angle3D
                # this list should returned
                lastx = int(local_max)
                lasty = int(hip_angle) - 180
                NRLX, NRLY = int(lastx), int(lasty)
                [a ,b] = rotate([lastx, lasty])
                output_hash["max"][count] = a
                output_hash["hip"][count] = b

            # Figure saved here
            plot_graph()
            if angle3D < 35 and local_max > 45:
                local_max = 0
                ret_shoul[count] = NRLX
                ret_hip[count] = NRLY
                count += 1

        # 10 repetation is done
        if count == 10 or input_hash['isFinished']:
            print("Ten exercise finished")
            print("total arm angle")
            print(ret_shoul)
            print("hip angles")
            print(ret_hip)
            ret_shoul = [s for s in ret_shoul if s != -511 ]
            ret_hip = [s for s in ret_hip if s != -511 ]
            ex_id=input_hash["eid"]
            json_str = {"shoulder": ret_shoul, "hip": ret_hip}
            url_str='http://physio-env.eba-u4ctwpu4.eu-central-1.elasticbeanstalk.com/api/exercise/{}'.format(ex_id)
            r = requests.put(url=url_str,json=json_str)
            print(r.status_code)
            
            input_hash['isFinished'] = False
            sys.exit()
            # Break the loop.
            # break

        # Update the previous frame time to this frame time.
        # As this frame will become previous frame in next iteration.
        time1 = time2

        image_2=frame

        # Skeleton


        skeleton = image_2 - image
        white_skeleton = np.array(skeleton)
        white_skeleton = np.where(white_skeleton > 0, 255, white_skeleton)

        white_skeleton = cv2.flip(white_skeleton, 1)

        ret, buffer = cv2.imencode('.jpg', white_skeleton)
        flask_output = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + flask_output + b'\r\n')

    # Release the VideoCapture object.
    video.release()

# ---------------------------------------------#

def main():
    app.run(debug=True, threaded=True)



main()
