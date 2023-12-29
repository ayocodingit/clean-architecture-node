import { DataTypes, Sequelize } from 'sequelize'

const schema = (sequelize: Sequelize) => {
    return sequelize.define(
        'posts',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            title: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        },
        {
            timestamps: false,
        }
    )
}

export default schema
