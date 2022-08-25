from __future__ import print_function
import datetime
import os.path
import pickle
import pyttsx3
import pytz
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november",
          "december"]
DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
DAY_EXTENSIONS = ["rd", "th", "st", "nd"]


def speak(text):
    engine = pyttsx3.init('sapi5')
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[1].id)
    engine.say(text)
    engine.runAndWait()
    engine.setProperty('rate', 180)


# If modifying these scopes, delete the file token.pickle.
scopes = ['https://www.googleapis.com/auth/calendar.readonly']
client_secrets_file = 'client_secret.json'


def authenticate_google():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creeds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creeds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if creeds:
        if creeds and creeds.expired and creeds.refresh_token:
            creeds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', scopes=scopes)
            creeds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creeds, token)

    service = build('calendar', 'v3', credentials=creeds)

    return service


def get_events(day, service):
    # Call the Calendar API
    date = datetime.datetime.combine(day, datetime.datetime.min.time())
    end_date = datetime.datetime.combine(day, datetime.datetime.max.time())
    utc = pytz.UTC
    date = date.astimezone(utc)
    end_date = end_date.astimezone(utc)

    events_result = service.events().list(calendarId='primary', timeMin=date.isoformat(), timeMax=end_date.isoformat(),
                                          singleEvents=True,
                                          orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        speak('No upcoming events found.')
    else:
        speak(f"You have {len(events)} events on this day.")

        for event in events:
            start = event['start'].get('dateTime', event['start'].get('date'))
            print(start, event['summary'])
            start_time = str(start.split("T")[1].split("+")[0])  # get the hour the event starts
            if int(start_time.split(":")[0]) < 12:  # if the event is in the morning
                start_time = start_time + "am"
            else:
                start_time = str(int(start_time.split(":")[0]) - 12)  # convert 24 hour time to regular
                start_time = start_time + "pm"

            speak(event["summary"] + " at " + start_time)


def get_date(text):
    today = datetime.date.today()

    if text.count("today") > 0:
        return today

    day = -1
    day_of_week = -1
    month = -1
    year = today.year

    for word in text.split():
        if word in MONTHS:
            month = MONTHS.index(word) + 1
        elif word in DAYS:
            day_of_week = DAYS.index(word)
        elif word.isdigit():
            day = int(word)
        else:
            for ext in DAY_EXTENSIONS:
                found = word.find(ext)
                if found > 0:
                    try:
                        day = int(word[:found])
                    except():
                        pass

    if month < today.month and month != -1:
        year = year + 1

    if month == -1 and day != -1:
        if day < today.day:
            month = today.month + 1
        else:
            month = today.month

    if month == -1 and day == -1 and day_of_week != -1:
        current_day_of_week = today.weekday()
        dif = day_of_week - current_day_of_week

        if dif < 0:
            dif += 7
            if text.count("next") >= 1:
                dif += 7

        return today + datetime.timedelta(dif)

    if day != -1:
        return datetime.date(month=month, day=day, year=year)
