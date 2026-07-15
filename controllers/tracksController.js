import { tracks, getNextTrackId } from '../data/tracks.js';

export function getAllTracks(req, res) {
  res.json(tracks);
}

export function getTrackById(req, res) {
  const track = tracks.find((t) => t.id === Number(req.params.id));

  if (!track) {
    return res.status(404).json({ message: 'Track not found' });
  }

  res.json(track);
}

export function createTrack(req, res) {
  const { title, albumId } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTrack = {
    id: getNextTrackId(),
    title,
    albumId,
  };

  tracks.push(newTrack);

  res.status(201).json(newTrack);
}

export function updateTrack(req, res) {
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
}

export function deleteTrack(req, res) {
  const index = tracks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Track not found' });
  }

  tracks.splice(index, 1);

  res.status(204).end();
}
