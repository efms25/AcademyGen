import { Inject, Injectable } from '@nestjs/common';
import { MODELS } from '../../constants/providers';
import { UserDTO } from '../../dtos/user/user.dto';
import { IUser } from './interface/User.interface';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class UserService {

    constructor(@Inject(MODELS.USER_MODEL) private userModel: Model<User>) {
        
    }

    public async createUser(userParams:IUser): Promise<Boolean | Object> {
        if(!userParams.email || !userParams.password) {
            return {error: true, message: "email and password are required"}
        }
        if(userParams.password.length < 8) {
            return {error: true, message: "the password should have 8 characters or more"}
        }
        return true;
    }

    public async getUserById(id: string): Promise<UserDTO|string> {
        try{
            if(!id) return "Id is required";
            return this.userModel.findById(id)
        } catch(err) {
            throw new Error(err)
        }
    }

    public async getUserByAccess(password: string, username:string): Promise<UserDTO[]|string> {
        try{
            if(!password || !username) {
                return "missing parameters";
            }
           

            return await this.userModel.find({
                username,
                password
            })
        } catch(err) {
            throw new Error(err)
        }
    }

    public async updateUser(params: IUser) {
        return null
    }

    public async deleteUser(id: string) {
        return null
    }
}
