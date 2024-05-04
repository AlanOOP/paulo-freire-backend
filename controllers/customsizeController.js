import Customsize from "../models/Customsize.js";
import cloudinary from "../utils/cloudinary.js";


//obtener customsize

export const getCustomsize = async (req, res) => {
    try {
        const customsize = await Customsize.findAll();
        res.json(customsize);
    } catch (error) {
        console.log(error);
    }
}


export const createCustomsize = async (req, res) => {
    let img = req.file;

    console.log(req.file)

    try {
        if (!img) {
            const error = new Error('Porfavor seleccione una imagen');
            return res.json(error.message);
        }

        const result = await cloudinary.uploader.upload(img.path, {
            folder: 'customsize',
            width: 1200,
            crop: "scale"
        });

        const customsize = await Customsize.create({
            slideImg: result.url,
            public_id: result.public_id
        });

        res.json(customsize);

    } catch (error) {
        console.log(error);
    }
}


//eliminar customsize

export const deleteCustomsize = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            const error = new Error('Campos requeridos');
            return res.status(400).json(error.message);
        }

        const customsize = await Customsize.findByPk(id);

        if (!customsize) {
            const error = new Error('Customsize no encontrado');
            return res.status(400).json(error.message);
        }

        await cloudinary.uploader.destroy(customsize.public_id);

        await customsize.destroy();

        res.json({ message: 'Customsize eliminado' });

    } catch (error) {
        console.log(error);
    }
}
