import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/models/user";

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);