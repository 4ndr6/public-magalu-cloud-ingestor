import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
// import { AuthenticationMiddleware } from './middlewares/authentication/authentication.middleware';
// import { AuthorizationMiddleware } from './middlewares/authorization/authorization.middleware';
import { ProductModule } from './modules/product/product.module';
import { PulseModule } from './modules/pulse/pulse.module';
import { TenantModule } from './modules/tenant/tenant.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      debug: true,
      introspection: true,
      persistedQueries: false,
      playground: true,
      sortSchema: false,
      installSubscriptionHandlers: false,
    }),
    TenantModule,
    ProductModule,
    PulseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const all: RouteInfo = { path: '*', method: RequestMethod.ALL };
    consumer.apply(LoggerMiddleware).forRoutes(all);
    // Autenticação e Autorização
    // const root = { path: '/', method: RequestMethod.GET };
    // const playground = { path: '/graphql/playground', method: RequestMethod.ALL };
    // consumer.apply(AuthenticationMiddleware).exclude(root, playground).forRoutes(all);
    // consumer.apply(AuthorizationMiddleware).exclude(root, playground).forRoutes(all);
  }
}
