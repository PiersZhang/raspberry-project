import { LinRouter, disableLoading } from 'lin-mizar';
import { RaspberryDao } from '../../dao/raspberry';
import { RaspberryModel } from '../../model/raspberry';

const raspberryApi = new LinRouter({
  prefix: '/api/raspberry',
  module: '树莓派'
});

const raspberryDto = new RaspberryDao();
RaspberryModel.initRaspberry();

raspberryApi.get('/getTempAndHum', async ctx => {
  const raspberry = await raspberryDto.getTempAndHum();
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
raspberryApi.get('/setLight/:light', async ctx => {
  await raspberryDto.setLight(ctx.params.light);
  ctx.success({
    code: 0
  });
});

module.exports = { raspberryApi, [disableLoading]: false };
