# This is Folder for Set ENVIRONMENT from .env

### Config Interface

Define for Type Data of Config

```typescript
export type Config = {
    app: {
        name: string
        env: string
        port: {
            http: number
        }
    }
    ...
}
```

### Config Schema

Define for Schema Validation of Config

```typescript
export default Joi.object({
    APP_NAME: Joi.string().required(),
    APP_ENV: Joi.string()
        .valid('local', 'staging', 'production', 'test')
        .default('local'),
    APP_PORT_HTTP: Joi.number().default(3000),
    APP_LOG: Joi.string()
        .valid('info', 'error', 'warn', 'debug')
        .default('info'),
    ...
})
```

### Config

Define for Value Config

```typescript
const config: Config = {
    app: {
        name: env.APP_NAME,
        env: env.APP_ENV,
        port: {
            http: env.APP_PORT_HTTP,
        },
    },
    ...
}
```

### Config Validate

Method Helper to make Validate Config if Error then Exit Program

```typescript
export default (env: Record<string, any>) => {
    const { errors, value } = Validate(configSchema, env)

    if (errors) {
        console.error(errors)
        process.exit(-1)
    }

    return value
}
```
