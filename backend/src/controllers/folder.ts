import { FolderApi } from "../models/api/folder.api";
import folder, { FOLDER } from "../models/database/folder";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";

export default {
  getHome: async (req: ApiRequest<any>, res: ApiResponse<any>) => {
    const userId: number | undefined = req.user?.userId;
    if (userId == undefined) {
      return res.sendStatus(403);
    }
    await folder.getHomeFolder(userId)
      .then((folder: FOLDER) => {
        res.status(200).json(folder);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  displayFolder: (req: ApiRequest<any>, res: ApiResponse<any>) => {
    const folderId: number = parseInt(req.params.id);
    folder.getFolderById(folderId).then((folder: FOLDER) => {
      res.status(200).json(<FolderApi>{
        name: folder.title,
        updatedAt: Date.now(),
        id: folder.id,
        childrens: [],
        parentId: folder.parent,
      })
    })
  },
  createFolder: async (req: ApiRequest<any>, res: ApiResponse<FolderApi>) => {
    const name: string = req.body.name;
    const parentId: number = req.body.parentId;
    const userId: number | undefined = req.user?.userId;
    if (userId == undefined || name == undefined || parentId == undefined) {
      return res.sendStatus(403);
    }
    folder.createFolder(userId, name, parentId);
  },
  deleteFolder: async (req: ApiRequest<any>, res: ApiResponse<any>) => {
    const folderId = parseInt(req.params.id);
    await folder.delete(folderId).then(() => {
      res.sendStatus(200);
    }).catch(() => {
      res.sendStatus(500);
    });
    ;
  },
};
