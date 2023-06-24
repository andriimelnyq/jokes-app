import React, { useEffect } from 'react';
import {
  Snackbar, Alert, Typography, Button,
} from '@mui/material';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { init, actions, loadMore } from './features/jokes';
import { Loader } from './components/Loader';
import { ErrorText } from './types/ErrorText';
import { JokesList } from './components/JokesList';

export const App: React.FC = () => {
  const { loading, error } = useAppSelector(state => state.jokes);
  const dispatch = useAppDispatch();
  const handleClickLoadMore = () => dispatch(loadMore());

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <>
      <div className="app">
        <Typography variant="h2" align="center" color="primary" sx={{ fontWeight: 'bold' }}>
          Jokes
        </Typography>

        <JokesList />

        {loading
          ? <Loader />
          : (
            <Button variant="contained" onClick={handleClickLoadMore}>
              Load more
            </Button>
          )}
      </div>

      <Snackbar
        open={error !== ErrorText.NONE}
        autoHideDuration={5000}
        onClose={() => dispatch(actions.setError(ErrorText.NONE))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
