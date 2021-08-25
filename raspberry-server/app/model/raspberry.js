import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Raspberry extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      temperature: this.temperature,
      humidity: this.humidity,
      light: this.light
    };
    return origin;
  }
  static async initRaspberry () {
    const raspberry = await this.findOne();
    if (!raspberry || !raspberry.id) {
      this.create(
        {
          temperature: 26.0,
          humidity: 60.0,
          light: '0'
        }
      );
    }
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
    },
    light: {
      type: Sequelize.STRING({ length: 10 }),
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
