import { randomUUID } from 'crypto';

export interface IGuildProps {
  name: string;
  description: string;
}

export class Guild {
  private id: string;
  private props: IGuildProps = {
    name: null,
    description: null,
  };

  constructor(props: IGuildProps, id?: string) {
    this.setId(id || randomUUID());
    this.setName(props.name);
    this.setDescription(props.description);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.props.name;
  }

  getDescription() {
    return this.props.description;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    if (name.length < 3) {
      throw new Error('O nome da guilda deve ter no mínimo 3 caracteres.');
    }
    this.props.name = name;
  }

  setDescription(description: string) {
    if (description.length < 10) {
      throw new Error('A descrição da guilda deve ter no mínimo 10 caracteres.');
    }
    this.props.description = description;
  }

  static create(props: IGuildProps) {
    return new Guild(props);
  }
}
