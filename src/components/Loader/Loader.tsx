import { CircularProgress } from '@mui/material';
import React from 'react';
import './Loader.scss';

type Props = {
  card?: boolean,
};

export const Loader: React.FC<Props> = ({ card }) => (
  <div
    className={card ? 'loader loader--card' : 'loader'}
  >
    <CircularProgress
      sx={{
        margin: 'auto',
      }}
    />
  </div>
);
