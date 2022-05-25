from fpdf import FPDF
import matplotlib.pyplot as plt
import numpy as np
import requests
import json
import math
import sys

title = 'Fizik Terapi Raporu'

glob={"recovery_percantage":0,"patient_id":2}
ex_max=[]
ex_avg=[]
er_matrix=[]
rec_ini =[]

class PDF(FPDF):

    def font_head(self):
        self.set_font('Arial', 'B', 12)
    def font_normal(self):
        self.set_font('Times', '', 12)

    def head(self):
        # Arial bold 15
        self.set_font('Arial', 'B', 15)
        self.set_x(5)
        # Colors of frame, background and text
        self.set_draw_color(0,0 , 0)
        self.set_line_width(1)
        self.set_fill_color(78, 198, 199)
        self.set_text_color(255, 255, 255)
        # Thickness of frame (1 mm)
        #self.set_line_width(1)
        # Title
        self.cell(200, 9, title, 0, 1, 'C', 1)
        # Line break
        self.ln(10)

    def patient(self,fname,lname,ill,Gender,Tedavi,weak):
        cellWidth=50
        cellHeight=10
        spaceX=5
        Start_x=10
        Start_y=25
        self.set_text_color(0, 0, 0)
        # sol üst
        self.font_head()
        self.set_x(Start_x)
        self.set_y(Start_y)
        self.cell(cellWidth, cellHeight, "Hasta ismi:", 0, 0, 'L', 0)
        self.set_x(Start_x)
        self.set_y(Start_y+cellHeight)
        self.font_normal()
        self.cell(cellWidth, cellHeight, fname, 0, 0, 'L', 0)

        # sol alt
        self.font_head()
        self.set_y(Start_y+2*cellHeight)
        self.set_x(Start_x)
        self.cell(cellWidth, cellHeight, "Hastalik :", 0, 0, 'L', 0)
        self.set_y(Start_y + 3*cellHeight)
        self.set_x(Start_x)
        self.font_normal()
        self.cell(cellWidth, cellHeight, ill + "  (" + weak+")", 0, 0, 'L', 0)

        # orta üst
        self.font_head()
        self.set_y(Start_y)
        self.set_x(Start_x + cellWidth + spaceX)
        self.cell(cellWidth, cellHeight, "Hasta Soyismi:", 0, 0, 'L', 0)
        self.set_y(Start_y + cellHeight)
        self.set_x(Start_x + cellWidth + spaceX)
        self.font_normal()
        self.cell(cellWidth, cellHeight, lname, 0, 0, 'L', 0)

        # orta alt
        leng = len(Tedavi)
        div2 = math.ceil(leng / 2)
        str_ted1 = ", ".join(Tedavi[:div2])
        str_ted2 = ", ".join(Tedavi[div2:])
        self.font_head()
        self.set_y(Start_y + 2*cellHeight)
        self.set_x(Start_x + cellWidth + spaceX)
        self.cell(cellWidth, cellHeight, "Tedavi:", 0, 0, 'L', 0)
        self.set_y(Start_y + 2 * cellHeight+ cellHeight/2)
        self.set_x(Start_x + cellWidth + spaceX)
        self.font_normal()
        self.cell(cellWidth, cellHeight, str_ted1, 0, 0, 'L', 0)
        self.set_y(Start_y + 2 * cellHeight + cellHeight)
        self.set_x(Start_x + cellWidth + spaceX)
        self.cell(cellWidth, cellHeight, str_ted2, 0, 0, 'L', 0)

        # sag üst

        self.font_head()
        self.set_y(Start_y)
        self.set_x(Start_x + 2*(cellWidth + spaceX))

        self.set_y(Start_y + cellHeight)
        self.set_x(Start_x + 2*(cellWidth + spaceX))
        self.font_normal()

        # sag alt
        self.font_head()
        self.set_y(Start_y + 2 * cellHeight)
        self.set_x(Start_x + 2*(cellWidth + spaceX))
        self.cell(cellWidth, cellHeight, "Geri Kazanim", 0, 0, 'L', 0)
        self.set_y(Start_y + 3 * cellHeight)
        self.set_x(Start_x + 2*(cellWidth + spaceX))
        self.font_normal()
        self.cell(cellWidth, cellHeight, "% "+str(glob["recovery_percantage"]), 0, 0, 'L', 0)

        #photo
        #self.image("photo.JPG",175,25,30,40)

    def create_table(self):
        ##Header for this section
        self.font_head()
        # self.set_draw_color(0, 80, 180)
        self.set_fill_color(230, 230, 0)
        self.set_text_color(220, 50, 50)
        # Thickness of frame (1 mm)
        self.set_line_width(0.5)
        # Title
        #self.set_y()
        self.set_x(5)
        self.set_fill_color(78, 198, 199)
        self.set_text_color(255, 255, 255)
        self.cell(200, 9, "ROM Tablo Gösterimi", 0, 1, 'C', 1)
        self.set_line_width(0.2)
        # Remember to always put one of these at least once.
        self.font_normal()
        self.set_text_color(0, 0, 0)
        ## table ploting
        # Effective page width, or just epw
        epw = self.w - 2 * self.l_margin
        col_width = epw / 5

        width_data=len(ex_max)
        length_data = len(ex_max[0])
        data = []
        for i in range(length_data+1):
            col = []
            for j in range(width_data+1):
                col.append(0)
            data.append(col)

        for i in range(width_data+1):
            if i == 0:
                data[0][i] = " [MAX,AVG]"
            else:
                data[0][i]="Egzersiz " + str(i)
        for i in range(1,length_data+1):
                data[i][0] = "Gun" + str(i)

        for i in range(1,width_data+1):
            for j in range(1, length_data + 1):
                data[j][i]=[ ex_max[i-1][j-1] ,ex_avg[i-1][j-1]]
      
        self.ln(5)

        # Text height is the same as current font size
        th = self.font_size

        # Line break equivalent to 4 lines
        self.ln(2* th)
        self.font_normal()

        # Here we add more padding by passing 2*th as height
        for row in data:
            for datum in row:
                # Enter data in colums
                self.cell(col_width, 2 * th, str(datum), border=1)
            self.ln(2 * th)

    def create_graph(self):
        cellWidth = 80
        cellHeight = 60
        spaceX = 10
        Start_x = 20
        Start_y = 85

        # header for new section
        self.font_head()
        # Thickness of frame (1 mm)
        self.set_line_width(0.5)
        # Title
        self.set_y(75)
        self.set_x(5)
        self.set_fill_color(78, 198, 199)
        self.set_text_color(255, 255, 255)
        self.cell(200, 9, "ROM Grafik Gösterimi", 0, 1, 'C', 1)
        self.set_line_width(0.2)

        #plot the graphs
    
        day=np.arange(1,len(ex_max[0])+1)
        length = len(ex_max)
        for i in range(length):
            exer1 = ex_max[i]
            plt.plot(day, ex_max[i], 'r-o')
            plt.xlabel('Exercise day')
            plt.ylabel('Angle')
            plt.xlim(0, len(ex_max[0])+1)
            plt.savefig('plot'+str(i+1)+'.jpg')
            plt.close()

        self.set_text_color(0, 0, 0)
        # plot position
        if length > 0:
            self.image("plot1.JPG", Start_x, Start_y, cellWidth, cellHeight)
            self.set_y(Start_y)
            self.set_x(Start_x)
            self.cell(cellWidth, 8, "Egzersiz 1", 0, 0, 'C', 0)
        if length > 1:
            self.image("plot2.JPG", Start_x+cellWidth+spaceX, Start_y, cellWidth, cellHeight)
            self.set_y(Start_y)
            self.set_x(Start_x+cellWidth+spaceX)
            self.cell(cellWidth, 8, "Egzersiz 2", 0, 0, 'C', 0)
        if length > 2:
            self.image("plot3.JPG", Start_x, Start_y+cellHeight+spaceX/2, cellWidth, cellHeight)
            self.set_y(Start_y+cellHeight+spaceX/2)
            self.set_x(Start_x )
            self.cell(cellWidth, 8, "Egzersiz 3", 0, 0, 'C', 0)
        if length > 3:
            self.image("plot4.JPG", Start_x + cellWidth + spaceX, Start_y+cellHeight+spaceX/2, cellWidth, cellHeight)
            self.set_y(Start_y + cellHeight + spaceX / 2)
            self.set_x(Start_x + cellWidth + spaceX)
            self.cell(cellWidth, 8, "Exercise 4", 0, 0, 'C', 0)

    def print_pdf(self,fname,lname,ill,Gender,Tedavi,weak):
        self.add_page()
        self.head()
        self.patient(fname,lname,ill,Gender,Tedavi,weak)
        self.create_graph()
        self.add_page()
        self.create_table()

