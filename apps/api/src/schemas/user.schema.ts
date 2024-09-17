import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose'

@Schema()
export class OAuth {
    @Prop()
    provider: string

    @Prop()
    providerId: string

    @Prop()
    accessToken: string

    @Prop()
    refreshToken: string
}

export type UserType = HydratedDocument<User>

@Schema({timestamps: true})
export class User {
    
    @Prop({required: true, index: 1})
    email: string;

    @Prop({required: false, index: 1})
    username?: string;

    @Prop({required: true})
    password: string

    @Prop({type: Date})
    lastLoginAt?: Date

    @Prop({
        type: OAuth,
        required: false
    })
    oAuth?: OAuth
}

export const UserSchema = SchemaFactory.createForClass(User)