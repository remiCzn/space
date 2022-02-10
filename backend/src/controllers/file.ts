import {ApiRequest, ApiResponse} from "../utils/expressUtils";
import fs from "fs";
import {UploadedFile} from "express-fileupload";
import {__basedir} from "../global";
import {FileRepository} from "../database/file";

export class FileBusinessController {
    private baseUrl: string;
    private fileRepo: FileRepository;

    public constructor() {
        this.baseUrl = "http://localhost:8080/";
        this.fileRepo = new FileRepository();

        this.upload = this.upload.bind(this);
        this.getListFiles = this.getListFiles.bind(this);
    }

    public async upload(req: ApiRequest<any>, res: ApiResponse<any>) {
        try {
            if (req.files == undefined || req.files?.file == undefined) {
                return res.sendStatus(400);
            }

            const file: UploadedFile = <UploadedFile>req.files.file;
            const name: string = file.name;
            const path: string = "public/static/upload/";
            const extension: string = name.split(".").at(-1)!;

            await this.fileRepo.addFile(name, path).then((id: number) => {
                file.mv(__basedir + path + id + "." + extension).then(() => {
                    res.status(200).send("okkok ");
                });
            });
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
