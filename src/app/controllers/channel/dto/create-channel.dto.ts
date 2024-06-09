import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateChannelDto {
  @MinLength(3, { message: 'Campo nome deve ter no mínimo 3 caracteres' })
  @IsString({ message: 'Campo nome deve ser uma string' })
  @IsNotEmpty({ message: 'Campo nome é obrigatório' })
  name: string;
}