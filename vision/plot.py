import math

from matplotlib import pyplot as plt
from numpy import size


def rotate(origin, point, angle):
    """
    Rotate a point counterclockwise by a given angle around a given origin.

    The angle should be given in radians.
    """
    ox, oy = origin
    px, py = point

    qx = ox + math.cos(angle) * (px - ox) - math.sin(angle) * (py - oy)
    qy = oy + math.sin(angle) * (px - ox) + math.cos(angle) * (py - oy)
    return qx, qy


def main():
    number_of_rep = 5
    number_of_axes =2
    omuz = [120, 130, 140, 150,96]
    bel = [0, 5, -2, -10,6]
    axes_x = [0,210]
    axes_y = [0,0]
    for i in range(number_of_rep):
        point = [omuz[i], bel[i]]
        omuz[i], bel[i] = rotate([0, 0], point, 45)
    for i in range(number_of_axes):
        point = [axes_x[i], axes_y[i]]
        axes_x[i], axes_y[i] = rotate([0, 0], point, 45)
    current_point_x,current_point_y=rotate([0, 0], [120,5], 45)
    plt.plot(omuz, bel, 'o', 'b',markersize= 8)
    current_point_x_list = [current_point_x]
    current_point_y_list = [current_point_y]
    plt.plot(current_point_x_list,current_point_y_list, 'r^',markersize = 8)
    plt.plot(axes_x,axes_y, linestyle='-', color='k',markersize=6)
    plt.xlim(0,110)
    plt.ylim(0,180)
    plt.show()


if __name__ == "__main__":
    main()
