import mongoose, { CollationOptions, ConnectOptions } from 'mongoose';
import config from './config'

(async () => {

  try {
    // Opciones de configuración para la conexión
    const mongooseOptions: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // user: config.MONGO_USER,
      // pass: config.MONGO_PASSWORD
    }

    // Conexión
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
      mongooseOptions);
    console.log('database is connected to: ', db.connection.name);
  } catch (error) {
    console.error(error);
  }

})();