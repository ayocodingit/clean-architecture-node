import { DataTypes } from 'sequelize'
import { Connection } from '../interface'

const Post = (connection: Connection) => {
    return connection.define(
        'posts',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    )
}

export default Post
