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
                path: 'src/database/repository/{{camelCase name}}/{{camelCase name}}.ts',
                templateFile: 'plop-templates/module/repository/repository.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/database/repository/{{camelCase name}}/dto.ts',
                templateFile: 'plop-templates/module/repository/dto.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{camelCase name}}/usecase/usecase.ts',
                templateFile: 'plop-templates/module/usecase/usecase.ts.hbs',
            },
            {
                type: 'modify',
                path: 'src/app.ts',
                pattern: /(import Http from '\.\/transport\/http\/http')/g,
                template: "import {{properCase name}} from './modules/{{camelCase name}}/{{camelCase name}}'\n$1",
            },
            {
                type: 'modify',
                path: 'src/app.ts',
                pattern: /(\/\/ End Load Modules)/g,
                template: 'new {{properCase name}}(logger, config, connection).RunHttp(http)\n    $1',
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
                message: 'Migration name please',
            },
            {
                type: 'input',
                name: 'table',
                message: 'Table name please',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/database/sequelize/migrations/{{timestamp}}-{{kebabCase name}}.ts',
                templateFile: 'plop-templates/migration/migration.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/database/sequelize/models/{{kebabCase name}}.ts',
                templateFile: 'plop-templates/model/model.ts.hbs',
            },
            {
                type: 'modify',
                path: 'src/database/sequelize/interface.ts',
                pattern: /(\/\/ Add other models if needed)/g,
                template: '{{camelCase name}}: Model\n    $1',
            },
            {
                type: 'modify',
                path: 'src/database/sequelize/sequelize.ts',
                pattern: /(import { Connection } from '\.\/interface')/g,
                template: "import {{pascalCase name}} from './models/{{kebabCase name}}'\n$1",
            },
            {
                type: 'modify',
                path: 'src/database/sequelize/sequelize.ts',
                pattern: /(\/\/ load all model on folder models)/g,
                template: '$1\n        const {{camelCase name}} = {{pascalCase name}}(connection)',
            },
            {
                type: 'modify',
                path: 'src/database/sequelize/sequelize.ts',
                pattern: /(\/\/ Add other models if needed)/g,
                template: '{{camelCase name}},\n            $1',
            },
        ],
    });
};
