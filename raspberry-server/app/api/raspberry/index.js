import { LinRouter, disableLoading } from 'lin-mizar';
import { RaspberryDao } from '../../dao/raspberry';

const raspberryApi = new LinRouter({
  prefix: '/api/raspberry',
  module: '树莓派'
});

const raspberryDto = new RaspberryDao();

raspberryApi.get('/getTempAndHum', async ctx => {
  const raspberry = await raspberryDto.getTemperature();
  ctx.json({
    temperature: raspberry.temperature,
    humidity: raspberry.humidity
  });
});
raspberryApi.get('/setTempAndHum/:temperature/:humidity', async ctx => {
  await raspberryDto.setTempAndHum(ctx.params.temperature, ctx.params.humidity);
  ctx.success({
    code: 0
  });
});
// raspberryApi.get('/setHumidity/:humidity', async ctx => {
//   await raspberryDto.setHumidity(ctx.params.humidity);
//   ctx.success({
//     code: 0
//   });
// });

module.exports = { raspberryApi, [disableLoading]: false };
