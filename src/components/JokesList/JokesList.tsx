import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { JokeCard } from '../JokeCard/JokeCard';
import './JokeList.scss';

export const JokesList = () => {
  const { jokes } = useAppSelector(state => state.jokes);

  return (
    <div className="joke-list">
      {jokes.map(joke => (
        <JokeCard
          key={joke.setup}
          joke={joke}
        />
      ))}
    </div>
  );
};
