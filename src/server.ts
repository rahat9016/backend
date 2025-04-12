import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
// import { errorconsole, logger } from './shared/logger';

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;

console.log('ok server');
async function bootstrap() {
  try {
    // await mongoose.connect(`${process.env.mongo_url}` as string);
    // console.log("url", process.env.mongo_url)
    await mongoose.connect(config.database_url as string);
    console.info(`Databse connected successfully`);

    server = app.listen(config.port, () => {
      console.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(`Failed to connect to Mongo`, err);
  }
}

process.on('unhandledRejection', error => {
  console.log('Unhandled rejection is detected, server is closing');
  if (server) {
    server.close(() => {
      console.error(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

bootstrap();

process.on('SIGTERM', (e) => {
  console.log(e)
  console.info(`SIGTERM is received`);
  if (server) {
    server.close();
  }
});
