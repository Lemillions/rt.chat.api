import { User } from "../../../models/user";
import { CreateUserService } from "../../../services/user/create-user.service";
import { InMemoryUserRepository } from "../../repositories/in-memory-user-repository";

describe('CreateUserService', () => {
    it('should create a user', async () => {
        const userRepository = new InMemoryUserRepository();
        const createUserService = new CreateUserService(userRepository);

        const user = await createUserService.execute({
            email: 'test@gmail.com',
            password: 'Test@123',
            username: 'test'
        });

        expect(user).toBeTruthy();
        expect(user).toBeInstanceOf(User);
        expect(user).toBe(await userRepository.getByEmail(user.getEmail()));
        expect(user.getId()).toBeTruthy();
        expect(user.getEmail()).toBe('test@gmail.com');
        expect(user.getUsername()).toBe('test');
    })

    it('should throw an error when email is already in use', async () => {
        const userRepository = new InMemoryUserRepository();
        const createUserService = new CreateUserService(userRepository);

        await createUserService.execute({
            email: 'test@gmail.com',
            password: 'Test@123',
            username: 'test'
        });

        await expect(createUserService.execute({
            email: 'test@gmail.com',
            password: 'Test@123',
            username: 'test'
        })).rejects.toThrow('Já existe um usuário com o email informado.');
    })
});