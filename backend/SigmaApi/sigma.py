import datetime
import os
# import pprint
import random
import re
import sys
import time
import webbrowser
import pyautogui
import pyjokes
import requests
import wolframalpha
import psutil
from PIL import Image
from pywikihow import search_wikihow
from PyQt5 import QtGui
from PyQt5.QtCore import *
from PyQt5.QtCore import QTimer, QTime, QDate, Qt
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *

from Sigma import VoiceAssistant
from Sigma.config import config
from Sigma.features.gui import Ui_MainWindow
from googleapiclient.discovery import build

obj = VoiceAssistant()

api_key = config.ytd_api_key

# def tellcommand():
#     active = obj.mic_input()
#     return active

zibacar = {
    'mohite' and 'mohit': 'Name, Dr. B. J. Mohite, Designation, Associate Professor, Qualification, MCM, MCA, MSc, '
                          'MMM, MPhil, PhD, Experience, 23 Years, Email Id, babasaheb.mohite@zealeducation.com,  '
                          'Phone Number, +91 9850098225',
    'madhavi madam' and 'madhavi  shamkuwar': 'Name, Prof. Madhavi  Shamkuwar, Designation, Assistant Professor, '
                                              'Qualification, MCA,  12345676872',
    'kirti madam' and 'kirti samrit': 'Name, Prof. Kirti  Samrit, Designation, Assistant Professor, Qualification,'
                                      'M.C.A., Pursuing Ph.D., Experience	Academic:, 14 Years, Email Id, '
                                      'kirti.samrit@zealeducation.com, Phone Number, 12345676872',
    'sushma katkar': 'Name, Prof. Sushma  Katkar, Designation, Assistant Professor, Qualification,	B.Sc., MCA, '
                     'Experience	Academic:, 4 Years, Email Id,	sushma.katkar@zealeducation.com, Phone Number,'
                     ' 12345676872',
    'dharmendra singh' and 'singh sir': 'Name, Prof. Dharmendra Singh, Designation, Assistant Professor, '
                                        'Qualification,	MCA, Pursuing Ph.D., Experience	Academic:, 12 Years, '
                                        'Email Id,	dharmendra.singh@zealeducation.com, Phone Number, +91 9823333382',
    'prachi madam' and 'prachi sutrawe': 'Name, Prof. Prachi Sutrawe, Designation	Assistant Professor '
                                         'Qualification	MCA, Experience	7 Years Email Id	'
                                         'Prachi.Sutrawe@zealeducation.com  Phone Number, 12345676872 '
}

GREETINGS = ["hello jarvis", "jarvis", "wake up jarvis", "you there jarvis", "time to work jarvis",
             "hey jarvis", "ok jarvis", "are you there", "okay", "ok"]

GREETINGS_RES = ["always there for you sir", "i am ready sir",
                 "your wish my command", "how can i help you sir?", "i am online and ready sir"]

CALENDAR_STRS = ["what do i have", "do i have plans", "am i busy"]

EMAIL_DIC = {
    'myself': config.email1,
    'my official email': config.email1,
    'my second email': config.email1,
    'my official mail': config.email1,
    'my second mail': config.email1,
    'nasa': 'naskatube777@gmail.com',
    'siddharth': 'siddharth9767@gmail.com'
}


def speak(text):
    obj.tts(text)


app_id = config.wolframalpha_id


def computational_intelligence(question):
    try:
        client = wolframalpha.Client(app_id)
        answer = client.query(question)
        answer = next(answer.results).text
        print(answer)
        return answer
    except BaseException as e:
        speak("Sorry sir I couldn't fetch your question's answer. Please try again ")
        return e


def startup():
    speak("Initializing Jarvis")
    # speak("Starting all systems applications")
    # speak("Installing and checking all drivers")
    # speak("Calibrating and examining all the core processors")
    # speak("Checking the internet connection")
    # speak("Wait a moment sir")
    # speak("All drivers are up and running")
    # speak("All systems have been activated")
    # speak("Now I am online")


def wish():
    hour = int(datetime.datetime.now().hour)
    if 0 <= hour <= 12:
        speak("Good Morning Sir")
    elif 12 <= hour <= 18:
        speak("Good afternoon Sir")
    else:
        speak("Good evening Sir")
    c_time = obj.time()
    t_date = obj.date()
    speak("Currently Date is {0}. and Time {1}.".format(t_date, c_time))
    speak("I am Jarvis. Online and ready sir. Please tell me how may I help you")


