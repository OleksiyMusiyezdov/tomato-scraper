export interface IFilm {
  title: string;
  year?: number;
  url?: string;
}

export interface IResponse {
  count: number;
  // list?: Array<IFilm>;
  list?: Array<string>;
}

export interface IParams {
  firstFirstName: string;
  firstSecondName: string;
  secondFirstName: string;
  secondSecondName: string;
}
