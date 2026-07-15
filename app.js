import express from 'express';
import tracksRouter from './routes/tracks.js';
import albumsRouter from './routes/albums.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my Express API');
});

app.use('/tracks', tracksRouter);
app.use('/albums', albumsRouter);

export default app;
