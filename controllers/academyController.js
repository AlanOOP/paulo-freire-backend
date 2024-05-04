import { AcademyActivities } from "../models/index.js";

export const getAcademyActivities = async (req, res) => {
    try {
        const academyActivities = await AcademyActivities.findAll();
        res.json(academyActivities);
    } catch (error) {
        console.log(error);
    }
}

export const getAcademyActivity = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            const error = new Error('Campos requeridos');
            return res.status(400).json(error.message);
        }

        const academyActivity = await AcademyActivities.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!academyActivity) {
            const error = new Error('Actividad no encontrada');
            return res.status(404).json(error.message);
        }

        res.json(academyActivity);
    } catch (error) {
        console.log(error);
    }
}

export const createAcademyActivity = async (req, res) => {
    try {

        const { title, description } = req.body;

        if (!title || !description) {
            const error = new Error('Campos requeridos');
            return res.status(400).json(error.message);
        }

        const academyActivity = await AcademyActivities.create(
            {
                title,
                description
            }
        );
        res.json(academyActivity);
    } catch (error) {
        console.log(error);
    }
}

export const updateAcademyActivity = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, description } = req.body;

        const academyActivityExists = await AcademyActivities.findOne({
            where: {
                id: id
            }
        });

        if (!title || !description) {
            const error = new Error('Campos requeridos');
            return res.status(400).json(error.message);
        }

        if (!academyActivityExists) {
            const error = new Error('Actividad no encontrada');
            return res.status(404).json(error.message);
        }


        const academyActivity = await AcademyActivities.update({ title, description }, {
            where: {
                id: req.params.id
            }
        });
        res.json(academyActivity);
    } catch (error) {
        console.log(error);
    }
}

export const deleteAcademyActivity = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            const error = new Error('Campos requeridos');
            return res.status(400).json(error.message);
        }

        const result = await AcademyActivities.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!result) {
            const error = new Error('Actividad no encontrada');
            return res.status(404).json(error.message);
        }

        const academyActivity = await AcademyActivities.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.json(academyActivity);

    } catch (error) {
        console.log(error);
    }
}