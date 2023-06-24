const BASE_URL = 'https://official-joke-api.appspot.com';

export const getTenJokes = () => {
  return fetch(`${BASE_URL}/jokes/ten`).then(res => res.json());
};

export const getRandomJoke = () => {
  return fetch(`${BASE_URL}/jokes/random`).then(res => res.json());
};
