import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    if (process.env.MIDDLEWARE_AUTHENTICATION === 'true') {
      throw new HttpException(`Unauthorized by Middleware`, HttpStatus.UNAUTHORIZED);
    }
    // adicionar validações aqui, lançar exceção caso não seja válida
    next();
  }
}
