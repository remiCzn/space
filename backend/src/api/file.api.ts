import {FileBusinessController} from "../controllers/file";
import {ApiRequest, ApiResponse} from "../utils/expressUtils";

export class FileApi {
    private fileBusiness: FileBusinessController;

    public constructor() {
        this.fileBusiness = new FileBusinessController();
        this.getListFiles = this.getListFiles.bind(this);
        this.upload = this.upload.bind(this);
    }

    public async upload(req: ApiRequest<any>, res: ApiResponse<any>) {
        return res.sendStatus(await this.fileBusiness.upload(req.user, req.files));
    }

    public async getListFiles(req: ApiRequest<any>, res: ApiResponse<any>) {
        try {
            const files = this.fileBusiness.getListFiles();
            res.status(200).json(files);
        } catch (err) {
            res.sendStatus(500);
        }
    }
}