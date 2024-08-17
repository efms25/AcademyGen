import { BadGatewayException, Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user/user.dto';
import { IUser } from './interface/User.interface';

let mockDb = [{
    _id: '123345abc',
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    password: 'password123',
}]
@Injectable()
export class UserService {
    private database

    constructor() {
        this.database = mockDb;
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
            return this.database.find(f => f.id = id)
        } catch(err) {
            throw new Error(err)
        }
    }

    public async getUserByAccess(password: string, email?: string, username?:string): Promise<UserDTO|string> {
        try{
            if(!password || (!email && !username)) {
                return "missing parameters";
            }
            const user = this.database.find(f => f.password === password && (f.email === email || f.username === username ));

            return user || 'user not found';
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
