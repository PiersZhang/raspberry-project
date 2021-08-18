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

var DHTSeries = require('rx-dht-sensor');

// 创建驱动实例
var dht11 = new DHTSeries({
  model: 'dht11',
  address: 17
});

// 简单的使用 fetch 方法读取传感器的值，如读取失败，err 参数不为 null
dht11.fetch(function (err, temperature, humidity) {
  if (err) {
    return console.error('a error occur when read dht-sensor:', err);
  }
  console.log('temperature: ' + temperature.toFixed(1) + ', humidity: ' + humidity.toFixed(1));
});