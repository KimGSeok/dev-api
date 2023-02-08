import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { uuidFileName } from "./uuid";

/**
 * FileUpload Multer
 * Date: 2023.02.07
 * Author: Kim Gyeong Seok
 */
export const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {

      // Parameter
      const uuid = req.headers.uuid;
      const today = new Date();
      const year = today.getFullYear();
      const month = ('0' + (today.getMonth() + 1)).slice(-2);
      const day = ('0' + today.getDate()).slice(-2);
      const dateString = year + '-' + month + '-' + day;
      const uploadPath: string = `src/public/${dateString}/${uuid}}`;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, uuidFileName(file));
    }
  })
}