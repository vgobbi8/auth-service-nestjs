import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @ApiProperty({example: "email@mail.com"})
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({example: "strongpassword@123"})
  password: string;
}
