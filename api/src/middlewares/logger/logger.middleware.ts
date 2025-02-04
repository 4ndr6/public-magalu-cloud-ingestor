import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: Function) {
    const { protocol, hostname, method, url } = req;
    Logger.debug(`${protocol}://${hostname} => ${url}`, method);
    next();
  }
}