def news_play():
    news_res = obj.news()
    speak("Source: The Times Of India"
          "Today's Headlines are..")
    speak(news_res)
    speak('These were the top headlines, Have a nice day Sir!!..')


def TaskExecution():
    global name
    startup()
    wish()

    while True:
        command = obj.mic_input()
        try:
            if re.search('date', command):
                date = obj.date()
                # print(date)
                speak(date)

            elif "time" in command:
                time_c = obj.time()
                # print(time_c)
                speak("Sir the time is {0}".format(time_c))

            elif re.search('launch', command):
                dict_app = {'chrome': 'C://Program Files//Google//Chrome//Application//chrome',
                            'ms word': 'C://Program Files//Microsoft Office//Office15//WINWORD',
                            'ms excel': 'C://Program Files//Microsoft Office//Office15//EXCEL',
                            'powerpoint': 'C://Program Files//Microsoft Office//Office15//POWERPNT',
                            'ms access': 'C://Program Files//Microsoft Office//Office15//MSACCESS',
                            'VS Code': 'C://Users//Ajitk//AppData//Local//Programs//Microsoft VS Code//code',
                            "Python": 'C://Users//Ajitk//AppData//Local//Programs//Python//Python38//pythonw',
                            'anaconda navigator': 'C://Users//Ajitk//anaconda3//pythonw.exe '
                                                  'C://Users//Ajitk//anaconda3//cwp.py C://Users//Ajitk//anaconda3 '
                                                  'C://Users//Ajitk//anaconda3//pythonw.exe '
                                                  'C://Users//Ajitk//anaconda3//Scripts//anaconda-navigator-script.py ',

                            }

                Axd = command.split(' ', 1)[1]
                path = dict_app.get(Axd)
                print(Axd)

                if path is None:
                    speak('Application path not found')

                else:
                    speak('Launching: ' + Axd + 'for you sir!')
                    obj.launch_any_app(path_of_app=path)

            elif command in GREETINGS:
                speak(random.choice(GREETINGS_RES))

            elif re.search('open', command):
                domain = command.split(' ')[-1]
                obj.website_opener(domain + '.com')
                speak('Alright sir !! Opening {0}'.format(domain))

            elif re.search('weather', command):
                city = command.split(' ')[-1]
                weather_res = obj.weather(city=city)
                speak(weather_res)

            elif 'tell me about my faculty' in command:
                speak('okay sir..!')
                while True:
                    speak('Please tell me Name..!')
                    about = obj.mic_input()
                    try:
                        if "exit" in about or "close" in about or "thank you" in about:
                            speak("okay sir, close now")
                            break
                        else:
                            fac_mam = zibacar.get(about)
                            speak(fac_mam)
                    except BaseException:
                        speak('sorry sir please try again.')

            elif re.search('tell me', command):
                try:
                    topic = command.split(' ')[-3:]
                    if topic:
                        wiki_res = obj.tell_me(topic)
                        speak(wiki_res)
                    else:
                        speak("Sorry sir. I couldn't load your query from my database. Please try again")
                except BaseException:
                    speak("Sorry sir. I couldn't load your query from my database. Please try again")

            elif "buzzing" in command or "news" in command or "headlines" in command:
                news_play()

            # Use Selenium in searching command
            elif 'search' in command:
                obj.search_anything_google(command)

            elif "play song on youtube" in command or "play song youtube" in command:
                speak("Tell me Song Name ")
                try:
                    recipient = obj.mic_input()

                    youtube = build('youtube', 'v3', developerKey=api_key)
                    req = youtube.search().list(q=recipient, part='snippet', type='video')
                    res = req.execute()
                    item = res['items'][0]
                    vid_id = item['id']['videoId']

                    webbrowser.open('https://www.youtube.com/watch?v=' + vid_id)
                    speak("Okay sir, playing {0} Video on youtube".format(recipient))

                except BaseException:
                    speak("Sorry sir. Couldn't find song. Please try again")

            elif "play song" in command or "play music" in command:
                music_dir = 'C://Users//Ajitk//Music//Playlists'
                songs = os.listdir(music_dir)
                os.startfile(os.path.join(music_dir, songs[0]))

            elif "next song" in command or "play next song" in command or "next music" in command:
                music_dir = 'C://Users//Ajitk//Music//Playlists'
                songs = os.listdir(music_dir)
                os.startfile(os.path.join(music_dir, songs[0]))
                '''
                for song in songs:
                    os.startfile(os.path.join(music_dir, song[0]))
                '''

            elif 'good morning jarvis' in command or 'good morning darling' in command or 'good morning' in command:
                wish()
                weather_res = obj.weather('sangli')
                speak(weather_res)
                speak(news_play())

            elif "email" in command or "send email" in command or "send mail" in command:
                sender_email = config.email
                sender_password = config.email_password
                try:
                    speak("Whom do you want to email sir ?")
                    recipient = obj.mic_input()
                    receiver_email = EMAIL_DIC.get(recipient)
                    if receiver_email:
                        speak("What is the subject sir ?")
                        subject = obj.mic_input()
                        speak("What should I say?")
                        message = obj.mic_input()
                        msg = 'Subject: {}\n\n{}'.format(subject, message)
                        obj.send_mail(sender_email, sender_password, receiver_email, msg)
                        speak("Email has been successfully sent")
                        time.sleep(2)
                    else:
                        speak(
                            "I couldn't find the requested person's email in my database. Please try again with a "
                            "different name")
                except BaseException:
                    speak("Sorry sir. Couldn't send your mail. Please try again")

            elif "what is" in command or "who is" in command or "calculate" in command:
                answer = computational_intelligence(command)
                speak(answer)

            elif 'activate how to do mode' in command:
                speak('activated now, how to do mode..')
                while True:
                    speak('please me what you want to know')
                    how = takecommand()
                    try:
                        if "exit" in how or "close" in how:
                            speak("okay sir, how to do mode is closed")
                            break
                        else:
                            max_results = 1
                            how_to = search_wikihow(how, max_results)
                            assert len(how_to) == 1
                            how_to[0].print()
                            speak(how_to[0].summary)
                    except BaseException:
                        speak('Sorry sir, i am not able to find this')

                    '''# calender error --->
                    elif "what do i have" in command or "do i have plans" or "am i busy" in command:
                        obj.google_calendar_events(command)'''
            if "make a note" in command or "write this down" in command or "write note" in command:
                speak("What would you like me to write down?")
                note_text = obj.mic_input()
                obj.take_note(note_text)
                speak("I've made a note of that")

            elif "close the note" in command or "close notepad" in command:
                speak("Okay sir, closing notepad")
                if 'close' in command or 'exit' in command:
                    os.system("taskkill /f /im notepad.exe")
                else:
                    os.system("taskkill /f /im notepad++.exe")

            if "joke" in command:
                joke = pyjokes.get_joke()
                print(joke)
                speak(joke)

            elif "system" in command:
                sys_info = obj.system_info()
                print(sys_info)
                speak(sys_info)

            elif "battery percentage" in command:
                battery = psutil.sensors_battery()
                Percentage = battery.percent
                speak("Your Computer Battery Percentage is {0}".format(Percentage))

            elif "where is" in command:
                # Where is city_name to find details.
                place = command.split('where is ', 1)[1]
                current_loc, target_loc, distance = obj.location(place)
                city = target_loc.get('city', '')
                state = target_loc.get('state', '')
                country = target_loc.get('country', '')
                time.sleep(1)
                try:

                    if city:
                        res = "{0} is in {1} state and country {2}. It is {3} km away from your " \
                              "current location ".format(place, state, country, distance)
                        print(res)
                        speak(res)

                    else:
                        res = "{0} is a state in {1}. It is {2} km " \
                              "away from your current location".format(state, country, distance)
                        print(res)
                        speak(res)

                except BaseException:
                    res = "Sorry sir, I couldn't get the co-ordinates of the location you requested. Please try again"
                    speak(res)

            elif "ip address" in command:
                ip = requests.get('https://api.ipify.org').text
                print(ip)
                speak("Your ip address is {0}".format(ip))

            elif "switch the window" in command or "switch window" in command:
                speak("Okay sir, Switching the window")
                pyautogui.keyDown("alt")
                pyautogui.press("tab")
                time.sleep(1)
                pyautogui.keyUp("alt")

            elif "where i am" in command or "current location" in command or "where am i" in command:
                try:
                    city, state, country = obj.my_location()
                    print(f"{city}, {state}, {country}")
                    speak(f"You are currently in {city} city which is in {state} state and country {country}")
                except BaseException:
                    speak("Sorry sir, I couldn't fetch your current location. Please try again")

            elif "take screenshot" in command or "take a screenshot" in command or "capture the screen" in command:
                speak("By what name do you want to save the screenshot?")
                name = obj.mic_input()
                speak("Alright sir, taking the screenshot")
                img = pyautogui.screenshot()
                name = "{0}.png".format(name)
                img.save('C://Users//%username%//Pictures//Screenshots' + name)
                speak("The screenshot has been successfully captured")

            elif "show me the screenshot" in command:
                try:
                    img = Image.open('C://Users//%username%//Pictures//Screenshots' + name)
                    img.show(img)
                    speak("Here it is sir")
                    time.sleep(2)

                except IOError:
                    speak("Sorry sir, I am unable to display the screenshot")

            # Modifying File operating system
            elif "hide all files" in command or "hide this folder" in command:
                os.system("attrib +h /s /d")
                speak("Sir, all the files in this folder are now hidden")

            elif "visible" in command or "make files visible" in command:
                os.system("attrib -h /s /d")
                speak("Sir, all the files in this folder are now visible to everyone. I hope you are taking this "
                      "decision in your own peace")

            elif "goodbye" in command or "offline" in command or "quit" in command or "bye" in command:
                apkk = QApplication(sys.argv)
                speak("Alright sir, going offline. It was nice working with you")
                exit(apkk.exec_())
        except BaseException:
            print('failed now..')


