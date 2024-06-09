import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { UserUtils } from 'src/util/user.util';

export class RegisterDto {
  @IsString({ message: 'Campo username deve ser uma string' })
  @IsNotEmpty({ message: 'Campo username é obrigatório' })
  username: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsString({ message: 'Campo email deve ser uma string' })
  @IsNotEmpty({ message: 'Campo email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Campo senha é obrigatório' })
  @Matches(UserUtils.REGEX_PASSWORD, {
    message:
    'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    })
  @IsString({ message: 'Campo senha deve ser uma string' })
  password: string;
}
