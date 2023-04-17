import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HTTP EXCEPTION');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionData = {
      statusCode: exception.getStatus(),
      error: exception.message,
      method: request.method,
    };

    this.logger.error(exceptionData);

    response.status(exceptionData.statusCode).json(exceptionData);
  }
}
