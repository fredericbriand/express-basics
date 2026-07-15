export const albums = [
  { id: 1, title: 'Album 1' },
  { id: 2, title: 'Album 2' },
];

let nextAlbumId = Math.max(...albums.map((a) => a.id), 0) + 1;

export function getNextAlbumId() {
  return nextAlbumId++;
}
