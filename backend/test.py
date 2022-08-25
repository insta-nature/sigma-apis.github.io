from itertools import count
import sys
from flask import jsonify
from sigma import voice

l = 'aaaaaa'
cn =0
for i in l:
    cn += 1
print(cn)


# obj = voice()
# command = 'open youtube play song'
# data = obj.cmd(command)
# data = jsonpickle.decode(data)
# msg = {'Message':data}
# # data = jsonify(data)
# print(msg)
#=======================================================================
# import json
# import jsonpickle
# from json import JSONEncoder
# sampleSet = {25, 45, 65, 85}

# print("Encode set into JSON using jsonpickle")
# sampleJson = jsonpickle.encode(sampleSet)
# print(sampleJson)

# # Pass sampleJson to json.dump() if you want to write it in file

# print("Decode JSON into set using jsonpickle")
# decodedSet = jsonpickle.decode(sampleJson)
# print(decodedSet)

# # to check if we got set after decoding
# decodedSet.add(95)
# print(decodedSet)