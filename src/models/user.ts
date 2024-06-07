import { hash, compare } from 'bcrypt';
import { randomUUID } from 'crypto';
import { UserUtils } from '../util/user.util';

interface IUserProps {
  username: string;
  email: string;
  password: string;
}

export class User {
  private id: string;
  private props: IUserProps = {
    username: null,
    email: null,
    password: null,
  };

  constructor(props: IUserProps, id?: string) {
    this.setId(id || randomUUID());
    this.setUsername(props.username);
    this.setEmail(props.email);
    this.setPassword(props.password);
  }

  getId() {
    return this.id;
  }

  getUsername() {
    return this.props.username;
  }

  getEmail() {
    return this.props.email;
  }

  getPassword() {
    return this.props.password;
  }

  setId(id: string) {
    this.id = id;
  }

  setUsername(username: string) {
    this.props.username = username;
  }

  setEmail(email: string) {
    if (!UserUtils.isEmailValid(email)) {
      throw new Error('O email informado é inválido.');
    }
    this.props.email = email;
  }

  setPassword(password: string) {
    this.props.password = password;
  }

  async createNewPassword(pass: string) {
    if (!UserUtils.isPasswordValid(pass)) {
      throw new Error(
        'A senha precisa ter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial. No mínimo 8 caracteres e no máximo 20.',
      );
    }
    const hashPass = await hash(pass, 10);
    this.setPassword(hashPass);
  }

  async checkPassword(password: string) {
    return compare(password, this.getPassword());
  }

  static async create(props: IUserProps) {
    const user = new User({
      ...props,
    });

    await user.createNewPassword(props.password);

    return user;
  }

  toJSON() {
    return {
      id: this.getId(),
      username: this.getUsername(),
      email: this.getEmail(),
    };
  }
}
