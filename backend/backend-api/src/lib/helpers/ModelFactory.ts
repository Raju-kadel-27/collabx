import { Container } from 'typedi';

/*
Extracting the required containers from typedi
*/
export class ModelFactory {
    static getModels() {
        const ChatModel = Container.get('chatModel');
        const UserModel = Container.get('userModel');
        const MessageModel = Container.get('messageModel');

        return {
            ChatModel,
            UserModel,
            MessageModel,
        };
    }
}
export class RepositoryFactory {
    static getRepositories() {
        const ChatRepository = Container.get('chatRepository')
        const UserRepository = Container.get('userRepository')
        const MessageRepository = Container.get('messageRepository')

        return {
            ChatRepository,
            UserRepository,
            MessageRepository
        }
    }
}