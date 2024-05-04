import { DataTypes } from "sequelize";
import db from "../config/db.js";

const User = db.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: true
});


export default User;    