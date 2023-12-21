import { Controller } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('dog')
@Roles(Role.Admin, Role.Manager)
export class DogController { }
