from fpdf import FPDF
import matplotlib.pyplot as plt
import numpy as np

title = 'Fizik Terapi Raporu'
widthP=210
heightP=297

class PDF(FPDF):

    def font_head(self):
        self.set_font('Arial', 'B', 12)
    def font_normal(self):
        self.set_font('Times', '', 12)

    def header(self):
        # Arial bold 15
        self.set_font('Arial', 'B', 15)
        self.set_x(5)
        # Colors of frame, background and text
        self.set_draw_color(0, 80, 180)
        self.set_fill_color(230, 230, 0)
        self.set_text_color(220, 50, 50)
        # Thickness of frame (1 mm)
        self.set_line_width(1)
        # Title
        self.cell(200, 9, title, 1, 1, 'C', 1)
        # Line break
        self.ln(10)

    def patient(self,name,ill):
        cellWidth=50
        cellHeight=10
        spaceX=5
        Start_x=10
        Start_y=25
        #hasta adı
        self.font_head()
        self.set_x(Start_x)
        self.set_y(Start_y)
        self.cell(cellWidth, cellHeight, "Hasta (Patient):", "LRT", 0, 'L', 0)
        self.set_x(Start_x)
        self.set_y(Start_y+cellHeight)
        self.font_normal()
        self.cell(cellWidth, cellHeight, name, "LRB", 0, 'L', 0)

        #hastalık
        self.font_head()
        self.set_y(Start_y+2*cellHeight)
        self.set_x(Start_x)
        self.cell(cellWidth, cellHeight, "Tedavi (Illlnes):", 0, 0, 'L', 0)
        self.set_y(Start_y + 3*cellHeight)
        self.set_x(Start_x)
        self.font_normal()
        self.cell(cellWidth, cellHeight, ill, 0, 0, 'L', 0)

        # hasta cinsiyeti
        self.font_head()
        self.set_y(Start_y)
        self.set_x(Start_x + cellWidth + spaceX)
        self.cell(cellWidth, cellHeight, "Cinsiyet (Gender):", 0, 0, 'L', 0)
        self.set_y(Start_y + cellHeight)
        self.set_x(Start_x + cellWidth + spaceX)
        self.font_normal()
        self.cell(cellWidth, cellHeight, "Male", 0, 0, 'L', 0)

        # başlangıç
        self.font_head()
        self.set_y(Start_y + 2*cellHeight)
        self.set_x(Start_x + cellWidth + spaceX)
        self.cell(cellWidth, cellHeight, "Baslama (Start Date):", 0, 0, 'L', 0)
        self.set_y(Start_y + 3 * cellHeight)
        self.set_x(Start_x + cellWidth + spaceX)
        self.font_normal()
        self.cell(cellWidth, cellHeight, "12/05/2022", 0, 0, 'L', 0)

        # hasta Tedavi
        self.font_head()
        self.set_y(Start_y)
        self.set_x(Start_x + 2*(cellWidth + spaceX))
        self.cell(cellWidth, cellHeight, "Tedavi:", 0, 0, 'L', 0)
        self.set_y(Start_y + cellHeight)
        self.set_x(Start_x + 2*(cellWidth + spaceX))
        self.font_normal()
        self.cell(cellWidth, cellHeight, "Exercise = 1, 2, 3, 4", 0, 0, 'L', 0)

        # İlerleme raporu
        self.font_head()
        self.set_y(Start_y + 2 * cellHeight)
        self.set_x(Start_x + 2*(cellWidth + spaceX))
        self.cell(cellWidth, cellHeight, "Katilim (Gelinen/Toplam):", 0, 0, 'L', 0)
        self.set_y(Start_y + 3 * cellHeight)
        self.set_x(Start_x + 2*(cellWidth + spaceX))
        self.font_normal()
        self.cell(cellWidth, cellHeight, "8/10", 0, 0, 'L', 0)

        #photo
        self.image("photo.JPG",175,25,30,40)

    def create_table(self):
        ##Header for this section
        self.font_head()
        # self.set_draw_color(0, 80, 180)
        self.set_fill_color(230, 230, 0)
        self.set_text_color(220, 50, 50)
        # Thickness of frame (1 mm)
        self.set_line_width(0.5)
        # Title
        self.set_y(215)
        self.set_x(70)
        self.cell(70, 9, "ACI Tablo Gösterimi", 1, 0, 'C', 0)
        self.set_line_width(0.2)
        # Remember to always put one of these at least once.
        self.font_normal()
        self.set_text_color(0, 0, 0)
        ## table ploting
        # Effective page width, or just epw
        epw = pdf.w - 2 * pdf.l_margin
        col_width = epw / 5

        data = [['Exercise Day', 'Exercise 1', 'Exercise 2', 'Exercise 3','Exercise 4'],
                ['Day 1', '90', 80, 100,60],
                ['Day 2', '96', 87, 107,65],['Day 3', '102', 92, 108,72],['Day 4', '99', 89, 120,76]
                ]
        pdf.ln(5)

        # Text height is the same as current font size
        th = pdf.font_size

        # Line break equivalent to 4 lines
        pdf.ln(2* th)
        self.font_normal()

        # Here we add more padding by passing 2*th as height
        for row in data:
            for datum in row:
                # Enter data in colums
                pdf.cell(col_width, 2 * th, str(datum), border=1)
            pdf.ln(2 * th)

    def create_graph(self):
        cellWidth = 80
        cellHeight = 60
        spaceX = 10
        Start_x = 20
        Start_y = 85

        # header for new section
        self.font_head()
        #self.set_draw_color(0, 80, 180)
        self.set_fill_color(230, 230, 0)
        self.set_text_color(220, 50, 50)
        # Thickness of frame (1 mm)
        self.set_line_width(0.5)
        # Title
        self.set_y(75)
        self.set_x(70)
        self.cell(70, 9, "ACI Grafik Gösterimi", 1, 0, 'C', 0)
        self.set_line_width(0.2)

        #plot the graphs
        tot_num=10
        day=np.arange(1,9)
        exer1 = [90, 96, 102, 99,103,106,102,110]
        exer2 = [80, 87, 92, 89,94,97,92,99]
        exer3 = [100, 107, 108, 120,115,122,118,125]
        exer4 = [60, 65, 72, 76,82,88,84,89]
        # create graph
        plt.plot(day,exer1,'r-o')
        plt.xlabel('Exercise day')
        plt.ylabel('Angle')
        plt.xlim(1,tot_num)
        plt.savefig('plot1.jpg')
        plt.close()
        plt.plot(day, exer2, 'y-o')
        plt.xlabel('Exercise day')
        plt.ylabel('Angle')
        plt.xlim(1, tot_num)
        plt.savefig('plot2.jpg')
        plt.close()
        plt.plot(day, exer3, 'g-o')
        plt.xlabel('Exercise day')
        plt.ylabel('Angle')
        plt.xlim(1, tot_num)
        plt.savefig('plot3.jpg')
        plt.close()
        plt.plot(day, exer4, 'b-o')
        plt.xlabel('Exercise day')
        plt.ylabel('Angle')
        plt.xlim(1, tot_num)
        plt.savefig('plot4.jpg')
        plt.close()

        # plot position
        self.image("plot1.JPG", Start_x, Start_y, cellWidth, cellHeight)
        self.image("plot2.JPG", Start_x+cellWidth+spaceX, Start_y, cellWidth, cellHeight)
        self.image("plot3.JPG", Start_x, Start_y+cellHeight+spaceX/2, cellWidth, cellHeight)
        self.image("plot4.JPG", Start_x + cellWidth + spaceX, Start_y+cellHeight+spaceX/2, cellWidth, cellHeight)

    def print_pdf(self,name,illnes):
        self.add_page()
        self.patient(name,illnes)
        self.create_graph()
        self.create_table()

pdf = PDF()
pdf.print_pdf("ALP","Donuk omuz")
pdf.output('Sample.pdf', 'F')