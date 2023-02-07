import { extname } from "path";
import { v4 as uuid } from 'uuid';

/**
 * File UUID Random Making
 * Date: 2023.02.07
 * Author: Kim Gyeong Seok
 */
export const uuidRandom = () => {
  const uuidRandomName: string = uuid();
  return uuidRandomName;
}

/**
 * File UUID Random Making
 * Date: 2023.02.07
 * Author: Kim Gyeong Seok
 */
export const uuidFileName = (file: any) => {
  const uuidName: string = `${uuid()}${extname(file.originalname)}`;
  return uuidName;
}