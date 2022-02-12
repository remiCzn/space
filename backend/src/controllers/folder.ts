import {getFolderApiResponse} from "../models/folder.api";
import {FolderRepository} from "../database/folder";
import {folder as Folder} from "@prisma/client";
import {HTTP_RESULT} from "../utils/results";

export class FolderBusinessController {
    private folderRepo: FolderRepository;

    public constructor() {
        this.folderRepo = new FolderRepository();

        this.getHome = this.getHome.bind(this);
        this.displayFolder = this.displayFolder.bind(this);
        this.createFolder = this.createFolder.bind(this);
        this.deleteFolder = this.deleteFolder.bind(this);
    }

    public async getHome(userId: number): Promise<getFolderApiResponse> {
        const home: Folder = await this.folderRepo.getHomeFolder(userId);
        const childrens: Array<Folder> = await this.folderRepo.getChildrens(
            home.id
        );

        return {
            id: home.id,
            name: home.title,
            childrens: childrens.map((child: Folder) => {
                return {
                    id: child.id,
                    name: child.title,
                };
            }),
            parentId: null,
        };
    }

    public async displayFolder(folderId: number): Promise<getFolderApiResponse | undefined> {
        try {
            const folder: Folder = await this.folderRepo.getFolderById(folderId);
            const childrens: Array<Folder> = await this.folderRepo.getChildrens(
                folder.id
            );
            const path: string = await this.folderRepo.getPath(folderId);

            return {
                id: folder.id,
                name: path,
                childrens: childrens.map((child: Folder) => {
                    return {
                        id: child.id,
                        name: child.title,
                    };
                }),
                parentId: folder.parentId,
            };
        } catch (error) {
            return undefined;
        }
    }

    public async createFolder(name: string, parentId: number, userId: number) {
        await this.folderRepo.createFolder(userId, name, parentId);
        return this.folderRepo.getFolderById(parentId).then((currentFolder: Folder) => {
            return {
                id: currentFolder.id,
                name: currentFolder.title,
                childrens: [],
                parentId: currentFolder.parentId,
            };
        });

    }

    public async deleteFolder(folderId: number, userId: number): Promise<{ status: number, folder?: { id: number | null } }> {
        try {
            const folder: Folder = await this.folderRepo.getFolderById(folderId);
            if (folder.userId != userId) {
                return {status: HTTP_RESULT.FORBIDDEN}
            }
            await this.folderRepo.delete(folderId);
            return {status: HTTP_RESULT.SUCCESS, folder: {id: folder.parentId}};
        } catch (error) {
            return {status: HTTP_RESULT.INTERNAL_SERVER_ERROR}
        }
    }
}
