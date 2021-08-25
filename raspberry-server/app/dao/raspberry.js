// import { NotFound, Forbidden } from 'lin-mizar';
// import Sequelize from 'sequelize';
import { RaspberryModel } from '../model/raspberry';

class RaspberryDao {
  async getTempAndHum () {
    const raspberry = await RaspberryModel.findOne();
    return raspberry;
  }
  async setTempAndHum (temperature, humidity) {
    const raspberry = await RaspberryModel.findOne();
    raspberry.temperature = temperature;
    raspberry.humidity = humidity;
    await raspberry.save();
  }
  async setLight (light) {
    const raspberry = await RaspberryModel.findOne();
    raspberry.light = light;
    await raspberry.save();
  }
}

export { RaspberryDao };
