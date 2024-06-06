import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { User } from "../../models/user";
import { IUserRepository } from "../../repositories/interfaces/iuser-repository";
import { UserRepository } from "../../repositories/user-repository";

@Injectable()
export class CreateUserService {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: IUserRepository) { }

    async execute({
        email,
        password,
        username,
    }: {
        email: string;
        password: string;
        username: string;
    }) {
        const userAlreadyExist = await this.userRepository.getByEmail(email);

        if (userAlreadyExist) {
            throw new BadRequestException('Já existe um usuário com o email informado.');
        }

        const user = await User.create({
            email,
            password,
            username,
        });

        await this.userRepository.save(user);

        return user;
    }
}