import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ProductMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    // Put validation, or authentication here.
    console.log("In log file")
    // res.on('finish', () => {
    //   const statusCode = res.statusCode;
    //   if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
    //     this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}`);
    //   }
    // });

    next();
  }
}
