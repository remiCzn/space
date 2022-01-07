export interface FolderApi {
  name: string;
  id: number;
  parentId: number;
  childrens: Array<string>;
}

export interface CreateFolderApi {
  name: string;
  parentId: number;
}
