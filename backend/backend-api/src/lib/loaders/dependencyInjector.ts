import { Container } from 'typedi';
import { Logger } from './logger';

export default ({ mongoConnection, models }: any) => {
    try {
        Container.set('logger', Logger);
        Container.set('database', mongoConnection);

        models.forEach((m: { name: string, model: any }) => {
            Container.set(m.name, m.model);
        })

        Logger.info('✌️ Agenda injected into container');

    } catch (err) {
        Logger.error('🔥 Error on dependency Injector loader: %o', err);
        throw err;
    }
}
