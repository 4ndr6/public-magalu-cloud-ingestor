import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    if (process.env.MIDDLEWARE_AUTHORIZATION === 'true') {
      throw new HttpException(`Forbidden by Middleware`, HttpStatus.FORBIDDEN);
    }
    // adicionar validações aqui, lançar exceção caso não seja válida
    next();
  }
}
