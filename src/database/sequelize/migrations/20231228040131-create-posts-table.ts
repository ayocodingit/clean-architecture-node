import { QueryInterface, DataTypes, Sequelize } from 'sequelize'

const tableName = 'posts'

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable(tableName, {
        id: {
            allowNull: false,
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
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
        },
    })

    return queryInterface.addIndex(tableName, ['title'])
}

export async function down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(tableName)
}
