export interface User {
  username: string;
  _id: string;
}

export interface Track {
  id: string;
  title: string;
}

export interface Release {
  _id: string;
  title: string;
  author: User;
  coverName: string;
  tracks: Track[];
}

export interface Comment {
  content: string;
  owner: User;
  isPositive: boolean;

}
