// var DHTSeries = require('rx-dht-sensor');
// // 创建实例
// var dht11 = new DHTSeries({
//   model: 'dht11',
//   address: 4
// });
// // 每隔 2000毫秒（2秒） 刷新一次
// var observable = dht11.observe(2000);
// // 开始实时刷新，把结果打印出来
// var subscription = observable.then(function subscribe(value) {
//     console.log('temperature: ' + value.t.toFixed(1) + ', humidity: ' + value.h.toFixed(1));
// }, function onError(err) {
//     console.error('dht-sensor monitoring error.');
// });
// // 如果想停止刷新，可以使用 dispose() 停止.
// // subscription.dispose()

var sensor = require("node-dht-sensor");
 
sensor.read(11, 4, function(err, temperature, humidity) { // 11代表传感器型号，4代表GPIO4
  if (!err) {
    console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
  }
});