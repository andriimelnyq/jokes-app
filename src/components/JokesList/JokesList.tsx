import React from 'react';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { JokeCard } from '../JokeCard/JokeCard';
import './JokeList.scss';

export const JokesList = () => {
  const { jokes } = useAppSelector(state => state.jokes);

  return (
    jokes.length > 0
      ? (
        <div className="joke-list">
          {jokes.map(joke => (
            <JokeCard
              key={joke.setup}
              joke={joke}
            />
          ))}
        </div>
      )
      : (
        <Typography variant="h4">
          No jokes yet
        </Typography>
      )

  );
};
