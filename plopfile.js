module.exports = function (plop) {
    plop.setGenerator('module', {
        description: 'Generate a new module',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Module name please',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/modules/{{camelCase name}}/{{camelCase name}}.ts',
                templateFile: 'plop-templates/module/module.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{camelCase name}}/delivery/http/handler.ts',
                templateFile: 'plop-templates/module/delivery/http/handler.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{camelCase name}}/entity/interface.ts',
                templateFile: 'plop-templates/module/entity/interface.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{camelCase name}}/entity/schema.ts',
                templateFile: 'plop-templates/module/entity/schema.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{camelCase name}}/repository/repository.ts',
                templateFile: 'plop-templates/module/repository/repository.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{camelCase name}}/usecase/usecase.ts',
                templateFile: 'plop-templates/module/usecase/usecase.ts.hbs',
            },
        ],
    });
    plop.setHelper('timestamp', () => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        return `${yyyy}${mm}${dd}${hh}${min}${ss}`;
    });

    plop.setGenerator('migration', {
        description: 'Generate a new migration',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Migration name please (e.g., create-users-table)',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/database/sequelize/migrations/{{timestamp}}-{{kebabCase name}}.ts',
                templateFile: 'plop-templates/migration/migration.ts.hbs',
            },
        ],
    });
};
