import { DataTypes } from "sequelize"

const UserModel = {

  user_id: {

    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,

  },

  username: {

    type: DataTypes.STRING,
    allowNull: false,

  },

  addr: {

    type: DataTypes.STRING,
    allowNull: false,
    unique: true,

  },

}

export { UserModel }