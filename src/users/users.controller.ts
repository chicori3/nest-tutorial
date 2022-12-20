import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Redirect,
	Query,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<void> {
		console.log(createUserDto);
	}

	@Post('/email-verify')
	async verifyEmail(
		@Query() verifyEmailDto: VerifyEmailDto,
	): Promise<string> {
		console.log(verifyEmailDto);
		return;
	}

	@Post('/login')
	async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
		console.log(userLoginDto);
		return;
	}

	@Get('/:id')
	async getUserInfo(@Param('id') userId: string): Promise<string> {
		console.log(userId);
		return;
	}
}