def data_Process(data):
    jsn = data.json()
    for section in jsn:
        sect_id = jsn[section]
        ex_count = 0
        for exercise in sect_id:
            ex_id = sect_id[exercise]
            if section == "1":
                ex_max.append([])
                ex_avg.append([])
            for angles in ex_id:
                angle_list=ex_id[angles]
                max_ang = 0
                tot_ang = 0
                deg_count = 0
                for degree in angle_list:
                    tot_ang += degree
                    deg_count += 1
                    if max_ang < degree:
                        max_ang = degree
                    if section == "1" and deg_count == 1 and "shoulder" == angles:
                        rec_ini.append(degree)
                if "shoulder" == angles:
                    if deg_count != 0:
                        ex_avg[ex_count].append(int(tot_ang / deg_count))
                    else:
                        ex_avg[ex_count].append(0)
                    ex_max[ex_count].append(max_ang)
                else:
                    "do something in hip values"
            ex_count += 1
    #print(ex_avg)
    #print(ex_max)

def cal_recovery(optimal_ang):
    rec_last=[]
    length = len(ex_max)
    for i in range(length):
        rec_last.append(max(ex_max[i]))
    current_rec = int(sum(rec_last) / len(rec_last))
    start_rec = int(sum(rec_ini) / len(rec_ini))
    recovery_percantage=glob["recovery_percantage"]
    patient_id=glob["patient_id"]
    recovery_percantage = int((current_rec-start_rec)/(optimal_ang-start_rec)*100)
    print(recovery_percantage)
    url_str = 'http://physio-env.eba-u4ctwpu4.eu-central-1.elasticbeanstalk.com/api/patient/{}/{}'.format(patient_id,recovery_percantage)
    r = requests.put(url_str)
    glob["recovery_percantage"]=recovery_percantage

