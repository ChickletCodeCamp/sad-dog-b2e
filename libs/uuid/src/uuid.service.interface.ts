export interface UUIDServiceInterface {
  /**
   * 回傳 uuid
   */
  getUUID(): Promise<string>;
}
