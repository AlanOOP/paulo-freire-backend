import { DataTypes } from "sequelize";
import db from "../config/db.js";


const ImageActivities = db.define("ImageActivities", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
    },
    url : {
        type: DataTypes.STRING,
    },
    public_id: {
        type: DataTypes.STRING,
    }
});

export default ImageActivities;