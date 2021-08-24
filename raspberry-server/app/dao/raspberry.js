// import { NotFound, Forbidden } from 'lin-mizar';
// import Sequelize from 'sequelize';
import { RaspberryModel } from '../model/raspberry';

class RaspberryDao {
  async getTemperature () {
    const raspberry = await RaspberryModel.findOne();
    return raspberry;
  }
  // async setTemperature (temperature) {
  //   const raspberry = await RaspberryModel.findOne();
  //   raspberry.temperature = temperature;
  //   await raspberry.save();
  // }
  async getHumidity () {
    const raspberry = await RaspberryModel.findAll();
    return raspberry;
  }
  async setTempAndHum (temperature, humidity) {
    const raspberry = await RaspberryModel.findOne();
    raspberry.temperature = temperature;
    raspberry.humidity = humidity;
    await raspberry.save();
  }
  // async setHumidity (humidity) {
  //   const raspberry = await RaspberryModel.findOne();
  //   raspberry.humidity = humidity;
  //   await raspberry.save();
  // }
}

export { RaspberryDao };
