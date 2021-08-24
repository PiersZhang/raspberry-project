import RPi.GPIO as GPIO
import time
import requests
import json

root = "http://172.20.10.3:3000"

def init():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD)
    # 人体传感器入口引脚
    GPIO.setup(12, GPIO.IN)
    # led灯入口引脚
    GPIO.setup(16, GPIO.OUT)
    pass


def detct():
    while True:
        if GPIO.input(12) == True:
            GPIO.output(16, GPIO.HIGH)
            print('it is here!!!')
            url = root + '/1'
            res = requests.post(url = url)
        else:
            GPIO.output(16, GPIO.LOW)
            print('fucking nobody!!!')
            url = root + '/0'
            res = requests.post(url = url)
        time.sleep(1)


time.sleep(3)
init()
detct()
GPIO.cleanup()