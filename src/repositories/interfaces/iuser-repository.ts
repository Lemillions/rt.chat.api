import { User } from "../../models/user";

export interface IUserRepository {
    save(user: User);
    get(id: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
}