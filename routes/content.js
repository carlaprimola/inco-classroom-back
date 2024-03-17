import express from "express"
import { getContent, getContentById, createContent, deleteContent, updateContent } from "../controllers/ContentController.js";

const router = express.Router()
router.get('/',getContent);
router.get('/:id',getContentById);
router.post('/',createContent);
router.put('/:id',updateContent);
router.delete("/:id",deleteContent);


export default router;