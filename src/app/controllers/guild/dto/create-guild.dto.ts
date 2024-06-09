import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateGuildDto {
  @MinLength(3, { message: 'Campo nome da guild deve ter no mínimo 3 caracteres'})
  @IsString({ message: 'Campo descrição da guild deve ser uma string'})
  @IsNotEmpty({ message: 'Campo nome da guild é obrigatório'})
  guildName: string;

  @IsOptional()
  @MinLength(10, { message: 'Campo descrição da guild deve ter no mínimo 10 caracteres'})
  @IsString({ message: 'Campo descrição da guild deve ser uma string'})
  description: string;
}