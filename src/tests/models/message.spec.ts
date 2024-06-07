import { IMessageProps, Message } from "../../models/message";

describe('Message', () => {
  it('should create a message', () => {
    const props: IMessageProps = { content: 'Hello, World!', userId: 'userId', channelId: 'channelId' };

    const message = Message.create(props);

    expect(message).toBeInstanceOf(Message);
    expect(message.getContent()).toBe('Hello, World!');
    expect(message.getUserId()).toBe('userId');
    expect(message.getChannelId()).toBe('channelId');
  })

  it('should throw an error if the message content is less than 1 character', () => {
    const props: IMessageProps = { content: '', userId: 'userId', channelId: 'channelId' };

    expect(() => Message.create(props)).toThrow(
      'A mensagem deve ter no mínimo 1 caractere.'
    )
  })
})