import { INestApplication, Logger } from '@nestjs/common';

export async function shutdown(app: INestApplication, logger: Logger) {
  try {
    await app.close();
  } catch (error) {
    logger.error(error);
    process.exitCode = 1;
  }
}

export function handleProcessErrors(app: INestApplication, logger: Logger) {
  process.on('unhandledRejection', (e) => {
    logger.error(e);
    process.exit(1);
  });
  process.on('SIGINT', async () => {
    logger.warn('Got SIGINT. Graceful shutdown');
    await shutdown(app, logger);
  });
  process.on('SIGTERM', async () => {
    logger.warn('Got SIGTERM. Graceful shutdown');
    await shutdown(app, logger);
  });
}
