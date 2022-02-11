import {getFolderApiResponse} from "../models/folder.api";
import {ApiRequest, ApiResponse} from "../utils/expressUtils";
import {FolderRepository} from "../database/folder";
import {folder as Folder} from "@prisma/client";

export class FolderBusinessController {
    private folderRepo: FolderRepository;

    public constructor() {
        this.folderRepo = new FolderRepository();

        this.getHome = this.getHome.bind(this);
        this.displayFolder = this.displayFolder.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.deleteFolder = this.deleteFolder.bind(this);
    }

    public async getHome(
        req: ApiRequest<any>,
        res: ApiResponse<getFolderApiResponse>
    ) {
        const userId: number | undefined = req.user?.userId;
        if (userId == undefined) {
            return res.sendStatus(403);
        }
        const home: Folder = await this.folderRepo.getHomeFolder(userId);
        const childrens: Array<Folder> = await this.folderRepo.getChildrens(
            home.id
        );

        return res.status(200).json({
            id: home.id,
            name: home.title,
            childrens: childrens.map((child: Folder) => {
                return {
                    id: child.id,
                    name: child.title,
                };
            }),
            parentId: null,
        });
    }

    public async displayFolder(
        req: ApiRequest<any>,
        res: ApiResponse<getFolderApiResponse>
    ) {
        try {
            const folderId: number = parseInt(req.params.id);
            const folder: Folder = await this.folderRepo.getFolderById(folderId);
            const childrens: Array<Folder> = await this.folderRepo.getChildrens(
                folder.id
            );
            const path: string = await this.folderRepo.getPath(folderId);

            res.status(200).json({
                id: folder.id,
                name: path,
                childrens: childrens.map((child: Folder) => {
                    return {
                        id: child.id,
                        name: child.title,
                    };
                }),
                parentId: folder.parentId,
            });
        } catch (error) {
            res.sendStatus(500);
        }
    }

    public async createFolder(
        req: ApiRequest<any>,
        res: ApiResponse<getFolderApiResponse>
    ) {
        const name: string = req.body.name;
        const parentId: number = req.body.parentId;
        const userId: number | undefined = req.user?.userId;
        if (userId == undefined || name == undefined || parentId == undefined) {
            return res.sendStatus(403);
        }
        this.folderRepo.createFolder(userId, name, parentId).then(() => {
            this.folderRepo.getFolderById(parentId).then((currentFolder: Folder) => {
                res.status(200).json({
                    id: currentFolder.id,
                    name: currentFolder.title,
                    childrens: [],
                    parentId: currentFolder.parentId,
                });
            });
        });
    }

    public async deleteFolder(req: ApiRequest<any>, res: ApiResponse<any>) {
        const folderId = parseInt(req.params.id);
        try {
            const folder: Folder = await this.folderRepo.getFolderById(folderId);
            if (folder.userId != req.user?.userId) {
                return res.sendStatus(403);
            }
            await this.folderRepo.delete(folderId);
            return res.status(200).json({id: folder.parentId});
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}
