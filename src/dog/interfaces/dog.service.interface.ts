import { CreateDogDto, DogDto } from "../dtos";

export interface DogServiceInterface {

    /**取得小狗
     * 
     * @param id 
     */
    getGogById(id: string): Promise<DogDto>;

    /**建立新小狗
     * 
     * @param dog 
     */
    createNewDog(dog: CreateDogDto): Promise<DogDto>;
}
