import { Global, Module } from '@nestjs/common';
import { ClockService } from './clock.service';

@Global()
@Module({
    providers: [
        {
            provide: 'ClockServiceInterface',
            useClass: ClockService,
        }
    ],
    exports: [
        {
            provide: 'ClockServiceInterface',
            useClass: ClockService,
        },
    ],
})
export class ClockModule { }