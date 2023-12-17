import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BcryptServiceInterface } from './bcrypt.service.interface';

@Injectable()
export class BcryptService implements BcryptServiceInterface {
  private salt: string;
  constructor() {
    this.salt = bcrypt.genSaltSync(10);
  }

  /**雜湊密碼
   * 
   * @param plainPassword  密碼
   * @returns 
   */
  genHash(plainPassword: string): string {
    return bcrypt.hashSync(plainPassword, this.salt);
  }

  /**密碼碰撞
   * 
   * @param plainPassword 輸入密碼
   * @param hashedPassword 雜湊密碼
   * @returns 
   */
  compare(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}
