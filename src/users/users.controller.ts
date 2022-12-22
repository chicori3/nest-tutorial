import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

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

	@Get('/:id')
	async getUserInfo(@Param('id') userId: number): Promise<string> {
		console.log(userId);
		return;
	}
}
