import cloudinary from "../utils/cloudinary.js";
import {AcademyActivities, ImageActivities} from "../models/index.js";

export const getImagesActivities = async (req, res) => {
    try {
        const imagesActivities = await ImageActivities.findAll();
        res.json(imagesActivities);
    } catch (error) {
        console.log(error);
    }
}

//crear image activity a cloudinary el nombre de la imagen a la bd 
 
export const createImageActivity = async (req, res) => {
    try {
        const { description, academyActivityId } = req.body;
    
        let image  = req.file;

        if (!description || !academyActivityId || !image) {
            const error = new Error('Faltan campos obligatorios');
            return res.status(400).json(error.message);
        }

        const academyActivity = await AcademyActivities.findByPk(academyActivityId);

        if (!academyActivity) {
            const error = new Error('Actividad no encontrada');
            return res.status(400).json(error.message);
        }
    
        //crear path 

        const result = await cloudinary.uploader.upload(image.path,{
            folder: 'activities',
            width: 1200,
            crop: "scale"
        });

        console.log(result);

        const imageActivity = await ImageActivities.create(
            {
                description,
                url: result.url,
                public_id: result.public_id,
                academyActivityId: academyActivityId
            }
        );
        res.json(imageActivity);
    } catch (error) {
        console.log(error);
    }
}     


export const getImageActivity = async (req, res) => {
    const { id } = req.params;

    try {

        if (!id) {
            const error = new Error('Campos requeridos');
            return res.status(400).json(error.message);
        }

        const imageActivity = await ImageActivities.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!imageActivity) {
            const error = new Error('Actividad no encontrada');
            return res.status(404).json(error.message);
        }

        res.json(imageActivity);
    } catch (error) {
        console.log(error);
    }
}

//actualizar imagen en cloudinary y en la bd

export const updateImageActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, academyActivityId } = req.body;
        let image  = req.file;

        if (!id || !description || !academyActivityId || !image) {
            const error = new Error('Faltan campos obligatorios');
            return res.status(400).json(error.message);
        }

        const academyActivity = await AcademyActivities.findByPk(academyActivityId);

        if (!academyActivity) {
            const error = new Error('Actividad no encontrada');
            return res.status(400).json(error.message);
        }

        const imageActivity = await ImageActivities.findByPk(id);

        if (!imageActivity) {
            const error = new Error('Actividad no encontrada');
            return res.status(400).json(error.message);
        }

        //borrar imagen de cloudinary
        await cloudinary.uploader.destroy(imageActivity.public_id);

        //crear path 
        const result = await cloudinary.uploader.upload(image.path,{
            folder: 'activities',
            width: 1200,
            crop: "scale"
        });

        console.log(result);

        const newImageActivity = await ImageActivities.update(
            {
                description,
                url: result.url,
                public_id: result.public_id,
                academyActivityId: academyActivityId
            },
            {
                where: {
                    id: id
                }
            }
        );

        res.json(newImageActivity);
    }
    catch (error) {
        console.log(error);
    }
}

//borrar imagen de cloudinary y de la bd

export const deleteImageActivity = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            const error = new Error('Campos requeridos');
            return res.status(400).json(error.message);
        }

        const imageActivity = await ImageActivities.findByPk(id);

        if (!imageActivity) {
            const error = new Error('Actividad no encontrada');
            return res.status(404).json(error.message);
        }

        //borrar imagen de cloudinary
        await cloudinary.uploader.destroy(imageActivity.public_id);

        const deletedImageActivity = await ImageActivities.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.json(deletedImageActivity);
    } catch (error) {
        console.log(error);
    }
}

export const getImagesByAcademyActivity = async (req, res) => {
    const { academyActivityId } = req.params;
    try {
        if (!academyActivityId) {
            const error = new Error('Campos requeridos');
            return res.status(400).json(error.message);
        }

        const imagesActivities = await ImageActivities.findAll({
            where: {
                academyActivityId: academyActivityId
            }
        });

        res.json(imagesActivities);

    } catch (error) {
        console.log(error);
    }

}