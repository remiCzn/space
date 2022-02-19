import {folder as Folder} from "@prisma/client"
import dbRepository, {AccessDatabaseError} from "./db";

export class FolderRepository extends dbRepository {
    public async getFolderById(id: number): Promise<Folder> {
        return this.db().folder.findUnique({
            where: {
                id: id
            }
        }).then((folder) => {
            if (folder === null) {
                throw new Error("This user doesn't exists");
            }
            return folder;
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
    }

    public async getFolderByUser(userId: number): Promise<Array<Folder>> {
        return this.db().folder.findMany({
            where: {
                userId: userId,
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
    }

    public async getHomeFolder(userid: number): Promise<Folder> {
        return this.db().folder.findFirst({
            where: {
                parent: null,
                userId: userid
            }
        }).then((folder: Folder | null) => {
            if (folder === null) {
                return this.createFolder(userid, "Home", null)
            } else {
                return folder;
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
    }

    public async delete(id: number): Promise<void> {
        await this.db().folder.delete({
            where: {
                id: id
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });
    }

    public async createFolder(user: number, title: string, parent: number | null): Promise<Folder> {
        return this.db().folder.create({
            data: {
                userId: user,
                title: title,
                parentId: parent
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        });

    }

    public async getChildrens(currentFolderId: number): Promise<Array<Folder>> {
        return this.db().folder.findMany({
            where: {
                parentId: currentFolderId
            }
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        })
    }

    public async getPath(folderID: number): Promise<string> {
        const folder: Folder = await this.getFolderById(folderID);

        if (folder.parentId == null) {
            return folder.title;
        } else {
            const parentName: string = await this.getPath(folder.parentId);
            return parentName + "/" + folder.title;
        }
    }
}
