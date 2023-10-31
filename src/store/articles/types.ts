export type Article = {
  title: string,
  text: string,
  mainPicture: string,
  author: Author,
  date: Date,
  id: string,
  startText: string,
}

export type Author = {
  name: string,
  id: string,
}