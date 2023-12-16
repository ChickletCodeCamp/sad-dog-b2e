import { Injectable } from '@nestjs/common';
import { UUIDServiceInterface } from './uuid.service.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UUIDService implements UUIDServiceInterface {
    /**
     * 取得 uuid
     */
   async getUUID(): Promise<string> {
        const uuid = uuidv4(); 
        return uuid;
    }
}