def main():
    # take input
    glob["patient_id"]=2#sys.argv[1]
    patient_id=glob["patient_id"]
    url_str = 'http://physio-env.eba-u4ctwpu4.eu-central-1.elasticbeanstalk.com/api/patient/{}'.format(patient_id)
    r = requests.get(url_str)
    print(r.json())
    optimal_ang=r.json()["optimum"]
    patient_first_name =r.json()["patientFirstName"]
    patient_last_name =r.json()["patientLastName"]
    patient_gender =r.json()["isMan"]
    if patient_gender:
        patient_gender="Male"
    else:
        patient_gender="Female"
    patient_disease =r.json()["patientDisease"] 
    patient_exercise =r.json()["exercises"] 
    patient_weak =r.json()["weak"] 

    pdf = PDF()
    url_str = 'http://physio-env.eba-u4ctwpu4.eu-central-1.elasticbeanstalk.com/api/patientexercise/{}'.format(patient_id)
    r = requests.get(url_str)
    if r.status_code != 200:
        print("Cannot reach data")
    data_Process(r)
    cal_recovery(optimal_ang)
    pdf.print_pdf(patient_first_name,patient_last_name ,patient_disease,patient_gender,patient_exercise,patient_weak)
    pdf.output('Sample.pdf', 'F')
    

main()
