import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ProductMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Put validation, or authentication here.
    // ...
    // const userAgent = req.headers["user-agent"]
    // console.log("userAgent====  ",userAgent)
    // req["userAgent"] = userAgent
    // next()

    next();
  }
}
