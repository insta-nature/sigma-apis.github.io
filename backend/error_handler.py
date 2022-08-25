class error_handler:
    def error_code(self):
        global message
        if self == 404:
            message: str = "Not Found"
        elif self == 405:
            message: str = "Methods Not Allowed"
        elif self == 500:
            message: str = "Server Error"

        print(message)
        return message
