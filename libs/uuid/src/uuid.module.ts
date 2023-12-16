import { Module ,Global } from '@nestjs/common';
import { UUIDService } from './uuid.service';

@Global()
@Module({
  providers: [
    {
      provide: 'UUIDServiceInterface',
      useClass: UUIDService,
    },
  ],
  exports: [
    {
      provide: 'UUIDServiceInterface',
      useClass: UUIDService,
    },
  ],
})
export class UuidModule {}
