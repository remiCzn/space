import { ApiRequest, ApiResponse } from "../utils/expressUtils";
import uploadFileMiddleware from "../utils/file";
import fs from "fs";

export class FileBusinessController {
  private baseUrl: string;

  public constructor() {
    this.baseUrl = "http://localhost:8080/";
    this.upload = this.upload.bind(this);
    this.getListFiles = this.getListFiles.bind(this);
  }

  public async upload(req: ApiRequest<any>, res: ApiResponse<any>) {
    console.log(req.file, req.files);
    try {
      //await uploadFileMiddleware(req, res);

      if (req.file == undefined) {
        return res.sendStatus(400);
      }

      res.status(200).send("okkok " + req.file.originalname);
    } catch (err: any) {
      console.log(err);
      if (err.code == "LIMIT_FILE_SIZE") {
        res.sendStatus(500);
      }

      res.sendStatus(500);
    }
  }

  public async getListFiles(req: ApiRequest<any>, res: ApiResponse<any>) {
    const directory = __dirname + "/public/static/uploads";

    const files = fs.readdirSync(directory);
    let fileInfos: Array<{
      name: string;
      url: string;
    }> = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: this.baseUrl + file,
      });
    });

    res.status(200).json(fileInfos);
  }
}
