
import RPi.GPIO as GPIO
import time
 
 
class RaspiTemperature(object):
    def __init__(self):
        self.channel = 4
        self.mode = GPIO.BCM
 
    def initial_dht11(self):
        """
        初始化dht11传感器，请参考dht11工作原理：
        1. 将4（BCM编码下，原始为12号）GPIO针脚置为输出模式，拉低电平，并保持18ms，然后拉高，初始化dht11；
        2. 然后将4号GPIO针脚置为输入模式，接受dht11传感器的反馈；
        :return: 
        """
        GPIO.setmode(self.mode)
        time.sleep(1)
        GPIO.setup(self.channel, GPIO.OUT)
        GPIO.output(self.channel, GPIO.LOW)
        time.sleep(0.018)
        GPIO.output(self.channel, GPIO.HIGH)
        GPIO.setup(self.channel, GPIO.IN)
 
    def get_data(self):
        """
        数据获取，请参考dht11工作原理：
        1. dht11会先拉低电平80us，然后拉高80us，告诉树莓派，我已初始化完毕，即将开始传输数据，因此这部分在python
        代码中利用while...continue处理即可
        2. 获取数据：这部分为最易混淆的地方，实际这也是核心代码部分
            # 数据0或1前面都有50us的低电平
            while GPIO.input(self.channel) == GPIO.LOW:
                continue
            # 由于程序无法精确控制us级别的sleep，因此采用如下方式计算高电平的计数，这里和CPU时钟及处理速度有关系，我不懂内部原理，期待大佬分享
            while GPIO.input(self.channel) == GPIO.HIGH:
                k += 1
                if k > 100:
                    break
            # 如果高电平计数小于8，则为0，否则为1
            if k < 8:
                data.append(0)
            else:
                data.append(1)
        
        :return: 
        """
        data = []
        count = 0
 
        # dht11拉低电平80us
        while GPIO.input(self.channel) == GPIO.LOW:
            continue
        # dht11拉高电平80us
        while GPIO.input(self.channel) == GPIO.HIGH:
            continue
        
        # 获取数据
        while count < 40:
            k = 0
            while GPIO.input(self.channel) == GPIO.LOW:
                continue
            while GPIO.input(self.channel) == GPIO.HIGH:
                k += 1
                if k > 100:
                    break
            if k < 8:
                data.append(0)
            else:
                data.append(1)
            count += 1
        return data
 
    def normalize_data(self, data):
        """
        数据规整，这里的知识点就一个：二进制数据转为十进制数，参见方法transform_binary
        :param data: 
        :return: 
        """
        humidity_int = self.transform_binary(data[0:8])
        humidity_decimal = self.transform_binary(data[8:16])
        temperature_int = self.transform_binary(data[16:24])
        temperature_decimal = self.transform_binary(data[24:32])
        check_int = self.transform_binary(data[32:40])
        tmp = humidity + humidity_point + temperature + temperature_point
        if check_int == tmp:
            print("temperature: {}.{}*c".format(temperature_int, temperature_decimal),\
                  "humidity: {}.{}%".format(humidity_int, humidity_decimal))
        else:
            print("failed to get data from dht11")
        GPIO.cleanup()
 
    @staticmethod
    def transform_binary(self, num_binary):
        num = 0
        for i in range(8):
            num += num[i] * 2 ** (7 - i)
        return num
 
 
if __name__ == '__main__':
    dht11 = RaspiTemperature()
    dht11.initial_dht11()
    data = dht11.get_data()
    dht11.normalize_data(data)