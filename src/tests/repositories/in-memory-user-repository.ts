import { User } from "../../models/user";
import { IUserRepository } from "../../repositories/interfaces/iuser-repository";

export class InMemoryUserRepository implements IUserRepository {
    private users: User[] = [];

    async save(user: User) {
        const index = this.users.findIndex((u) => u.getId() === user.getId());
        
        if (index >= 0) {
            this.users[index] = user;
        } else {
            this.users.push(user);
        }
    }

    async get(id: string): Promise<User> {
        return this.users.find((user) => user.getId() === id);
    }

    async getByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.getEmail() === email);
    }
}