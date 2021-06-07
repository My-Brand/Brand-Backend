import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private logger: Logger = new Logger('EXCEPTION');
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const isHttp = exception instanceof HttpException;
    if (exception?.message) this.logger.error(exception?.message);
    else this.logger.error(exception?.stack);
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    if (status === 500) Logger.error(exception);
    response.status(status).json({
      status: status,
      error: isHttp
        ? exception.response.message
        : 'Sorry, An Internal Error Occurred.',
    });
  }
}
