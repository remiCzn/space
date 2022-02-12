import {FolderBusinessController} from "../controllers/folder";
import {ApiRequest, ApiResponse} from "../utils/expressUtils";
import {getFolderApiResponse} from "../models/folder.api";
import {AuthBusinessController} from "../controllers/auth";
import {HTTP_RESULT} from "../utils/results";

export class FolderApi {
    private folderBusiness: FolderBusinessController;
    private authBusiness: AuthBusinessController;

    public constructor() {
        this.folderBusiness = new FolderBusinessController();
        this.authBusiness = new AuthBusinessController();

        this.getHome = this.getHome.bind(this);
        this.displayFolder = this.displayFolder.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.deleteFolder = this.deleteFolder.bind(this);
    }

    public async getHome(
        req: ApiRequest<any>,
        res: ApiResponse<getFolderApiResponse>
    ) {
        if (!req.user || !req.user.userId) {
            return res.sendStatus(HTTP_RESULT.UNAUTHORIZED);
        }
        try {
            const home: getFolderApiResponse = await this.folderBusiness.getHome(req.user?.userId);
            if (home === undefined) {
                return res.sendStatus(HTTP_RESULT.NOT_FOUND);
            } else {
                return res.status(HTTP_RESULT.SUCCESS).json(home);
            }
        } catch (e) {
            return res.sendStatus(HTTP_RESULT.INTERNAL_SERVER_ERROR)
        }

    }

    public async displayFolder(
        req: ApiRequest<any>,
        res: ApiResponse<getFolderApiResponse>
    ) {
        const folderId: number = parseInt(req.params.id);
        const home: getFolderApiResponse | undefined = await this.folderBusiness.displayFolder(folderId);
        if (!home) {
            return res.sendStatus(HTTP_RESULT.NOT_FOUND);
        } else {
            return res.status(HTTP_RESULT.SUCCESS).json(home);
        }
    }

    public async createFolder(
        req: ApiRequest<any>,
        res: ApiResponse<getFolderApiResponse>
    ) {
        //Check params
        if (!req.user || !req.user.userId) {
            return res.sendStatus(HTTP_RESULT.UNAUTHORIZED)
        } else if (!req.body.name || !req.body.parentId) {
            return res.sendStatus(HTTP_RESULT.BAD_REQUEST);
        }

        try {
            //Create folder
            const folder = await this.folderBusiness.createFolder(req.body.name, req.body.parentId, req.user.userId);
            return res.status(HTTP_RESULT.SUCCESS).json(folder);
        } catch (e) {
            console.error(e);
            return res.sendStatus(HTTP_RESULT.INTERNAL_SERVER_ERROR);
        }
    }

    public async deleteFolder(req: ApiRequest<any>, res: ApiResponse<any>) {
        const folderId: number = parseInt(req.params.id);
        if (!req.user || !req.user.userId) {
            return res.sendStatus(HTTP_RESULT.UNAUTHORIZED);
        }
        const {status, folder} = await this.folderBusiness.deleteFolder(folderId, req.user.userId);
        return res.status(status).json(folder);
    }
}