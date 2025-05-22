import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @IsEmail()
  @ApiProperty({example: "user@example.com"})
  email: string;

  @IsString()
  @ApiProperty({example: "strong@Password123"})
  password: string;
}
