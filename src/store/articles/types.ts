export type Article = {
  title: string,
  text: string,
  photo: string,
  author: Author,
  date: Date,
  id: string,
  uuid: string,
  createdBy: string,
  startText: string,
  isHidden: boolean,
}

export type Author = {
  name: string,
  id: string,
}