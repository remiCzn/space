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

export interface getFolderApiResponse {
  id: number;
  name: string;
  childrens: {
    id: number;
    name: string;
  }[];
  parentId: number | null;
}
