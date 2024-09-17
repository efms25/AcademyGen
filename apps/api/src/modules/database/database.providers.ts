import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../../constants/providers'

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URL),
  },
];