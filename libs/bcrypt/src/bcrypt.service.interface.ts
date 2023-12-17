export interface BcryptService {

  /**雜湊密碼
   * 
   * @param plainPassword  密碼
   * @returns 
   */
  genHash(plainPassword: string): string;

  /**密碼碰撞
   * 
   * @param plainPassword 輸入密碼
   * @param hashedPassword 雜湊密碼
   * @returns 
   */
  compare(plainPassword: string, hashedPassword: string): boolean;
}
