import express from 'express'
import { createNotes, deleteNotes, updateNotes, getAllNotes, getNoteById } from '../controllers/notesController.js'
import protect from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNotes);
router.put("/:id",updateNotes);
router.delete("/:id",deleteNotes);   

export default router;
