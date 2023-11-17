const BASE_URL = "https://rickandmortyapi.com/api";

const request = async (url?: string) => {
  const res = await fetch(BASE_URL + url);

  return res.json();
};

export const getCharacters = (
  page: number | string = 1,
  status = '', 
  species =  '',
  name = '',
) => {
  let link = `/character/?page=${page}`;

  if(status && status !== 'all') {
    link += `&status=${status}`;
  }

  if(species && species !== 'all') {
    link += `&species=${species}`;
  }

  if(name) {
    link += `&name=${name}`;
  }

  return request(link);
}
export const getMultipleCharacters = (charactersId: string) =>
  request(`/character/${charactersId}`);

export const getCurrentEpisode = (episode: string) => request(episode);
  
export const getLocations = () => request("/location");
export const getEpisodes = () => request("/episode");