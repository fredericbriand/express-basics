import { Router } from 'express';
import {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumTracks,
} from '../controllers/albumsController.js';

const router = Router();

router.get('/', getAllAlbums);
router.get('/:id', getAlbumById);
router.post('/', createAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);
router.get('/:id/tracks', getAlbumTracks);

export default router;
