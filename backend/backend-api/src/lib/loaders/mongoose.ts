import mongoose, { ConnectOptions } from 'mongoose';
import config from '../../config';

export default async (): Promise<any> => {
    mongoose.set('strictQuery', false);
    const connection = await mongoose.connect(
        config.databaseURL,
        {
            // newUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions
    )
    return connection.connection.db
}

