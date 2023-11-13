export type Article = {
  title: string,
  mainText: string,
  mainPicture: string,
  author: Author,
  date: Date,
  id: string,
  uuid: string,
  startText: string,
  isHidden: boolean,
}

export type Author = {
  name: string,
  id: string,
}