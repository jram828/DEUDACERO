import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Administrador = sequelize.define(
    "Administrador",
    {
      id: {
        type: DataTypes.INT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
  );
  return Administrador;
};

