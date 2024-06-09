import { randomUUID } from "crypto";

export interface IMessageProps {
  content: string;
  userId: string;
  channelId: string;
}

export class Message {
  private id: string;
  private props: IMessageProps = {
    content: null,
    userId: null,
    channelId: null,
  };

  constructor(props: IMessageProps, id?: string) {
    this.setId(id || randomUUID());
    this.setContent(props.content);
    this.setUserId(props.userId);
    this.setChannelId(props.channelId);
  }

  getId() {
    return this.id;
  }

  getContent() {
    return this.props.content;
  }

  getUserId() {
    return this.props.userId;
  }

  getChannelId() {
    return this.props.channelId;
  }

  setId(id: string) {
    this.id = id;
  }

  setContent(content: string) {
    if (content.length < 1) {
      throw new Error('A mensagem deve ter no mínimo 1 caractere.');
    }
    this.props.content = content;
  }

  setUserId(userId: string) {
    this.props.userId = userId;
  }

  setChannelId(channelId: string) {
    this.props.channelId = channelId;
  }

  toJSON() {
    return {
      id: this.getId(),
      content: this.getContent(),
      userId: this.getUserId(),
      channelId: this.getChannelId(),
    };
  }

  static create(props: IMessageProps) {
    return new Message(props);
  }
}