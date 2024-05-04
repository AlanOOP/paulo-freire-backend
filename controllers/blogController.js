import Blog from "../models/Blog.js";
import cloudinary from "../utils/cloudinary.js";

//obtener blog
export const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findAll();
        res.json(blog);
    } catch (error) {
        console.log(error);
    }
}

//obtener blog por id
export const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findByPk(id);
        if(!blog){
            const error = new Error('Blog no encontrado');
            return res.json(error.message);
        }
        res.json(blog);

    } catch (error) {
        console.log(error);
    }
}

//crear un blog
export const createBlog = async (req, res) => {

    const { title, description, date} = req.body;
    let img = req.file;

    try {
        if (!title || !description || !date || !img) {
            const error = new Error('Porfavor llene todos los campos');
            return res.json(error.message);
        }

        const result = await cloudinary.uploader.upload(img.path, {
            folder: 'blog',
            width: 1200,
            crop: "scale"
        });

        const blog = await Blog.create({
            title,
            description,
            img: result.url,
            public_id: result.public_id,
            date
        });

        res.json(blog);

    } catch (error) {
        console.log(error);
    }

}

//actualizar blog

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description, date } = req.body;
    let img = req.file;

    try {
        if (!title || !description || !date) {
            const error = new Error('Porfavor llene todos los campos');
            return res.json(error.message);
        }

        const blog = await Blog.findByPk(id);

        if (!blog) {
            const error = new Error('Blog no encontrado');
            return res.json(error.message);
        }

        if (img) {
            await cloudinary.uploader.destroy(blog.public_id);
            const result = await cloudinary.uploader.upload(img.path, {
                folder: 'blog',
                width: 1200,
                crop: "scale"
            });

            blog.img = result.url;
            blog.public_id = result.public_id;
        }

        blog.title = title;
        blog.description = description;
        blog.date = date;

        await blog.save();

        res.json(blog);

    } catch (error) {
        console.log(error);
    }
}

//eliminar blog
export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            const error = new Error('Campos requeridos');
            return res.status(400).json(error.message);
        }

        const blog = await Blog.findByPk(id);

        if (!blog) {
            const error = new Error('Blog no encontrado');
            return res.status(400).json(error.message);
        }

        await cloudinary.uploader.destroy(blog.public_id);

        await blog.destroy();

        res.json('Blog eliminado');

    } catch (error) {
        console.log(error);
    }
}



