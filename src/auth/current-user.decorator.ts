import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from './dtos';

export const getCurrentUserByContext = (context: ExecutionContext): UserDto => {
    if (context.getType() === 'http') {
        return context.switchToHttp().getRequest().user;
    }
    if (context.getType() === 'rpc') {
        return context.switchToRpc().getData().user;
    }
};

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context),
);