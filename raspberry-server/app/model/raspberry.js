import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Raspberry extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      temperature: this.temperature,
      humidity: this.humidity
    };
    return origin;
  }
}

Raspberry.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    temperature: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    humidity: {
      type: Sequelize.FLOAT,
      allowNull: true
    }
  },
  merge(
    {
      sequelize,
      tableName: 'raspberry',
      modelName: 'Raspberry'
    },
    InfoCrudMixin.options
  )
);

export { Raspberry as RaspberryModel };
