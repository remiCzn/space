import folderModel from "../models/database/folder.model";

async function deleteFolder(id: string) {
  const parent = await folderModel.find({ childrens: { $in: [id] } });
  // Delete folder in parent
  await folderModel.findByIdAndUpdate(parent[0]._id, {
    $pull: { childrens: id },
  });
  // Delete childrens
  await folderModel.findById(id).then(async (res) => {
    console.log(res);
    for (let child of res.childrens) {
      await deleteFolder(child);
    }
  });
  // Delete Folder
  return folderModel.findByIdAndDelete(id).then((res) => {
    return res;
  });
}

export default {
  deleteFolder,
};
