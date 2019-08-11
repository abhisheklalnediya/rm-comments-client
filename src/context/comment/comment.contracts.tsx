export interface Comment {
  id?: string,
  comment: string,
  owner?: string,
  deleted?: boolean,
  edited?: boolean,
  parent?: string,
  time?: string,
}