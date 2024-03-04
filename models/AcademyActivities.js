import { DataTypes } from "sequelize";
import db from "../config/db.js";

const AcademyActivities = db.define("AcademyActivities", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
         allowNull: false
    }
},
{
    timestamps: true
}
);

export default AcademyActivities;