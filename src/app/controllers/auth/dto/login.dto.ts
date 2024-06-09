import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido'})
  @IsString({ message: 'Campo email deve ser uma string'})
  @IsNotEmpty({ message: 'Campo email é obrigatório'})
  email: string;

  @IsString({ message: 'Campo senha deve ser uma string'})
  @IsNotEmpty({ message: 'Campo senha é obrigatório'})
  password: string;
}