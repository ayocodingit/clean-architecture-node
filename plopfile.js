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
};
