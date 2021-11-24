import { FolderApi } from "../models/api/folder.api";
import Folder from "../models/database/folder.model";
import { ApiRequest, ApiResponse } from "../utils/expressUtils";

export default {
  getHome: async (req: ApiRequest<any>, res: ApiResponse<any>) => {
    const userId: string | undefined = req.user?.userId;
    if (userId == undefined) {
      return res.sendStatus(403);
    }
    await Folder.findOne({ user: userId, isHome: true })
      .then((resHome) => {
        if (resHome == null) {
          //Create home folder
          const home = new Folder({
            title: "Home",
            isHome: true,
            user: userId,
          });
          //Send home folder to the front
          return home.save().then((newHome: any) => {
            const folder: FolderApi = {
              name: newHome.title,
              childrens: newHome.childrens,
              id: newHome._id,
              updatedAt: newHome.updatedAt,
              parentId: newHome.parentId,
            };
            return res.status(200).json(folder);
          });
        }
        //Retrieve home folder and send to the front
        console.log(resHome);
        const folder: FolderApi = {
          name: resHome.title,
          childrens: resHome.childrens,
          id: resHome._id,
          updatedAt: resHome.updatedAt,
          parentId: resHome.parentId,
        };
        return res.status(200).json(folder);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  displayFolder: (req: ApiRequest<any>, res: ApiResponse<any>) => {
    const folderId: string = req.params.id;
    Folder.findById(folderId)
      .then((folder: any) => {
        res.status(200).json(<FolderApi>{
          name: folder.title,
          updatedAt: folder.updatedAt,
          id: folder._id,
          childrens: folder.childrens,
          parentId: folder.parentId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createFolder: async (req: ApiRequest<any>, res: ApiResponse<FolderApi>) => {
    const name: string = req.body.name;
    const parentId: string = req.body.parentId;
    const folder = new Folder({
      title: name,
      parentId: parentId,
      user: req.user?.userId,
    });
    await folder.save().then((newFolder: any) => {
      console.log(newFolder);
      Folder.updateOne(
        { _id: parentId },
        {
          $push: { childrens: newFolder._id },
        }
      )
        .then((pushCheck) => {
          console.log(pushCheck);
          return res.status(200).json({
            id: newFolder._id,
            name: name,
            updatedAt: newFolder.updatedAt,
            childrens: [],
            parentId: newFolder.parentId,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
