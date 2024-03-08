import CursosModel from "../models/CursosModel.js";

//metodo para obtener todos los cursos
export const getCursos = async (req, res) => {
    try {
        const cursos = await CursosModel.findAll();
        res.status(200).json(cursos);
        console.log(cursos);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener los cursos", error });
    }
}

//metodo para obtener un curso

export const getCursoById = async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await CursosModel.findByPk(id);
        if (!curso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        res.status(200).json(curso);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el curso", error });
    }
}

//metodo para crear un curso
export const createCurso = async (req, res) => {
    const { NombreCurso, Descripcion, DocenteACargo, imageUrl } = req.body;
    try {
        const nuevoCurso = await CursosModel.create({
            NombreCurso,
            Descripcion,
            DocenteACargo,
            imageUrl
        });
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el curso", error });
    }
}

//metodo para editar un curso
export const updateCurso = async (req, res) => {
    const { id } = req.params;
    const { NombreCurso, Descripcion, DocenteACargo, imageUrl } = req.body;
    try {
        const cursoExistente = await CursosModel.findByPk(id);
        if (!cursoExistente) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        await cursoExistente.update({
            NombreCurso,
            Descripcion,
            DocenteACargo,
            imageUrl
        });
        res.status(200).json({ message: "Curso actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al editar el curso", error });
    }
}

//metodo para eliminar un curso

export const deleteCursos = async (req,res)=>{
    const id = req.params.id
    console.log(id);
    try {
        await CursosModel.deleteOne({_id:id},req.body);
        res.status(200).json({message:"se ha eliminado",id});
    }  catch (error) {
        res.status(500).json({message:"no se eliminó correctamente", error})
        
    }
}


