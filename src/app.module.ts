/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './config/constants';
import { AbilityModule } from './ability/ability.module';
import { RolesModule } from './roles/roles.module';
import { FarmsModule } from './farms/farms.module';
import { CacheModule } from './cache/cache.module';
import databaseConfig from './config/database.config';
import { VerifyTokenMiddleware } from './common/middleware/verify-token.middleware';
import { OrdersModule } from './orders/orders.module';
import { OrderStatementsModule } from './order-statements/order-statements.module';
import { TrucksModule } from './trucks/trucks.module';
import { RoutesModule } from './routes/routes.module';
import { RouteOrdersModule } from './route-orders/route-orders.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => config.get(TYPEORM_CONFIG),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
        }),
        UsersModule,
        AuthModule,
        AbilityModule,
        RolesModule,
        FarmsModule,
        CacheModule,
        OrdersModule,
        OrderStatementsModule,
        TrucksModule,
        RoutesModule,
        RouteOrdersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(VerifyTokenMiddleware)
            .exclude({ path: 'auth/login', method: RequestMethod.POST })
            .forRoutes('*');
    }
}
