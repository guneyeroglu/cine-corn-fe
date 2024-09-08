import { IMovie } from '../query';

export interface IMovieDetails extends IMovie {
  bannerImage: string;
  description: string;
  releaseDate: string;
  runTime: string;
  genres: string[];
  isFeatured: boolean;
  isNew: boolean;
  stars: string[];
}
