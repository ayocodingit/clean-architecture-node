```
.
├── config
│   ├── config.interface.ts // type of config
│   ├── config.schema.ts // schema validation
│   ├── config.ts // setting configuration from .env
│   └── config.validate.ts // helper running validation
├── cron // execution need of running cron job
├── database 
├── external // integration of third party with API external
├── helpers
├── modules // define modules
├── pkg // reusable library
├── transport // initial transport like HTTP e.g Express, Apollo
│   ├── http
│   │   ├── middleware/
│   │   └── http.ts
│   ├── grpc
│   │   ├── middleware/
│   │   └── grpc.ts
│   ├── grapql
│   │   ├── middleware/
│   │   └── grapql.ts
│   └── websocket
│       ├── middleware/
│       └── grapql.ts
├── main.ts // execution server
└── migrater.ts // config database for running migration
```
