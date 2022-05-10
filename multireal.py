import math
import cv2
import numpy as np
from time import time
import mediapipe as mp
import matplotlib.pyplot as plt

mp_pose = mp.solutions.pose;
mp_pose2 = mp.solutions.pose;


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
        mp_drawing.draw_landmarks(image=output_image, landmark_list=results.pose_landmarks,
                                  connections=mp_pose.POSE_CONNECTIONS)
        # Iterate over the detected landmarks.
        for landmark in results.pose_landmarks.landmark:
            # Append the landmark into the list.
            landmarks.append((int(landmark.x * width), int(landmark.y * height),
                              (landmark.z * width)))
    # Check if the original input image and the resultant image are specified to be displayed.
    if display:
        # Display the original input image and the resultant image.
        plt.figure(figsize=[22, 22])
        plt.subplot(121);
        plt.imshow(image[:, :, ::-1]);
        plt.title("Original Image");
        plt.axis('off');
        plt.subplot(122);
        plt.imshow(output_image[:, :, ::-1]);
        plt.title("Output Image");
        plt.axis('off');
        plt.show();
        ##this cause error
        # Also Plot the Pose landmarks in 3D.
        mp_drawing.plot_landmarks(results.pose_world_landmarks, mp_pose.POSE_CONNECTIONS)
    # Otherwise
    else:
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

    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back);
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

    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back);
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

    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back);
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

    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back);
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

    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back);
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

    angle3D = calculateAngle3D(shoulder_angle, shoulder_angle_back);
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


# ---------------------------------------------#

def main():

    side = input("Enter week side of patient! (RIGHT or LEFT)\n")
    print("\tweek side is ", side)
    exercise = int(input("Enter exercise number of patient!(1-4)\n"))
    print("\texercise number is " + str(exercise))

    # Setup Pose function for video.
    pose_video = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5)  # , model_complexity=1)

    # Setup Pose function for video2.
    pose_video2 = mp_pose2.Pose(static_image_mode=False, min_detection_confidence=0.5)  # , model_complexity=1)

    # Initialize the VideoCapture object to read from the webcam.
    # video is external camera (Side)
    # video is front camera
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
    total_max = []
    total_hip = []
    for i in range(10):
        total_max.append(0)
        total_hip.append(0)
    count = 0

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

        # Perform Pose landmarks detection.
        frame, landmarks = detectPose(frame, pose_video, display=False)
        frame2, landmarks2 = detectPose(frame2, pose_video2, display=False)

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
            cv2.putText(frame, side+' shoulder angle : {}'.format(int(angle3D)), (200, 30), cv2.FONT_HERSHEY_PLAIN, 2,
                        (0, 255, 0), 3)
            angle_list.append(angle3D)
            # print("total angle  "+str(angle3D))

            if angle3D > local_max and angle3D > 20:
                local_max = angle3D
                total_max[count] = int(local_max)
                total_hip[count] = hip_angle

            if angle3D < 25 and local_max > 35:
                local_max = 0
                print("hip angle " + str(hip_angle))
                count += 1

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
        if (k == 27):
            print("total arm angle")
            print(total_max)
            print("hip angles")
            print(total_hip)
            # Break the loop.
            break

    # Release the VideoCapture object.
    video.release()
    # Close the windows.
    cv2.destroyAllWindows()

main()
