import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty()
    _id?: string;

    @ApiProperty()
    username?: string

    @ApiProperty()
    email: string

    @ApiProperty()
    password?: string

    @ApiProperty()
    status?: string

    @ApiProperty()
    profileId?: string

    @ApiProperty()
    createdAt?: string

    @ApiProperty()
    updatedAt?: string

    
}