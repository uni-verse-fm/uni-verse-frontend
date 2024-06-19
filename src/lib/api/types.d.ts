export interface Author {
  username: string;
  _id: string;
}

export interface Release {
  _id: string;
  title: string;
  author: Author;
}
