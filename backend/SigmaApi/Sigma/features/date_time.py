import datetime


class Date_Time:
    def __inti__(self):
        pass

    def date(self):
        """
        Just return date as string
        :return: date if success, False if fail
        """
        try:
            Date = datetime.datetime.now().strftime("%b %d %Y")
        except Exception as e:
            print(e)
            Date = False
        return Date

    def time(self):
        """
        Just return time as string
        :return: time if success, False if fail
        """
        try:
            time = datetime.now().strftime("%H:%M:%S")
        except Exception as e:
            print(e)
            time = False
        return time
