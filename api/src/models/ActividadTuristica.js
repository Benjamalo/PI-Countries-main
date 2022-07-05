const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ActividadTuristica",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.STRING,
      },
      season: {
        type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
      },
    },
    { timestamps: false },
    { freezeTableName: true }
  );
};
