import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { EmailService } from '../email/email.service';
import * as uuid from 'uuid';
import { UserInfo } from './dto/user-info';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { query } from 'express';

@Injectable()
export class UsersService {
	constructor(
		private dataSource: DataSource,
		private emailService: EmailService,
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>,
	) {}
	async createUser(name: string, email: string, password: string) {
		const userExist = await this.checkUserExists(email);

		if (userExist) {
			throw new UnprocessableEntityException(
				'해당 이메일로는 가입할 수 없습니다.',
			);
		}

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

	private async checkUserExists(emailAddress: string): Promise<boolean> {
		const user = await this.usersRepository.findOne({
			where: { email: emailAddress },
		});

		return user !== null;
	}

	private async saveUser(
		name: string,
		email: string,
		password: string,
		signupVerifyToken: string,
	) {
		const user = new UserEntity();

		user.id = ulid();
		user.name = name;
		user.email = email;
		user.password = password;
		user.signupVerifyToken = signupVerifyToken;

		await this.usersRepository.save(user);
	}

	private async saveUserUsingQueryRunner(
		name: string,
		email: string,
		password: string,
		signupVerifyToken: string,
	) {
		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const user = new UserEntity();

			user.id = ulid();
			user.name = name;
			user.email = email;
			user.password = password;
			user.signupVerifyToken = signupVerifyToken;

			await queryRunner.commitTransaction();
		} catch (e) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}

	private async saveUserUsingTransaction(
		name: string,
		email: string,
		password: string,
		signupVerifyToken: string,
	) {
		await this.dataSource.transaction(async (manager) => {
			const user = new UserEntity();

			user.id = ulid();
			user.name = name;
			user.email = email;
			user.password = password;
			user.signupVerifyToken = signupVerifyToken;

			await manager.save(user);
		});
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
