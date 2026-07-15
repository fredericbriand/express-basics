import { albums, getNextAlbumId } from '../data/albums.js';
import { tracks } from '../data/tracks.js';

export function getAllAlbums(req, res) {
  res.json(albums);
}

export function getAlbumById(req, res) {
  const album = albums.find((a) => a.id === Number(req.params.id));

  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }

  res.json(album);
}

export function createAlbum(req, res) {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newAlbum = {
    id: getNextAlbumId(),
    title,
  };

  albums.push(newAlbum);

  res.status(201).json(newAlbum);
}

export function updateAlbum(req, res) {
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
}

export function deleteAlbum(req, res) {
  const index = albums.findIndex((a) => a.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Album not found' });
  }

  albums.splice(index, 1);

  res.status(204).end();
}

export function getAlbumTracks(req, res) {
  const album = albums.find((a) => a.id === Number(req.params.id));

  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }

  const albumTracks = tracks.filter((t) => t.albumId === album.id);

  res.json(albumTracks);
}
