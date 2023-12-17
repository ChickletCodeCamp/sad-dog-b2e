import { Global, Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

@Global()
@Module({
  providers: [{
    provide: 'BcryptServiceInterface',
    useClass: BcryptService
  }],
  exports: [{
    provide: 'BcryptServiceInterface',
    useClass: BcryptService
  }],
})
export class BcryptModule { }
