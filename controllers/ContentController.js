import ContentModel from "../models/ContentModel.js";

//metodo para obtener todos los temarios
export const getContent = async (req, res) => {
    try {
        const contentCourses = await ContentModel.findAll();
        res.status(200).json(contentCourses);
        console.log(contentCourses);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener el contenido de los cursos", error });
    }
}

//metodo para obtener un temario

export const getContentById = async (req, res) => {
    const { id } = req.params;
    try {
        const contentCourse = await ContentModel.findByPk(id);
        if (!contentCourse) {
            return res.status(404).json({ message: "Temario no encontrado" });
        }
        res.status(200).json(contentCourse);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el contenido del curso", error });
    }
}

//metodo para crear un temario
export const createContent = async (req, res) => {
    const { TituloMaterial, TipoRecurso, Contenido } = req.body;
    try {
        const newContent = await ContentModel.create({
            TituloMaterial,
            TipoRecurso,
            Contenido,
            
        });
        res.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el contenido del curso", error });
    }
}

//metodo para editar un temario
export const updateContent = async (req, res) => {
    const { id } = req.params;
    const { TituloMaterial, TipoRecurso, Contenido } = req.body;
    try {
        const contentExistente = await ContentModel.findByPk(id);
        if (!contentExistente) {
            return res.status(404).json({ message: "Temario no encontrado" });
        }
        await contentExistente.update({
            TituloMaterial,
            TipoRecurso,
            Contenido            
        });
        res.status(200).json({ message: "Contenido actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al editar el contenido", error });
    }
}

//metodo para eliminar un temario

export const deleteContent = async (req,res)=>{
    const id = req.params.id
    console.log(id);
    try {
        await ContentModel.deleteOne({id:id},req.body);
        res.status(200).json({message:"se ha eliminado",id});
    }  catch (error) {
        res.status(500).json({message:"no se eliminó correctamente", error})
        
    }
}


