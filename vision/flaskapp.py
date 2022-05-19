from distutils.log import debug
import math
from urllib import request
from flask_sock import Sock
import cv2
import numpy as np
from time import sleep, time
import mediapipe as mp
import sys
from flask import Flask, render_template, Response
from flask_socketio import SocketIO, send
from matplotlib import pyplot as plt
import requests

mp_pose = mp.solutions.pose
mp_pose2 = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
video = cv2.VideoCapture(0)
video2 = cv2.VideoCapture(1)
#total_max = []
#total_hip = []
output_hash={"max":[],"hip":[]}
app = Flask(__name__)
app.config['SECRET_KEY'] = 'fener1453'
socketio=SocketIO(app,cors_allowed_origins="*")
a = 0
sock = Sock(app)
@sock.route('/echo')
def echo(sock):
    global a
    a=1
    while True:
        a+=1
        sleep(0.5)
        total_max=output_hash["max"]
        total_hip=output_hash["hip"]
        hmp={"total_max":total_max,"total_hip":total_hip}
        sock.send(hmp)
"""

@socketio.on("message")
def sendArray():
    expected_len=1
    while 1:
        sleep(0.5)
        hmp={"total_max":total_max,"total_hip":total_hip}
        send(hmp,broadcast=True)"""
axes_x = [0, 210]
axes_y = [0, 0]

def detectPose(image, pose, display=True):
    # Initializing mediapipe pose class.
    mp_pose = mp.solutions.pose
    # Setting up the Pose function.
    # Initializing mediapipe drawing class, useful for annotation.
    mp_drawing = mp.solutions.drawing_utils
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
    return output_image, landmarks, results.pose_landmarks

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

    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back);
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

    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back);
    return angle3D, hip_angle

def rotate( point):
    angle = 45
    ox, oy = 0,0
    px, py = point
    qx = ox + math.cos(angle) * (px - ox) - math.sin(angle) * (py - oy)
    qy = oy + math.sin(angle) * (px - ox) + math.cos(angle) * (py - oy)
    return qx, qy

def set_axes():
    for i in range(2):
        point = [axes_x[i], axes_y[i]]
        axes_x[i], axes_y[i] = rotate( point)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video')
def video():
    print("hhfhj")
    return Response(helper(), mimetype='multipart/x-mixed-replace; boundary=frame')


