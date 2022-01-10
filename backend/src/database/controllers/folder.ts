import { FOLDER } from "../models/folder.db";
import { USER } from "../models/user.db";
import dbRepository from "./db";
import pool from "./db";

export class FolderRepository extends dbRepository {
  public async getFolderById(id: number) {
    return this.query("SELECT * FROM SPACE.FOLDER WHERE ID = ?", [id]).then(
      (result: Array<FOLDER>) => {
        return result[0];
      }
    );
  }

  public async getFolderByUser(userId: number) {
    const folderList = await this.query("SELECT * FROM FOLDER WHERE USER = ?", [
      userId,
    ]).then((result): Array<FOLDER> => {
      return result.slice(0, result.length);
    });
    return folderList;
  }

  public async getHomeFolder(userid: number): Promise<FOLDER> {
    const home: FOLDER = await this.query(
      "SELECT * FROM FOLDER WHERE parent IS NULL AND user = ?",
      [userid]
    ).then((res: FOLDER[]) => {
      if (res.length >= 1) {
        return res[0];
      } else {
        return this.query("INSERT INTO FOLDER(title, user) VALUES (?,?)", [
          "Home",
          userid,
        ]).then(() => {
          return this.query("SELECT * FROM FOLDER WHERE PARENT = NULL").then(
            async (folder: FOLDER[]) => {
              return folder[0];
            }
          );
        });
      }
    });
    return home;
  }

  public async delete(id: number) {
    await this.query("DELETE FROM FOLDER WHERE ID = ?", [id]);
  }

  public async createFolder(user: number, title: string, parent: number) {
    return this.query(
      "INSERT INTO FOLDER(user, title, parent) VALUES (?,?,?)",
      [user, title, parent]
    );
  }

  public async getChildrens(currentFolderId: number): Promise<FOLDER[]> {
    return this.query("SELECT * FROM FOLDER WHERE parent = ?", [
      currentFolderId,
    ]);
  }

  public async getPath(folderID: number): Promise<string> {
    return this.query(
      "WITH RECURSIVE path AS (" +
        " SELECT title, parent FROM FOLDER WHERE id = ? " +
        "UNION ALL " +
        "SELECT FOLDER.title, FOLDER.parent FROM FOLDER, path WHERE FOLDER.id = path.parent" +
        ") SELECT * FROM path",
      [folderID]
    ).then((res: Array<{ title: string; parent: number }>) => {
      return res
        .map((elt) => elt.title)
        .reverse()
        .join("/");
    });
  }
}
