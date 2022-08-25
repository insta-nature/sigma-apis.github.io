import jsonpickle
import webbrowser
import requests
import pyjokes
import re

from os import environ
from datetime import datetime

from googleapiclient.discovery import build
from pywikihow import search_wikihow
from wolframalpha import Client

from dotenv import load_dotenv
load_dotenv()

def computational_intelligence(question):
    try:
        client = Client(environ.get('WOLPHA_KEY'))
        answer = client.query(question)
        answer = next(answer.results).text
        print(answer)
        return f"Your Answer: {answer}"
    except BaseException as e:
        pass
        #speak("Sorry sir I couldn't fetch your question's answer. Please try again ")
        return e


def date(self):
    try:
        date = datetime.now().strftime("%b %d %Y")
    except Exception as e:
        print(e)
        date = False
    return date

def time(self):
    try:
        time = datetime.now().strftime("%H:%M:%S")
    except Exception as e:
        print(e)
        time = False
    return time

def weather(city):
    """
    City to weather
    :param city: City
    :return: weather
    """
    api_key = environ.get('WEATHER_KEY')
    units_format = "&units=metric"

    base_url = "http://api.openweathermap.org/data/2.5/weather?q="
    complete_url = base_url + city + "&appid=" + api_key + units_format

    response = requests.get(complete_url)

    city_weather_data = response.json()

    if city_weather_data["cod"] != "404":
        main_data = city_weather_data["main"]
        weather_description_data = city_weather_data["weather"][0]
        weather_description = weather_description_data["description"]
        current_temperature = main_data["temp"]
        current_pressure = main_data["pressure"]
        current_humidity = main_data["humidity"]
        wind_data = city_weather_data["wind"]
        wind_speed = wind_data["speed"]

        final_response = f"""
        The weather in {city} is currently {weather_description} 
        with a temperature of {current_temperature} degree celcius, 
        atmospheric pressure of {current_pressure} hectoPascals, 
        humidity of {current_humidity} percent 
        and wind speed reaching {wind_speed} kilometers per hour"""

        return final_response

    else:
        return "Sorry Sir, I couldn't find the city in my database. Please try again"

class voice:
    def __init__(self):
        pass

            
    def cmd(self, command):
        if 'youtube' in command:

            youtube = build('youtube', 'v3', developerKey=environ.get('YTD_APP_KEY'))
            req = youtube.search().list(q=command, part='snippet', type='video')
            res = req.execute()
            item = res['items'][0]
            vid_id = item['id']['videoId']

            cmd = command.split('youtube ')[1]
            # webbrowser.open('https://www.youtube.com/watch?v=' + vid_id)
            url = 'https://www.youtube.com/watch?v=' + vid_id
            data = {"Masseges":f"playing '{cmd}' Video on youtube",
                    "Url":url}
            data = jsonpickle.encode(data)

        elif 'open terminal' in command:
            data = 'test terminal'
            data = jsonpickle.encode(data)

        elif re.search('date', command):
            date = date()
            data = jsonpickle.encode(date)
            

        elif "time" in command:
            time_c = time()
            data = jsonpickle.encode(time_c)

        elif "joke" in command:
            joke = pyjokes.get_joke()
            data = jsonpickle.encode(joke)
        
        elif "how to do" in command:
            how_to = search_wikihow(command, 1)
            assert len(how_to) == 1
            data = jsonpickle.encode(how_to[0].summary)
        
        elif re.search('weather', command):
            city = command.split(' ')[-1]
            weather_res = weather(city=city)
            data = jsonpickle.encode(weather_res)


        elif "what is" in command or "who is" in command or "calculate" in command:
            answer = computational_intelligence(command)
            data = jsonpickle.encode(answer)

        elif 'open website' in command:
            splits = command.split(' ')[-1]
            print(splits)
            try:
                url = 'http://www.' + splits
                data = {'uri' : url}
                # webbrowser.open(url)
            except Exception as data:
                print(data)
            data = jsonpickle.encode(data)
        return data