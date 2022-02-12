import fs from "fs";
import {FileArray, UploadedFile} from "express-fileupload";
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

    public async upload(user?: { userId: number }, files?: FileArray): Promise<number> {
        try {
            if (user === undefined || user.userId === undefined) {
                return 403;
            }
            if (files === undefined || files.file === undefined) {
                return 400;
            }

            const file: UploadedFile = <UploadedFile>files.file;
            const name: string = file.name;
            const path: string = "public/static/upload/";
            const extension: string = name.split(".").at(-1)!;

            return this.fileRepo.addFile(name, path, user.userId).then((id: number) => {
                return file.mv(__basedir + path + id + "." + extension).then(() => {
                    return 200;
                });
            });
        } catch (err: any) {
            return 500;
        }
    }

    public async getListFiles() {
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

        return fileInfos;
    }
}
