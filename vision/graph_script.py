import math
import cv2
import numpy as np
from time import time
import mediapipe as mp
import matplotlib.pyplot as plt
import random
first_list = []
second_list = []
time_list = np.array(range(1,11))
for i in range(0,10):
    n = random.randint(1,180)
    first_list.append(n)

for i in range(0,10):
    a = random.randint(160,190)
    second_list.append(a)


plt.scatter(time_list,first_list,label ='angle of arm')

plt.plot(time_list,first_list, ls = "--")

plt.ylim([0,180])
plt.legend()
axes1 = plt.gca()
axes2 = axes1.twinx()
plt.plot(time_list,second_list, ls = "--",c='r')
plt.scatter(time_list,second_list,label='angle of back',c='r')
axes1.set_ylabel('y-axis 1')
axes2.set_ylabel('y-axis 2')

plt.xlim([0,11])
plt.ylim([100,260])
plt.axhline(y=180,color='r',linestyle ='-',label='proper back angle for mt')
plt.legend()
plt.show()
    