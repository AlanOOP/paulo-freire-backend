import User from "../models/User.js";
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user
            = await User.findOne({ where: { id } });
        res.json(user);
    }
    catch (error) {
        console.log(error);
    }
}

export const addUser = async (req, res) => {

    const { name, lastName, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            const error = new Error("Campos requeridos");
            return res.status(400).json(error.message);
        }

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            const error = new Error("El usuario ya existe");
            return res.status(400).json(error.message);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            lastName,
            email,
            password: passwordHash,
            role: 1
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

//login

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = new Error("El usuario no existe");
            return res.status(400).json(error.message);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            const error = new Error("Contraseña incorrecta");
            return res.status(400).json(error.message);
        }
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

