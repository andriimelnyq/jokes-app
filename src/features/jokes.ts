import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { JokeType } from '../types/JokeType';
import { ErrorText } from '../types/ErrorText';
import { getRandomJoke, getTenJokes } from '../api';

type jokesStateType = {
  jokes: JokeType[],
  loading: boolean,
  error: ErrorText,
};

const initialState: jokesStateType = {
  jokes: [],
  loading: false,
  error: ErrorText.NONE,
};

export const getLocaleJokes = () => {
  const jokesJSON = localStorage.getItem('jokes');
  const localeJokes: JokeType[] = (jokesJSON ? JSON.parse(jokesJSON) : []);

  return (localeJokes);
};

export const init = createAsyncThunk('jokes/fetch', async (_, { dispatch }) => {
  const localeJokes = getLocaleJokes();
  const loadedJokes = await getTenJokes();

  const localeJokesIds = localeJokes.map((joke: JokeType) => joke.id);
  const loadedJokesIds = loadedJokes.map((joke: JokeType) => joke.id);

  const areNewJokesUnique = loadedJokesIds
    .every((jokeId: number) => !localeJokesIds.includes(jokeId));

  if (!areNewJokesUnique) {
    await dispatch(init());

    return [];
  }

  return [...localeJokes, ...loadedJokes].slice(0, 10);
});

export const loadMore = createAsyncThunk('jokesMore/fetch', async (_, { getState, dispatch }) => {
  const { jokes } = getState() as { jokes: jokesStateType };
  const loadedJokes = await getTenJokes();

  const jokesIds = jokes.jokes.map((joke: JokeType) => joke.id);
  const loadedJokesIds = loadedJokes.map((joke: JokeType) => joke.id);

  const areNewJokesUnique = loadedJokesIds.every((jokeId: number) => !jokesIds.includes(jokeId));

  if (!areNewJokesUnique) {
    await dispatch(loadMore());

    return [];
  }

  return loadedJokes;
});

export const addNew = createAsyncThunk('joke/fetch', async (_, { getState, dispatch }) => {
  const { jokes } = getState() as { jokes: jokesStateType };
  const newJoke = await getRandomJoke();

  const isNewJokeUnique = jokes.jokes.every(joke => joke.id !== newJoke.id);

  if (!isNewJokeUnique) {
    await dispatch(addNew());

    return [];
  }

  return [newJoke];
});

const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<JokeType[]>) => {
      return { ...state, jokes: action.payload };
    },
    setError: (state, action: PayloadAction<ErrorText>) => {
      return { ...state, error: action.payload };
    },
    delete: (state, action: PayloadAction<number>) => {
      const jokes = getLocaleJokes();

      localStorage.setItem('jokes', JSON.stringify(
        jokes.filter(joke => joke.id !== action.payload),
      ));

      return {
        ...state,
        jokes: state.jokes.filter(joke => joke.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return ({ ...state, loading: true });
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return ({ ...state, jokes: action.payload, loading: false });
    });

    builder.addCase(init.rejected, (state) => {
      return ({ ...state, error: ErrorText.LOAD_JOKES, loading: false });
    });

    builder.addCase(loadMore.pending, (state) => {
      return ({ ...state, loading: true });
    });

    builder.addCase(loadMore.fulfilled, (state, action) => {
      return ({
        ...state,
        loading: false,
        jokes: [...state.jokes, ...action.payload],
      });
    });

    builder.addCase(loadMore.rejected, (state) => {
      return ({ ...state, error: ErrorText.LOAD_JOKES, loading: false });
    });

    builder.addCase(addNew.pending, (state) => {
      return ({ ...state, loading: true });
    });

    builder.addCase(addNew.fulfilled, (state, action) => {
      const jokes = getLocaleJokes();

      localStorage.setItem('jokes', JSON.stringify([...jokes, ...action.payload]));

      return ({
        ...state,
        loading: false,
        jokes: [...state.jokes, ...action.payload],
      });
    });

    builder.addCase(addNew.rejected, (state) => {
      return ({ ...state, error: ErrorText.LOAD_RANDOM_JOKE, loading: false });
    });
  },
});

export default jokesSlice;
export const { actions } = jokesSlice;
