import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Headers,
	UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UserInfo } from './dto/user-info';
import { AuthGuard } from '../auth.guard';

@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService,
		private authService: AuthService,
	) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<void> {
		const { name, email, password } = createUserDto;

		await this.usersService.createUser(name, email, password);
	}

	@Post('/email-verify')
	async verifyEmail(
		@Query() verifyEmailDto: VerifyEmailDto,
	): Promise<string> {
		const { signupVerifyToken } = verifyEmailDto;

		return await this.usersService.verifyEmail(signupVerifyToken);
	}

	@Post('/login')
	async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
		const { email, password } = userLoginDto;

		return await this.usersService.login(email, password);
	}

	@UseGuards(AuthGuard)
	@Get('/:id')
	async getUserInfo(
		@Headers() headers: any,
		@Param('id') userId: string,
	): Promise<UserInfo> {
		return this.usersService.getUserInfo(userId);
	}
}