def takecommand():
    active = obj.mic_input()
    return active


# class MainThread(QThread):
#     def __init__(self):
#         super(MainThread, self).__init__()

#     def run(self):
#         TaskExecution()


# startExecution = MainThread()


# class Main(QMainWindow):
#     def __init__(self):
#         super().__init__()
#         self.ui = Ui_MainWindow()
#         self.ui.setupUi(self)
#         self.ui.pushButton.clicked.connect(self.startTask)
#         self.ui.pushButton_2.clicked.connect(self.close)

#     def __del__(self):
#         sys.stdout = sys.__stdout__

#     def run(self):
#         self.TaskExection()

#     def startTask(self):
#         self.ui.movie = QtGui.QMovie("Sigma/utils/images/jarvis.gif")
#         self.ui.label_2.setMovie(self.ui.movie)
#         self.ui.movie.start()
#         self.ui.movie = QtGui.QMovie("Sigma/utils/images/init.gif")
#         self.ui.label_4.setMovie(self.ui.movie)
#         self.ui.movie.start()
#         self.ui.movie = QtGui.QMovie("Sigma/utils/images/beat line.gif")
#         self.ui.label_5.setMovie(self.ui.movie)
#         self.ui.movie.start()
#         self.ui.movie = QtGui.QMovie("Sigma/utils/images/bind.gif")
#         self.ui.label_6.setMovie(self.ui.movie)
#         self.ui.movie.start()
#         self.ui.movie = QtGui.QMovie("Sigma/utils/images/neonglobe.gif")
#         self.ui.label_7.setMovie(self.ui.movie)
#         self.ui.movie.start()
#         self.ui.movie = QtGui.QMovie("Sigma/utils/images/virus.gif")
#         self.ui.label_8.setMovie(self.ui.movie)
#         self.ui.movie.start()
#         '''self.ui.movie = QtGui.QMovie("Sigma/utils/images/output.gif")
#         self.ui.label_9.setMovie(self.ui.movie)
#         self.ui.movie.start()'''

#         timer = QTimer(self)
#         timer.timeout.connect(self.showTime)
#         timer.start(1000)
#         startExecution.start()

#     # Error Problem current date
#     def showTime(self):
#         # self.label_date = self.current_date.toString(Qt.ISODate)
#         # self.label_time = self.current_time.toString('hh:mm:ss')
#         # self.current_date = QDate.currentDate()
#         # self.current_time = QTime.currentTime()
#         pass
#         # self.ui.textBrowser.setText(self.label_date)
#         # self.ui.textBrowser_2.setText(self.label_time)


# app = QApplication(sys.argv)
# jarvis = Main()
# jarvis.show()
# exit(app.exec_())