def helper():
    #thread = socketio.start_background_task(target=sendArray)
    """
    Taking input inside
    side = input("Enter week side of patient! (RIGHT or LEFT)\n")
    print("\tweek side is ", side)
    exercise = int(input("Enter exercise number of patient!(1-4)\n"))
    print("\texercise number is " + str(exercise))
    """
    set_axes()
    side = sys.argv[1]
    exercise = int(sys.argv[2])

    print("\tweek side is ", side)
    print("\texercise number is " + str(exercise))
    # Setup Pose function for video.
    pose_video = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.2,
                              min_tracking_confidence=0.2)  # , model_complexity=1)

    # Setup Pose function for video2.
    pose_video2 = mp_pose2.Pose(static_image_mode=False, min_detection_confidence=0.2,
                                min_tracking_confidence=0.2)  # , model_complexity=1)

    # Initialize the VideoCapture object to read from the webcam.
    # video is external camera (Side)
    # video2 is front camera
    video = cv2.VideoCapture(0)
    video2 = cv2.VideoCapture(1)

    # Create named window for resizing purposes
    cv2.namedWindow('Pose Detection', cv2.WINDOW_NORMAL)

    # Set video camera size
    video.set(3, 1280)
    video.set(4, 960)
    video2.set(3, 1280)
    video2.set(4, 960)

    # Initialize a variable to store the time of the previous frame.
    time1 = 0
    angle_list = []
    local_max = 0
    ret_shoul=[]
    ret_hip=[]
    for i in range(10):
        output_hash["max"].append(-5)
        output_hash["hip"].append(-5)
        #total_max.append(-5)
        #total_hip.append(-5)
        ret_hip.append(-5)
        ret_shoul.append(-5)
    count = 0
    lastx=-5
    lasty=-5
    NRLX=0
    NRLY=0

    # Iterate until the video is accessed successfully.
    while video.isOpened() and video2.isOpened():

        # Read a frames.
        ok, frame = video.read()
        ok2, frame2 = video2.read()

        # Check if frame is not read properly.
        if not ok:
            # Break the loop.
            break

        # Flip the frame horizontally for natural (selfie-view) visualization.
        # frame = cv2.flip(frame, 1)
        # frame2 = cv2.flip(frame2, 1)

        # Get the width and height of the frames
        frame_height, frame_width, _ = frame.shape
        frame2_height, frame2_width, _ = frame2.shape

        # Resize the frames while keeping the aspect ratio.
        frame = cv2.resize(frame, (int(frame_width * (640 / frame_height)), 640))
        frame2 = cv2.resize(frame2, (int(frame2_width * (640 / frame2_height)), 640))
        image1 = frame2
        frame2.flags.writeable = False
        image = cv2.cvtColor(image1, cv2.COLOR_BGR2RGB)

        # Perform Pose landmarks detection.
        frame, landmarks, result_land = detectPose(frame, pose_video, display=False)
        frame2, landmarks2, result_land2 = detectPose(image, pose_video2, display=False)

        ##### Calculate angle
        # shoulder, hip = Selector(1,landmarks,landmarks2)

        angle3D, hip_angle = Selector(exercise, landmarks, landmarks2, side)
        # Set the time for this frame to the current time.
        time2 = time()

        # Check if the difference between the previous and this frame time > 0 to avoid division by zero.
        if (time2 - time1) > 0:
            # Calculate the number of frames per second.
            frames_per_second = 1.0 / (time2 - time1)

            # Write the calculated number of frames per second on the frame.
            cv2.putText(frame, 'FPS: {}'.format(int(frames_per_second)), (10, 30), cv2.FONT_HERSHEY_PLAIN, 2,
                        (0, 255, 0), 3)
            # cv2.putText(frame, 'Hip angle: {}'.format(int(hip_angle)), (200, 30), cv2.FONT_HERSHEY_PLAIN, 2,
            #           (0, 255, 0), 3) '# exercise '+str(exercise)+' '+
            cv2.putText(frame, side + ' shoulder angle : {}'.format(int(angle3D)), (200, 30), cv2.FONT_HERSHEY_PLAIN, 2,
                        (0, 255, 0), 3)
            angle_list.append(angle3D)
            # print("total angle  "+str(angle3D))

            if angle3D > local_max and angle3D > 20:
                local_max = angle3D
                # this list should returned
                lastx = int(local_max)
                lasty = int(hip_angle) - 180
                NRLX, NRLY = int(lastx), int(lasty)
                #print("shoulder angle " + str(angle3D))


            plt.close("all")
            lastx, lasty = rotate( [lastx, lasty])
            total_max=output_hash["max"]
            total_hip=output_hash["hip"]
            plt.plot(total_max, total_hip, 'o', 'b')
            plt.plot([lastx], [lasty], 'g^')
            plt.plot(axes_x, axes_y, linestyle='-', color='k')
            plt.xlim(0, 110)
            plt.ylim(0, 180)
            plt.show(block=False)
            """
            plt.savefig('testplot.png')
            graphIMage = Image.open('testplot.png').save('testplot.jpg', 'JPEG')
            #"""
            if angle3D < 35 and local_max > 45:
                local_max = 0
                output_hash["max"][count]=lastx
                output_hash["hip"][count]=lasty
            
                
                #total_max[count] = lastx
                #total_hip[count] = lasty
                ret_shoul[count] = NRLX
                ret_hip[count]= NRLY
                #print("hip angle " + str(hip_angle))
                count += 1

        # 10 repetation is done
        if count == 10:
            print("Ten exercise finished")
            print("total arm angle")
            print(ret_shoul)
            print("hip angles")
            print(ret_hip)

            json={"shoulder": ret_shoul, "hip": ret_hip}
            r = requests.put('http://physio-env.eba-u4ctwpu4.eu-central-1.elasticbeanstalk.com/api/exercise/74', json={"shoulder": ret_shoul, "hip": ret_hip})
            print(r.status_code)
            #"""
            sys.exit()
            # Break the loop.
            #break
        # Update the previous frame time to this frame time.
        # As this frame will become previous frame in next iteration.
        time1 = time2

        combination = np.hstack((frame, frame2))
        # Display the frame.
        cv2.imshow('Pose Detection', combination)

        # Wait until a key is pressed.
        # Retreive the ASCII code of the key pressed
        k = cv2.waitKey(1) & 0xFF

        # Check if 'ESC' is pressed.

        if k == 27:
            print("total arm angle")
            print(total_max)
            print("hip angles")
            print(total_hip)
            # Break the loop.
            break
        success, image = ok2, frame2

        # To improve performance, optionally we mark the image as not writeable to
        # pass by reference.

        # Draw the pose annotation on the image.
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # Skeleton

        skeleton = image - image1
        white_skeleton = np.array(skeleton)
        white_skeleton = np.where(white_skeleton > 0, 255, white_skeleton)

        ret, buffer = cv2.imencode('.jpg', white_skeleton)
        flask_output = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + flask_output + b'\r\n')


    # Release the VideoCapture object.
    video.release()
    # Close the windows.
    cv2.destroyAllWindows()
    



# ---------------------------------------------#

def main():
    app.run(debug=True)
    #socketio.run(app,debug=True)


main()
