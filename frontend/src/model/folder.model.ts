export interface Folder {
  id: number;
  name: string;
  date: Date;
  parentId: number | null;
}

export interface ChildFolder {
  id: number;
  name: string;
}
