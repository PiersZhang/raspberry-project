import RPi.GPIO as GPIO
import time
import requests
import json

root = "http://172.20.10.3:5000/api/raspberry"

def init():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD)
    # 人体传感器入口引脚
    GPIO.setup(12, GPIO.IN)
    # led灯入口引脚
    GPIO.setup(16, GPIO.OUT)
    pass


def detct():
    # 变量，记录连续5秒（次）人体传感器信号为低频，则led灯灭
    count = 0
    while True:
        if GPIO.input(12) == True:
            count *= 0
            GPIO.output(16, GPIO.HIGH)
            print('it is here!!!')
            url = root + '/setLight/1'
            try:
                res = requests.get(url = url)
            except:
                print("setLight1 error")
        else:
            count += 1
            if count > 5:
                GPIO.output(16, GPIO.LOW)
            print('fucking nobody!!!')
            url = root + '/setLight/0'
            try:
                res = requests.get(url = url)
            except:
                print("setLight0 error")
        time.sleep(1)


time.sleep(3)
init()
detct()
GPIO.cleanup()