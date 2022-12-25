import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import authConfig from './config/authConfig';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [
				`${__dirname}/config/env/.${process.env.NODE_ENV}.env`,
			],
			load: [emailConfig, authConfig],
			isGlobal: true,
			validationSchema,
		}),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DATABASE_HOST,
			port: 3306,
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: 'test',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
			migrations: [__dirname + '/**/migrations/*.js'],
			migrationsTableName: 'migrations',
		}),
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
