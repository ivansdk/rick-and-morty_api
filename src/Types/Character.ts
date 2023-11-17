export type Location = {
  name: string,
  url: string,
}

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: Location;
  episode: string[];
}