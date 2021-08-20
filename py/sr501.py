import RPi.GPIO as GPIO
import time
import requests
import json

root = "http://172.20.10.3:3000"

def init():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(12, GPIO.IN)
    GPIO.setup(21, GPIO.OUT)
    pass

def beep():
    while GPIO.input(12):
        GPIO.output(21, GPIO.LOW)
        time.sleep(0.5)
        GPIO.output(21, GPIO.HIGH)
        time.sleep(0.5)

def detct():
    while True:
        if GPIO.input(12) == True:
            print('it is here!!!')
            url = root + '/1'
            res = requests.post(url = url)
            beep()
            print(res)
        else:
            GPIO.output(21, GPIO.HIGH)
            print('fucking nobody!!!')
            url = root + '/0'
            res = requests.post(url = url)
            print(res)
        time.sleep(1)


time.sleep(3)
init()
detct()
GPIO.cleanup()