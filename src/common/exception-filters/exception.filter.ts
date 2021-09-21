import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: Response = context.getResponse();
    const code = exception.getStatus();

    response.status(code).json({
      timestamp: new Date().toISOString(),
      status: 'fail',
      data: {
        message: exception.message,
      },
      code,
    });
  }
}
