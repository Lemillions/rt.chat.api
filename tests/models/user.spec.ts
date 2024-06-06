import { User } from "../../src/models/user";

describe('User', () => {
    it('should throw an error when email is invalid', () => {
        const props = {
            username: 'test',
            email: 'invalid',
            password: 'Test@123'
        }

        expect(User.create(props)).rejects.toThrow('O email informado é inválido.');
    });

    it('should throw an error when password not have uppercase letters',async () => {
        const props = {
            username: 'test',
            email: 'teste@mail.com',	
            password: 'test@123'
        }

        expect(User.create(props)).rejects.toThrow('A senha precisa ter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial. No mínimo 8 caracteres e no máximo 20.');
    })


    it('should create a new user', async () => {
        const props = {
            username: 'test',
            email: 'test@mail.com',
            password: 'Test@123'
        }

        const user = await User.create(props);

        expect(user).toBeInstanceOf(User);
        expect(user.getId()).toBeTruthy();
        expect(user.getUsername()).toBe(props.username);
        expect(user.getEmail()).toBe(props.email);
        expect(user.checkPassword(props.password)).toBeTruthy();
    })
})