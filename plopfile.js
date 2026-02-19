module.exports = function (plop) {
    plop.setGenerator('module', {
        description: 'Generate a new module',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Module name please',
            },
            {
                type: 'input',
                name: 'repository',
                message: 'Repository name please',
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
            {
                type: 'add',
                path: 'src/database/repository/{{camelCase repository}}/{{camelCase repository}}.ts',
                templateFile: 'plop-templates/repository/repository.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/database/repository/{{camelCase repository}}/dto.ts',
                templateFile: 'plop-templates/repository/dto.ts.hbs',
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



    plop.setGenerator('cron', {
        description: 'Generate a new cron job',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Cron job name please',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/cron/{{kebabCase name}}.cron.ts',
                templateFile: 'plop-templates/cron/cron.ts.hbs',
            },
        ],
    });

    plop.setGenerator('migration', {
        description: 'Generate a new migration',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Migration name please',
                default: 'create-table',
            },
            {
                type: 'input',
                name: 'repository',
                message: 'Repository name please',
                default: 'post',
            },
            {
                type: 'input',
                name: 'table',
                message: 'Table name please',
                default: 'posts',
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
                path: 'src/database/repository/{{camelCase repository}}/{{camelCase repository}}.ts',
                templateFile: 'plop-templates/repository/repository.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/database/repository/{{camelCase repository}}/dto.ts',
                templateFile: 'plop-templates/repository/dto.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/database/sequelize/models/{{kebabCase repository}}.ts',
                templateFile: 'plop-templates/model/model.ts.hbs',
            },
            {
                type: 'modify',
                path: 'src/database/sequelize/interface.ts',
                pattern: /(\/\/ Add other models if needed)/g,
                template: '{{camelCase repository}}: Model\n    $1',
            },
            {
                type: 'modify',
                path: 'src/database/sequelize/sequelize.ts',
                pattern: /(import { Connection } from '\.\/interface')/g,
                template: "import {{pascalCase repository}} from './models/{{kebabCase repository}}'\n$1",
            },
            {
                type: 'modify',
                path: 'src/database/sequelize/sequelize.ts',
                pattern: /(\/\/ load all model on folder models)/g,
                template: '$1\n        const {{camelCase repository}} = {{pascalCase repository}}(connection)',
            },
            {
                type: 'modify',
                path: 'src/database/sequelize/sequelize.ts',
                pattern: /(\/\/ Add other models if needed)/g,
                template: '{{camelCase repository}},\n            $1',
            },
        ],
    });
};
