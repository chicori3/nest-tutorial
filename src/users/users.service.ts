import { Injectable } from '@nestjs/common';

import { EmailService } from '../email/email.service';
import * as uuid from 'uuid';
import { UserInfo } from './dto/user-info';

@Injectable()
export class UsersService {
	constructor(private emailService: EmailService) {}
	async createUser(name: string, email: string, password: string) {
		await this.checkUserExists(email);

		const signupVerifyToken = uuid.v1();

		await this.saveUser(name, email, password, signupVerifyToken);
		await this.sendMemberJoinEmail(email, signupVerifyToken);
	}

	async login(email: string, password: string): Promise<string> {
		// TODO: email, password와 일치하는 유저를 확인하고 없으면 에러 처리
		// TODO: JWT를 발급

		throw new Error('Method not implemented.');
	}

	async getUserInfo(userId: string): Promise<UserInfo> {
		// TODO: userId와 일치하는 유저를 확인하고 없으면 에러 처리
		// TODO: 조회된 데이터를 응답

		throw new Error('Method not implemented.');
	}

	// TODO: DB 연동 후 작업
	private async checkUserExists(email: string) {
		return false;
	}

	// TODO: DB 연동 후 작업
	private async saveUser(
		name: string,
		email: string,
		password: string,
		signupVerifyToken: string,
	) {
		return;
	}

	private async sendMemberJoinEmail(
		email: string,
		signupVerifyToken: string,
	) {
		await this.emailService.sendMemberJoinVerification(
			email,
			signupVerifyToken,
		);
	}

	async verifyEmail(signupVerifyToken: string): Promise<string> {
		// TODO: DB에서 signupVerifyToken으로 가입 처리 중인 유저를 조회하고 없으면 에러 처리
		// TODO: 바로 로그인 상태가 되도록 JWT 발급

		throw new Error('Method not implemented.');
	}
}
