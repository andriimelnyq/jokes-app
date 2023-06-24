import React, { useState } from 'react';
import {
  Button, Card, IconButton, Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ReplayIcon from '@mui/icons-material/Replay';
import { JokeType } from '../../types/JokeType';
import './JokeCard.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as jokesActions from '../../features/jokes';
import { getRandomJoke } from '../../api';
import { ErrorText } from '../../types/ErrorText';
import { Loader } from '../Loader';

type Props = {
  joke: JokeType;
};

export const JokeCard: React.FC<Props> = ({ joke }) => {
  const {
    id, setup, punchline, type,
  } = joke;
  const [loadingNewJoke, setLoadingNewJoke] = useState(false);
  const dispatch = useAppDispatch();
  const { jokes } = useAppSelector(state => state.jokes);

  const handleClickAdd = () => dispatch(jokesActions.addNew());

  const handleClickDelete = () => dispatch(jokesActions.actions.delete(id));

  const handleClickRefresh = async () => {
    try {
      setLoadingNewJoke(true);
      const newJoke = await getRandomJoke();
      const isNewJokeUnique = !jokes.some(curJoke => curJoke.id === newJoke.id);

      if (isNewJokeUnique) {
        const refreshedJokeState = jokes.map(currentJoke => (
          currentJoke.id === id ? newJoke : currentJoke
        ));

        dispatch(jokesActions.actions.set(refreshedJokeState));
        localStorage.setItem('jokes', JSON.stringify(jokesActions.getLocaleJokes().map(currentJoke => (
          currentJoke.id === id ? newJoke : currentJoke
        ))));
      } else {
        await handleClickRefresh();
      }
    } catch (error) {
      dispatch(jokesActions.actions.setError(ErrorText.LOAD_RANDOM_JOKE));
    } finally {
      setLoadingNewJoke(false);
    }
  };

  return (
    <Card className="joke-card">
      {loadingNewJoke && (<Loader card />)}

      <div className="joke-card__content">
        <div className="joke-card__row">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Type:
            {' '}
            {type}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID
            {' '}
            #
            {joke.id}
          </Typography>
        </div>

        <div className="joke-card__main">
          <Typography variant="body2" color="text.secondary">
            Setup:
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            {setup}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Punchline:
          </Typography>

          <Typography variant="body2">
            {punchline}
          </Typography>
        </div>

        <div className="joke-card__row--transparent">
          <IconButton
            onClick={handleClickDelete}
          >
            <Close titleAccess="delete" />
          </IconButton>

          <Button
            variant="text"
            onClick={handleClickAdd}
          >
            Add
          </Button>

          <IconButton onClick={handleClickRefresh}>
            <ReplayIcon titleAccess="update" />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};
