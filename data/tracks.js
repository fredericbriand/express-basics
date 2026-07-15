export const tracks = [
  { id: 1, title: 'Track 1', albumId: 1 },
  { id: 2, title: 'Track 2', albumId: 1 },
];

let nextTrackId = Math.max(...tracks.map((t) => t.id), 0) + 1;

export function getNextTrackId() {
  return nextTrackId++;
}
