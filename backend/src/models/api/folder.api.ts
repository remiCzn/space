export interface FolderApi {
  name: string;
  updatedAt: Date;
  id: string;
  parentId: string;
  childrens: Array<string>;
}

export interface CreateFolderApi {
  name: string;
  parentId: string;
}
