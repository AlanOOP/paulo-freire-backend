import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Customsize = db.define("Customsize", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    slideImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    public_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Customsize;
