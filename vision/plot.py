import math

from matplotlib import pyplot as plt


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
    omuz = [120, 130, 140, 150]
    bel = [0, 5, -2, -10]
    axes_x = [0,210]
    axes_y = [0,0]
    for i in range(4):
        point = [omuz[i], bel[i]]
        omuz[i], bel[i] = rotate([0, 0], point, 45)
    for i in range(2):
        point = [axes_x[i], axes_y[i]]
        axes_x[i], axes_y[i] = rotate([0, 0], point, 45)
    lastx,lasty=rotate([0, 0], [120,5], 45)
    plt.plot(omuz, bel, 'o', 'b')
    plt.plot([lastx], [lasty], 'g^')
    plt.plot(axes_x,axes_y, linestyle='-', color='k')
    plt.xlim(0,110)
    plt.ylim(0,180)
    plt.show()


if __name__ == "__main__":
    main()
