import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.log(`Method: ${req.method}, Path: ${req.path}`);
    next();
  }
}
