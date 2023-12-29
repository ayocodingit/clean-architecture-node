import { QueryInterface, DataTypes, Sequelize } from 'sequelize'

module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable('posts', {
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

        return queryInterface.addIndex('posts', ['title'])
    },

    async down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('posts')
    },
}
