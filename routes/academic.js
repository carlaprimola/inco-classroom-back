import express from 'express';
import {
  getAllAcademicData,
  getAcademicDataById,
  createAcademicData,
  updateAcademicData,
  deleteAcademicData
} from '../controllers/AcademicController.js';

const router = express.Router();

// Obtener todos los registros de seguimiento académico
router.get('/', getAllAcademicData);

// Obtener un registro de seguimiento académico por su ID
router.get('/:id', getAcademicDataById );

// Crear un nuevo registro de seguimiento académico
router.post('/', createAcademicData);

// Actualizar un registro de seguimiento académico por su ID
router.put('/:id', updateAcademicData);

// Eliminar un registro de seguimiento académico por su ID
router.delete('/:id', deleteAcademicData);

export default router;
