import { Connection } from 'mongoose'
import { User, UserSchema } from '../../schemas/user.schema'
import { MODELS } from '../../constants/providers'
import { DATABASE_CONNECTION } from '../../constants/providers'

export const userProviders = [
    {
        provide: MODELS.USER_MODEL,
        useFactory: async (connection: Connection) => {
            return connection.model(User.name, UserSchema)
        },
        inject: [DATABASE_CONNECTION]
    }
]