## Example

const Run = async () => {
const logger = new Logger(config)
const connection = await Sequelize.Connect(config, logger)

    const category = Category(connection)

    const result = await category.bulkCreate([
        {
            title: 'Morning Routine',
            description: 'Start your day Energized',
            icon: config.file.uri + '/sun.png',
        },
    ])
    logger.Info('success running seeder, total: ' + result.length)
    return Sequelize.Disconnect(connection)

}

export default Run()
