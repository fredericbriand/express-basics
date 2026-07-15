import { Router } from 'express';
import {
  getAllTracks,
  getTrackById,
  createTrack,
  updateTrack,
  deleteTrack,
} from '../controllers/tracksController.js';

const router = Router();

router.get('/', getAllTracks);
router.get('/:id', getTrackById);
router.post('/', createTrack);
router.put('/:id', updateTrack);
router.delete('/:id', deleteTrack);

export default router;
