import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UserDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    _id?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    username?: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty({required: false, description: "Last time the user logged in the system."})
    @IsString()
    @IsOptional()
    lastLoginAt?: string

    @ApiProperty({required: false, readOnly: true})
    @IsString()
    @IsOptional()
    readonly createdAt?: string

    @ApiProperty({required: false, readOnly: true})
    @IsString()
    @IsOptional()
    readonly updatedAt?: string

    @ApiProperty()
    @Type(() => OAuth)
    oAuth?: OAuth
   
}

class OAuth {

    @ApiProperty()
    @IsString()
    provider: string

    @ApiProperty()
    @IsString()
    providerId: string

    @ApiProperty()
    @IsString()
    accessToken: string

    @ApiProperty()
    @IsString()
    refreshToken: string
}