import express from 'express';

const app = express();
const port = 3100;

app.use(express.json());

const tracks = [
    { 
        id: 1,
        title: 'Track 1',
        albumId: 1 
    },
    {
        id: 2,
        title: 'Track 2',
        albumId: 1
    }
];

const albums = [
    { 
        id: 1, 
        title: "Album 1" 
    },
    {
        id: 2,
        title: "Album 2"
    },
];

let nextTrackId = Math.max(...tracks.map((t) => t.id), 0) + 1;
let nextAlbumId = Math.max(...albums.map((a) => a.id), 0) + 1;

app.get('/', (req, res) => {
  res.send('Welcome to my Express API');
});

// GET /tracks — renvoie la liste complète des tracks
app.get('/tracks', (req, res) => {
  res.json(tracks);
});

// GET /tracks/:id — renvoie une track par son id, ou 404 si introuvable
app.get('/tracks/:id', (req, res) => {
  const track = tracks.find((t) => t.id === Number(req.params.id));

  if (!track) {
    return res.status(404).json({ message: 'Track not found' });
  }

  res.json(track);
});

// POST /tracks — crée une nouvelle track à partir du corps de la requête, renvoie 201 + la ressource créée
app.post('/tracks', (req, res) => {
  const { title, albumId } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTrack = {
    id: nextTrackId++,
    title,
    albumId,
  };

  tracks.push(newTrack);

  res.status(201).json(newTrack);
});

// PUT /tracks/:id — met à jour une track existante, renvoie 204 (pas de contenu)
app.put('/tracks/:id', (req, res) => {
  const track = tracks.find((t) => t.id === Number(req.params.id));

  if (!track) {
    return res.status(404).json({ message: 'Track not found' });
  }

  const { title, albumId } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  track.title = title;
  track.albumId = albumId;

  res.status(204).end();
});

// DELETE /tracks/:id — supprime une track, renvoie 204 (pas de contenu)
app.delete('/tracks/:id', (req, res) => {
  const index = tracks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Track not found' });
  }

  tracks.splice(index, 1);

  res.status(204).end();
});

// GET /albums — renvoie la liste complète des albums
app.get('/albums', (req, res) => {
  res.json(albums);
});

// GET /albums/:id — renvoie un album par son id, ou 404 si introuvable
app.get('/albums/:id', (req, res) => {
  const album = albums.find((a) => a.id === Number(req.params.id));

  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }

  res.json(album);
});

// POST /albums — crée un nouvel album à partir du corps de la requête, renvoie 201 + la ressource créée
app.post('/albums', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newAlbum = {
    id: nextAlbumId++,
    title,
  };

  albums.push(newAlbum);

  res.status(201).json(newAlbum);
});

// PUT /albums/:id — met à jour un album existant, renvoie 204 (pas de contenu)
app.put('/albums/:id', (req, res) => {
  const album = albums.find((a) => a.id === Number(req.params.id));

  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }

  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  album.title = title;

  res.status(204).end();
});

// DELETE /albums/:id — supprime un album, renvoie 204 (pas de contenu)
app.delete('/albums/:id', (req, res) => {
  const index = albums.findIndex((a) => a.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Album not found' });
  }

  albums.splice(index, 1);

  res.status(204).end();
});

// GET /albums/:id/tracks — renvoie les tracks appartenant à cet album
app.get('/albums/:id/tracks', (req, res) => {
  const album = albums.find((a) => a.id === Number(req.params.id));

  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }

  const albumTracks = tracks.filter((t) => t.albumId === album.id);

  res.json(albumTracks);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});