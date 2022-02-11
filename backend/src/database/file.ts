import dbRepository, {AccessDatabaseError} from "./db";
import {file as File} from "@prisma/client";

export class FileRepository extends dbRepository {
    public async addFile(name: string, path: string, userId: number): Promise<any> {
        return this.db().file.create({
            data: {
                name: name,
                path: path,
                userId: userId
            }
        }).then((file: File) => {
            return file.id
        }).catch((err) => {
            throw new AccessDatabaseError(err);
        })
    }
}
